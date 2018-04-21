// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.createPost = functions.firestore
    .document('posts/{postID}')
    .onCreate((snap, context) => {
        // example change/set value
      return  snap.ref.set({
          functionWorking: true
      }, { merge: true })
    });