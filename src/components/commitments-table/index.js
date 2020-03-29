import React from 'react';
import format from 'date-fns/format';

const CommitmentsTableRow = ({ commitment }) => (
  <tr>
    <td>{commitment.data.type}</td>
    <td>
      {commitment.data.quantity} {commitment.data.unit}
    </td>
    <td>{format(new Date(commitment.data.date), 'MMMM d, yyyy')}</td>
    <td>{commitment.data.provider}</td>
    <td>{commitment.data.details}</td>
  </tr>
);

const CommitmentsTable = ({ data }) => (
  <table className="table-responsive">
    <thead>
      <tr>
        <th>Type</th>
        <th>Quantity</th>
        <th>Delivery date</th>
        <th>Provider</th>
        <th>Details</th>
      </tr>
    </thead>

    <tbody>
      {data.map(commitment => (
        <CommitmentsTableRow key={commitment.id} commitment={commitment} />
      ))}
    </tbody>
  </table>
);

export default CommitmentsTable;
