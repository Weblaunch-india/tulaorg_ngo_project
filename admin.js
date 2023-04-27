import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
// import { getAuth } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js'
import {
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

// Get the button that opens the modal
var btn = document.getElementsByClassName("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

console.log(btn);

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
};

const uploadBtn = document.getElementById("image-upload-btn");

uploadBtn.addEventListener("click", (e) => {
	getfile();
});

async function getfile() {
	var pic = document.getElementById("photo");

	// selected file is that file which user chosen by html form
	const selectedFile = pic.files[0];

	// make save button disabled for few seconds that has id='submit_link'
	myfunction(selectedFile); // call below written function
}

async function myfunction(selectedFile) {
	// select unique name for everytime when image uploaded
	// Date.now() is function that give current timestamp
	var name = "tula" + Date.now();

	// put file to firebase
	const storageRef = ref(storage, name);

	uploadBytesResumable(storageRef, selectedFile).then(async (snapshot) => {
		console.log("Uploaded a blob or file!");
		getDownloadURL(snapshot.ref).then(async (downloadURL) => {
			const docRef = await addDoc(collection(db, "images"), {
				url: downloadURL,
			});
			console.log("Document written with ID: ", docRef.id);
			location.reload();
		});
	});
}

const imgContainer = document.getElementById("image-container");

let id = "";

async function getImages() {
	const querySnapshot = await getDocs(collection(db, "images"));

	querySnapshot.forEach((doc) => {
		// console.log(doc.id,doc.data());

		const temp = document.createElement("div");
		temp.innerHTML = `
		<div class="card my-4 w-auto grid align-items-center">
		<div class="my-2">Post uploaded with post ID ${doc.id}</div>

			<img src=${doc.data().url} class="rounded-2" width="720">
		
			<button class="myBtn my-2 btn btn-primary" data-post=${doc.id} >Delete </button >
		<div>`;
		imgContainer.appendChild(temp);
	});

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
	// alert("ASDWADS");
	if (testpassword == password) {
		// alert(id);
		await deleteDoc(doc(db, "images", id));
		console.log();
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
