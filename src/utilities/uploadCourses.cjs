const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');
const courseData = require('./courseData.json'); // Load your JSON file

const firebaseConfig = {
  apiKey: "AIzaSyD3B060yRjPYtgCqA2SBb2PEDMm8hgTGlY",
  authDomain: "react-tutorial-35db6.firebaseapp.com",
  databaseURL: "https://react-tutorial-35db6-default-rtdb.firebaseio.com",
  projectId: "react-tutorial-35db6",
  storageBucket: "react-tutorial-35db6.appspot.com",
  messagingSenderId: "248693620696",
  appId: "1:248693620696:web:3fa51fb9b3a0dcb39fbcad",
  measurementId: "G-68PZWW35Z6"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const uploadData = async () => {
  try {
    const dbRef = ref(database, 'coursesData'); 
    await set(dbRef, courseData); 
    console.log('Data uploaded successfully!');
  } catch (error) {
    console.error('Error uploading data:', error);
  }
};

uploadData();
