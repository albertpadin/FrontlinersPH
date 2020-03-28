import React from 'react';

const CommitmentForm = ({ location }) => {
  const handleSubmit = e => {
    e.preventDefault();
  };

  return <form onSubmit={handleSubmit}></form>;
};

export default CommitmentForm;
