import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
// import { getAuth } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js'
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
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

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
	modal.style.display = "block";
};

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

console.log(uploadBtn);
uploadBtn.addEventListener("click", (e) => {
	console.log("Asdf");
	getfile();
});

async function getfile() {
	console.log("ASDAWDQ");
	var pic = document.getElementById("photo");

	// selected file is that file which user chosen by html form
	const selectedFile = pic.files[0];

	// make save button disabled for few seconds that has id='submit_link'
	// document.getElementById("submit_link").setAttribute("disabled", "true");
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
		});
	});

	// uploadTask.on(
	// 	"state_changed",
	// 	(snapshot) => {
	// 		// Observe state change events such as progress, pause, and resume
	// 		// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
	// 		const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	// 		console.log("Upload is " + progress + "% done");
	// 		switch (snapshot.state) {
	// 			case "paused":
	// 				console.log("Upload is paused");
	// 				break;
	// 			case "running":
	// 				console.log("Upload is running");
	// 				break;
	// 		}
	// 	},
	// 	(error) => {
	// 		// Handle unsuccessful uploads
	// 	},
	// 	() => {
	// 		// Handle successful uploads on complete
	// 		// For instance, get the download URL: https://firebasestorage.googleapis.com/...
	// 		getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
	// 			const docRef = await addDoc(collection(db, "images"), {
	// 				url: downloadURL,
	// 			});
	// 			console.log("Document written with ID: ", docRef.id);
	// 		});
	// 	}
	// );
}

console.log("ASDF");
