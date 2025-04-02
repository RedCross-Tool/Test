// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, addDoc } from "firebase/firestore";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDurfWVGVnIIfbc0plLD5sPp-VPyv8j3SQ",
  authDomain: "canadian-red-cross-cc-app.firebaseapp.com",
  projectId: "canadian-red-cross-cc-app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle Form Submission
document.getElementById("climateForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  // Get form values
  const climateHazards = Array.from(document.getElementById("climate_hazard").selectedOptions).map(option => option.value);
  const diseases = Array.from(document.getElementById("climate_sensitive_disease").selectedOptions).map(option => option.value);
  const region = document.getElementById("region").value;
  const domesticCanada = Array.from(document.getElementById("domestic_canada").selectedOptions).map(option => option.value);

  // Save submitted data to Firestore (optional)
  await addDoc(collection(db, "requests"), {
    climateHazards,
    diseases,
    region,
    domesticCanada,
    timestamp: new Date().toISOString(),
  });

  // Query Firestore for matching questions
  const questionsRef = collection(db, "Survey"); // Replace with your collection name if different
  const q = query(
    questionsRef,
    where("climateHazards", "array-contains-any", climateHazards),
    where("diseases", "array-contains-any", diseases)
  );

  const querySnapshot = await getDocs(q);

  // Display matching questions
  const questionsContainer = document.getElementById("questionsContainer");
  questionsContainer.innerHTML = ""; // Clear previous results

  querySnapshot.forEach((doc) => {
    const questionData = doc.data();
    const questionElement = document.createElement("p");
    questionElement.textContent = questionData.question;
    questionsContainer.appendChild(questionElement);
  });
});
