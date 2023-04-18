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

var modal = document.getElementById("myModal");
var updateModal = document.getElementById("updateModal");
// Get the button that opens the modal
var btn = document.getElementsByClassName("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function displayModel() {
	modal.style.display = "block";
}

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
	getfile();
});

async function getfile() {
	var pic = document.getElementById("photo");

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
		});
	});
}

const imgContainer = document.getElementById("image-container");

let id = "";

async function getImages() {
	const querySnapshot = await getDocs(collection(db, "events"));

	querySnapshot.forEach((doc) => {
		// console.log(doc.id,doc.data());

		const temp = document.createElement("h1");
		temp.innerHTML = `<div class="col-lg-4 col-md-6 portfolio-item text-sm filter-app">
		<div class="portfolio-wrap" >
			<h3 id="${doc.id}-title">${doc.data().title}</h3>
			<p id="${doc.id}-content">${doc.data().content}</p>
		</div>

        <button class="update-open" id="update-events" data-update="true" data-post=${doc.id} >Update</button >
        <button class="myBtn" data-post=${doc.id} >Delete </button >
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
		await deleteDoc(doc(db, "images", id));
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

console.log(imgContainer);

async function updateEvent() {
	const washingtonRef = doc(db, "events", id);

	// Set the "capital" field of the city 'DC'
	await updateDoc(washingtonRef, {
		title: document.getElementById(`updated-title`).value,
		content: document.getElementById(`updated-content`).value,
	});
	location.reload();
}

document.getElementById("input-update-password").addEventListener("click", (e) => {
	updateEvent();
});
