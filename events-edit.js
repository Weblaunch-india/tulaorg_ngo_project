import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
// import { getAuth } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js'
import {
	updateDoc,
	getFirestore,
	collection,
	getDocs,
	deleteDoc,
	addDoc,
	doc,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";

const firebaseConfig = {
	apiKey: "AIzaSyD5mcdC10TzHK12okUM0LzO7LJI9crVoro",
	authDomain: "tulaproject.firebaseapp.com",
	projectId: "tulaproject",
	storageBucket: "tulaproject.appspot.com",
	messagingSenderId: "454315988753",
	appId: "1:454315988753:web:96c933cdc419744f4f1eb0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const password = "testing";

var uploadModel = document.getElementById("uploadModal");
var modal = document.getElementById("myModal");
var updateModal = document.getElementById("updateModal");
// Get the button that opens the modal
var btn = document.getElementsByClassName("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

document.getElementById("input-upload-password").addEventListener("click", (e) => {
	if (testpassword === password) {
		getfile();
	} else {
		alert("Wrong password");
	}
});

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
	if (event.target == updateModal) {
		updateModal.style.display = "none";
	}
};

const uploadBtn = document.getElementById("image-upload-btn");

let titleCont = document.getElementById("input-title");
let contentCont = document.getElementById("input-content");

let title = "";
let content = "";

titleCont.addEventListener("keyup", (e) => {
	title = e.target.value;
	console.log(title);
});

contentCont.addEventListener("keyup", (e) => {
	content = e.target.value;
	console.log(content);
});

uploadBtn.addEventListener("click", (e) => {
	uploadModel.style.display = "block";

	// getfile();
	// alert("Wrong password");
});

async function getfile() {
	const pic = document.getElementById("photo");
	console.log(pic);

	// selected file is that file which user chosen by html form
	const selectedFile = pic.files[0];

	myfunction(selectedFile, title, content); // call below written function
}

async function myfunction(selectedFile, title, content) {
	// select unique name for everytime when image uploaded
	// Date.now() is function that give current timestamp
	var name = "tula" + Date.now();

	// put file to firebase
	const storageRef = ref(storage, name);

	uploadBytesResumable(storageRef, selectedFile).then(async (snapshot) => {
		console.log("Uploaded a blob or file!");
		getDownloadURL(snapshot.ref).then(async (downloadURL) => {
			const docRef = await addDoc(collection(db, "events"), {
				url: downloadURL,
				title: title,
				content: content,
			});
			console.log("Document written with ID: ", docRef.id);
			// location.reload();
		});
	});
}

const imgContainer = document.getElementById("image-container");

let id = "";

async function getImages() {
	const querySnapshot = await getDocs(collection(db, "events"));

	querySnapshot.forEach((doc) => {
		// console.log(doc.id,doc.data());

		const temp = document.createElement("div");
		temp.innerHTML = `<div class=" portfolio-item text-sm filter-app card text-center">
		<div class="card-header">
    Document ID: ${doc.id}
  </div>
		<div class="portfolio-wrap card-body" >
			<h3 id="${doc.id}-title" class="card-title">${doc.data().title}</h3>
			<p id="${doc.id}-content"  class="card-text">${doc.data().content}</p>
			<img src="${doc.data().url}" style="max-height: 30vh;">
		</div>

		<div class="mb-4">
        <button class="update-open btn btn-primary" id="update-events" data-update="true" data-post=${
			doc.id
		} >Update</button >
        <button class="myBtn btn btn-secondary" data-post=${doc.id} >Delete </button >
        </div>
		</div>
`;
		// temp.innerHTML = doc.data().url;
		imgContainer.appendChild(temp);
	});

	document.querySelectorAll(".update-open").forEach((btn) =>
		btn.addEventListener("click", (e) => {
			updateModal.style.display = "block";
			// console.log(e);
			id = e.target.dataset.post;
			document.getElementById(`updated-title`).value = document.getElementById(`${id}-title`).innerText;
			document.getElementById(`updated-content`).value = document.getElementById(`${id}-content`).innerText;
		})
	);

	document.querySelectorAll(".myBtn").forEach((btn) =>
		btn.addEventListener("click", (e) => {
			modal.style.display = "block";
			// console.log(e);
			id = e.target.dataset.post;
		})
	);
}

getImages();

let testpassword = "";

async function deleteImage() {
	if (testpassword == password) {
		// alert(id);
		await deleteDoc(doc(db, "events", id));
		// testpassword = "";
		location.reload();
	} else {
		alert("false");
	}
}

document.getElementById("input-password").addEventListener("click", (e) => {
	deleteImage();
});

document.getElementById("current-password").addEventListener("keyup", (e) => {
	testpassword = e.target.value;
	console.log(testpassword);
});


document.getElementById("current-upload-password").addEventListener("keyup", (e) => {
	testpassword = e.target.value;
	console.log(testpassword);
});

console.log(imgContainer);

async function updateEvent() {
	const updateRef = doc(db, "events", id);

	await updateDoc(updateRef, {
		title: document.getElementById(`updated-title`).value,
		content: document.getElementById(`updated-content`).value,
	});
	location.reload();
}

document.getElementById("input-update-password").addEventListener("click", (e) => {
	updateEvent();
});
