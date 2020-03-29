const functions = require('firebase-functions');
const admin = require('firebase-admin');
const has = require('lodash/has');
const set = require('lodash/set');
const get = require('lodash/get');

admin.initializeApp();
const db = admin.firestore();

exports.commitmentRevisions = functions.firestore
  .document('commitments/{cid}/revisions/{rid}')
  .onCreate(async snapshot => {
    await db.runTransaction(async t => {
      // Get the parent commitment document from the revision sub-document.
      const commitmentRef = snapshot.ref.parent.parent;
      const commitmentSnapshot = await commitmentRef.get();
      const commitmentData = commitmentSnapshot.data();

      const revisionData = snapshot.data();
      const commitmentType = revisionData.data.type;

      const locationId = revisionData.data.location;
      const locationRef = db.doc(`locations/${locationId}`);
      const locationSnapshot = await locationRef.get();
      const locationData = locationSnapshot.data();

      // Update statistics for this commitment type
      let statistics = get(locationData, 'statistics', {});
      if (!has(statistics, commitmentType)) {
        statistics = set(statistics, commitmentType, {
          requests: 0,
          commitments: 0,
        });
      }

      // The quantity could have been edited, so we deduct the old quantity
      // first before adding the updated one.
      if (commitmentData) {
        statistics[commitmentType].commitments -= commitmentData.data.quantity;
      }
      statistics[commitmentType].commitments += revisionData.data.quantity;

      await commitmentRef.set(revisionData);
      await locationRef.update({ statistics });
    });
  });
