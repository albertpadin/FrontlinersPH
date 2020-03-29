const functions = require('firebase-functions');
const admin = require('firebase-admin');
const has = require('lodash/has');
const set = require('lodash/set');

admin.initializeApp();
const db = admin.firestore();

exports.commitmentRevisions = functions.firestore
  .document('commitments/{cid}/revisions/{rid}')
  .onCreate(async snapshot => {
    // Get the parent commitment document from the revision sub-document.
    const commitmentRef = snapshot.ref.parent.parent;
    const revisionData = snapshot.data();

    await db.runTransaction(async t => {
      const commitmentType = revisionData.data.type;

      const locationId = revisionData.data.location;
      const locationRef = db.doc(`locations/${locationId}`);
      const locationSnapshot = await locationRef.get();
      const locationData = locationSnapshot.data();

      // Update statistics for this commitment type
      let statistics = locationData.statistics;
      if (!has(statistics, commitmentType)) {
        statistics = set(statistics, commitmentType, {
          requests: 0,
          commitments: 0,
        });
      }
      statistics[commitmentType].commitments += Number(
        revisionData.data.quantity
      );

      await commitmentRef.set(revisionData);
      await locationRef.update({ statistics });
    });
  });
