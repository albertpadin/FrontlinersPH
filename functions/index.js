const functions = require('firebase-functions');
const admin = require('firebase-admin');
const has = require('lodash/has');
const set = require('lodash/set');
const get = require('lodash/get');

admin.initializeApp();
const db = admin.firestore();

exports.locationRevisions = functions.firestore
  .document('locations/{lid}/revisions/{rid}')
  .onCreate(async snapshot => {
    // Get the parent location document from the revision sub-document.
    await db.runTransaction(async t => {
      const locationRef = snapshot.ref.parent.parent;
      const locationSnapshot = await t.get(locationRef);
      const locationData = locationSnapshot.data();
      const revisionData = snapshot.data();

      // Set the location's latest revision to the newly-crated document.
      t.set(locationRef, { ...locationData, ...revisionData });
    });
  });

exports.commitmentRevisions = functions.firestore
  .document('commitments/{cid}/revisions/{rid}')
  .onCreate(async snapshot => {
    await db.runTransaction(async t => {
      // Get the parent commitment document from the revision sub-document.
      const commitmentRef = snapshot.ref.parent.parent;
      const commitmentSnapshot = await t.get(commitmentRef);
      const commitmentData = commitmentSnapshot.data();

      const revisionData = snapshot.data();
      const commitmentType = revisionData.data.type;

      const locationId = revisionData.data.location;
      const locationRef = db.doc(`locations/${locationId}`);
      const locationSnapshot = await t.get(locationRef);
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
        statistics[commitmentType].commitments -= parseInt(
          commitmentData.data.quantity
        );
      }
      statistics[commitmentType].commitments += parseInt(
        revisionData.data.quantity
      );

      t.set(commitmentRef, revisionData);
      t.update(locationRef, { statistics });
    });
  });

exports.requestRevisions = functions.firestore
  .document('requests/{qid}/revisions/{rid}')
  .onCreate(async snapshot => {
    await db.runTransaction(async t => {
      // Get the parent request document from the revision sub-document.
      const requestRef = snapshot.ref.parent.parent;
      const requestSnapshot = await t.get(requestRef);
      const requestData = requestSnapshot.data();

      const revisionData = snapshot.data();
      const requestType = revisionData.data.type;

      const locationId = revisionData.data.location;
      const locationRef = db.doc(`locations/${locationId}`);
      const locationSnapshot = await t.get(locationRef);
      const locationData = locationSnapshot.data();

      // Update statistics for this commitment type
      let statistics = get(locationData, 'statistics', {});
      if (!has(statistics, requestType)) {
        statistics = set(statistics, requestType, {
          requests: 0,
          commitments: 0,
        });
      }

      // The quantity could have been edited, so we deduct the old quantity
      // first before adding the updated one.
      if (requestData) {
        statistics[requestType].requests -= parseInt(requestData.data.quantity);
      }
      statistics[requestType].requests += parseInt(revisionData.data.quantity);

      t.set(requestRef, revisionData);
      t.update(locationRef, { statistics });
    });
  });

exports.locationDeletions = functions.firestore
  .document('locations/{lid}')
  .onDelete(async snapshot => {
    // Delete revisions subcollection.
    const revisionsRef = snapshot.ref.collection('revisions');
    const revisionsSnapshot = await revisionsRef.get();
    const locationBatch = db.batch();
    revisionsSnapshot.docs.forEach(doc => locationBatch.delete(doc.ref));
    await locationBatch.commit();

    // Delete requests and commitments for the deleted location.
    const requestsQuery = db
      .collection('requests')
      .where('data.location', '==', snapshot.id);
    const commitmentsQuery = db
      .collection('commitments')
      .where('data.location', '==', snapshot.id);

    await db.runTransaction(async t => {
      const [requestsSnapshot, commitmentsSnapshot] = await Promise.all([
        t.get(requestsQuery),
        t.get(commitmentsQuery),
      ]);
      requestsSnapshot.docs.forEach(doc => t.delete(doc.ref));
      commitmentsSnapshot.docs.forEach(doc => t.delete(doc.ref));
    });
  });

exports.commitmentDeletions = functions.firestore
  .document('commitments/{cid}')
  .onDelete(async snapshot => {
    // Delete revisions subcollection.
    const revisionsRef = snapshot.ref.collection('revisions');
    const revisionsSnapshot = await revisionsRef.get();
    const batch = db.batch();
    revisionsSnapshot.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();

    // Deduct commitment amount from location statistics.
    await db.runTransaction(async t => {
      const revisionData = snapshot.data();
      const requestType = revisionData.data.type;
      const locationId = revisionData.data.location;
      const locationRef = db.doc(`locations/${locationId}`);
      const locationSnapshot = await t.get(locationRef);
      if (locationSnapshot.exists) {
        const locationData = locationSnapshot.data();
        const statistics = get(locationData, 'statistics', {});
        statistics[requestType].commitments -= parseInt(
          revisionData.data.quantity
        );
        t.update(locationRef, { statistics });
      }
    });
  });

exports.requestDeletions = functions.firestore
  .document('requests/{rid}')
  .onDelete(async snapshot => {
    // Delete revisions subcollection.
    const revisionsRef = snapshot.ref.collection('revisions');
    const revisionsSnapshot = await revisionsRef.get();
    const batch = db.batch();
    revisionsSnapshot.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();

    // Deduct commitment amount from location statistics.
    await db.runTransaction(async t => {
      const revisionData = snapshot.data();
      const requestType = revisionData.data.type;
      const locationId = revisionData.data.location;
      const locationRef = db.doc(`locations/${locationId}`);
      const locationSnapshot = await t.get(locationRef);
      if (locationSnapshot.exists) {
        const locationData = locationSnapshot.data();
        const statistics = get(locationData, 'statistics', {});
        statistics[requestType].requests -= parseInt(
          revisionData.data.quantity
        );
        t.update(locationRef, { statistics });
      }
    });
  });
