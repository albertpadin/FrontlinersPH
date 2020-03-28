import React from 'react';
import format from 'date-fns/format';

const LocationNeedsTableRow = ({ need }) => {
  const date =
    need.type === 'REQUEST'
      ? new Date(need.data.date_needed)
      : new Date(need.data.delivery_date);

  return (
    <tr>
      <td>{need.data.type}</td>
      <td>
        {need.data.quantity} {need.data.unit}
      </td>
      <td>{format(date, 'MMMM d, yyyy')}</td>
      <td>{need.data.details}</td>
    </tr>
  );
};

const LocationNeedsTable = ({ needs }) => (
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
      {needs.map(need => (
        <LocationNeedsTableRow key={need.id} need={need} />
      ))}
    </tbody>
  </table>
);

export default LocationNeedsTable;
