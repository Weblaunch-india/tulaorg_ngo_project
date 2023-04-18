import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
// import { getAuth } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js'
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

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

const imgContainer = document.getElementById("event-container");

async function getImages() {
	const querySnapshot = await getDocs(collection(db, "events"));

	console.log(querySnapshot);
	querySnapshot.forEach((doc) => {
		console.log(doc.data());
		const temp = document.createElement("h1");
		temp.innerHTML = `<div class="blog-post" data-aos="fade-up">
        <div class="blog-post_img">
            <img src=${doc.data().url} alt="image" class="image1">

        </div>
        <div class="blog-post_info">
            <div class="blog-post_date">
                <span>${doc.data().title}</span>
                <span>26-dec-2022.</span>
            </div>
            <h1 class="blog-post_title">Description</h1>
            <p class="blog-post_text">
                ${doc.data().content}
            </p>
        </div>
    </div>

`;
		// temp.innerHTML = doc.data().url;
		imgContainer.appendChild(temp);
	});
}

getImages();

console.log(imgContainer);
