// import {createStore, applyMiddleware} from 'redux'
// import thunkMiddleware from 'redux-thunk'
// import firebase from "firebase";
// import { defaultConfig } from 'next/dist/server/config-shared';

// // firebaseの初期化
// var config = {
// //   // Import the functions you need from the SDKs you need
// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries

// // // Your web app's Firebase configuration
// // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// // const firebaseConfig = {
// //   apiKey: "AIzaSyDyZZr6QZhYVOg1JlAVICvsbd0w91gnFN4",
// //   authDomain: "keio-tla-2023-1d59d.firebaseapp.com",
// //   databaseURL: "https://keio-tla-2023-1d59d-default-rtdb.firebaseio.com",
// //   projectId: "keio-tla-2023-1d59d",
// //   storageBucket: "keio-tla-2023-1d59d.appspot.com",
// //   messagingSenderId: "236762303330",
// //   appId: "1:236762303330:web:acbf2ed2064d6296df7a3b",
// //   measurementId: "G-45CN4XD27T"
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

// };

// var fireapp;
// try {
//   firebase.initializeApp(config);
// } catch (error) {
//   console.log(error.message);
// }
// export default fireapp;

// // ステート初期値
// const initial = {
// }

// // レデゥーサー(ダミー)
// function fireReducer(state = intitial, action) {
//   switch (action.type) {
//     // ダミー
//     case 'TESTACTION':
//       return state;
//     // デフォルト
//     default:
//       return state;
//   }
// }

// // initStore関数
// export function initStore(state = initial) {
//   return createStore(fireReducer, state,
//     applyMiddleware(thunkMiddleware))
// }