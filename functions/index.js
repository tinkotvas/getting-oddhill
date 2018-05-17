// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const request = require('request')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
const db = admin.firestore()

exports.onPostNew = functions.firestore
  .document('posts/{postID}')
  .onCreate((snap, context) => {
    let newValues = {
      createdAt: new Date()
    }
    snap.data().author.get()
      .then((author) => {
        return request.post(
          'https://hooks.slack.com/services/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',
          {
            json: {
              text:
                'New post: ' +
                snap.data().heading +
                ', by: ' +
                author.data().username + '.'
            }
          }
        )
      }).catch()

    return snap.ref.set(newValues, { merge: true })
  })

exports.commandPublish = functions.https.onRequest((request, response) => {
  console.log(request, response)
  console.log(request.body)
  db.collection('posts').add({
    author: request.body.user_name,
    message: request.body.text
  })
})
