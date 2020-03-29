import React, { useState } from 'react';
import firebase from 'gatsby-plugin-firebase';

import { NEED_TYPE_CHOICES, UNIT_CHOICES } from '@src/constants';

const createLocationCommitment = async data => {
  const user = firebase.auth().currentUser;
  const revision = {
    data,
    author: {
      id: user.uid,
      name: user.displayName,
      photoURL: user.photoURL,
    },
    created_at: firebase.firestore.FieldValue.serverTimestamp(),
  };

  await firebase
    .firestore()
    .collection('commitments')
    .doc()
    .collection('revisions')
    .add(revision);
};

const CommitmentForm = ({ location }) => {
  const defaults = {
    location,
    type: '',
    quantity: 0,
    unit: '',
    date: '',
    provider: '',
    details: '',
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(defaults);

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);
    await createLocationCommitment(data);
    setData(defaults);
    setLoading(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="type">Type</label>
        <select id="type" name="type" value={data.type} onChange={handleChange}>
          <option value="" disabled>
            Select type
          </option>
          {NEED_TYPE_CHOICES.map(choice => (
            <option key={choice.value} value={choice.value}>
              {choice.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          value={data.quantity}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="unit">Unit</label>
        <select id="unit" name="unit" value={data.unit} onChange={handleChange}>
          <option value="" disabled>
            Select unit
          </option>
          {UNIT_CHOICES.map(choice => (
            <option key={choice.value} value={choice.value}>
              {choice.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="date">Delivery date</label>
        <input
          id="date"
          name="date"
          type="date"
          value={data.date}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="provider">Provider</label>
        <input
          id="provider"
          name="provider"
          value={data.provider}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="details">Additional details</label>
        <textarea
          id="details"
          name="details"
          value={data.details}
          onChange={handleChange}
        ></textarea>
      </div>

      <button type="submit" disabled={loading}>
        Create
      </button>
    </form>
  );
};

export default CommitmentForm;
