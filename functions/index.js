const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.commitmentRevisions = functions.firestore
  .document('commitments/{cid}/revisions/{rid}')
  .onCreate(async snapshot => {
    // Get the parent commitment document from the revision sub-document.
    const commitmentRef = snapshot.ref.parent.parent;
    const commitmentData = (await commitmentRef.get()).data() || {};
    const revisionData = snapshot.data();

    await commitmentRef.set({ ...commitmentData, ...revisionData });
  });
