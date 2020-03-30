import React from 'react';
import format from 'date-fns/format';
import { NEED_TYPE_CHOICES } from '@src/constants';
import NoDataTableRow from '@components/no-data-table-row';

const CommitmentsTableRow = ({ commitment }) => {
  const label = NEED_TYPE_CHOICES.find(
    ({ value }) => value === commitment.data.type
  ).label;

  return (
    <tr>
      <td>{label}</td>
      <td>
        {commitment.data.quantity} {commitment.data.unit}
      </td>
      <td>{format(new Date(commitment.data.date), 'MMMM d, yyyy')}</td>
      <td>{commitment.data.provider}</td>
      <td>{commitment.data.details}</td>
    </tr>
  );
};

const CommitmentsTable = ({ data }) => (
  <div className="table-responsive">
    <table>
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
        {data.length !== 0 ? (
          data.map(commitment => (
            <CommitmentsTableRow key={commitment.id} commitment={commitment} />
          ))
        ) : (
          <NoDataTableRow />
        )}
      </tbody>
    </table>
  </div>
);

export default CommitmentsTable;
