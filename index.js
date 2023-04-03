import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
// import { getAuth } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js'
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

console.log("temp");

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

const imgContainer = document.getElementById("image-container");

async function getImages() {
	const querySnapshot = await getDocs(collection(db, "images"));
	
	console.log("fwer");
	console.log(querySnapshot)
	querySnapshot.forEach((doc) => {
		console.log(doc.data());
		const temp = document.createElement("h1");
		temp.innerHTML = doc.data().url;
		imgContainer.appendChild(temp);
	});
}

getImages();

console.log(imgContainer);
