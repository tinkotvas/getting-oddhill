// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// const request = require('request')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
const db = admin.firestore()
const IncomingWebhook = require('@slack/client').IncomingWebhook
const hookUrl =
  'https://hooks.slack.com/services/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'
const webhook = new IncomingWebhook(hookUrl)

exports.onPostNew = functions.firestore
  .document('posts/{postID}')
  .onCreate((snap, context) => {
    let newValues = {
      createdAt: new Date()
    }
    let authorRef = snap.data().author
    if (typeof authorRef === 'object') {
      authorRef
        .get()
        .then((author) => {
          let text =
            'New post: ' +
            snap.data().heading +
            ', by: ' +
            author.data().username +
            '.'
          return webhook.send(text)
        })
        .catch()
    } else if (typeof authorRef === 'string') {
      let text = 'New post: ' + snap.data().heading + ', by: ' + authorRef + '.'
      return webhook.send(text)
    }

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
