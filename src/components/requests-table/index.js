import React from 'react';
import format from 'date-fns/format';

const RequestsTableRow = ({ request }) => (
  <tr>
    <td>{request.data.type}</td>
    <td>
      {request.data.quantity} {request.data.unit}
    </td>
    <td>{format(new Date(request.data.date), 'MMMM d, yyyy')}</td>
    <td>{request.data.details}</td>
  </tr>
);

const RequestsTable = ({ requests }) => (
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Quantity</th>
        <th>Date needed / Delivery date</th>
        <th>Details</th>
      </tr>
    </thead>

    <tbody>
      {requests.map(request => (
        <RequestsTableRow key={request.id} request={request} />
      ))}
    </tbody>
  </table>
);

export default RequestsTable;
