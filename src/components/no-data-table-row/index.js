import React from 'react';

const NoDataTableRow = props => {
  return (
    <tr>
      <td className="text-center text-gray-500" colSpan="5">
        {props.children}
      </td>
    </tr>
  );
};

export default NoDataTableRow;
