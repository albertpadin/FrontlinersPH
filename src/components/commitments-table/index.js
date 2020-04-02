import React from 'react';
import format from 'date-fns/format';
import { NEED_TYPE_CHOICES } from '@src/constants';
import NoDataTableRow from '@components/no-data-table-row';

const CommitmentsTableRow = ({ commitment, canDelete, onDelete }) => {
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
      {canDelete && (
        <td>
          <button onClick={() => onDelete(commitment.id)}>Delete</button>
        </td>
      )}
    </tr>
  );
};

const CommitmentsTable = ({ data, canDelete, onDelete }) => (
  <div className="table-responsive">
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Quantity</th>
          <th>Delivery date</th>
          <th>Provider</th>
          <th>Details</th>
          {canDelete && <th>Actions</th>}
        </tr>
      </thead>

      <tbody>
        {data.length !== 0 ? (
          data.map(commitment => (
            <CommitmentsTableRow
              key={commitment.id}
              commitment={commitment}
              canDelete={canDelete}
              onDelete={onDelete}
            />
          ))
        ) : (
          <NoDataTableRow>No donations yet. Add your donations!</NoDataTableRow>
        )}
      </tbody>
    </table>
  </div>
);

export default CommitmentsTable;
