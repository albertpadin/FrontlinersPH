import React from 'react';
import map from 'lodash/map';

const LocationStatisticsRow = ({ type, stats }) => (
  <tr>
    <td>{type}</td>
    <td>{stats.requests}</td>
    <td>{stats.commitments}</td>
  </tr>
);

const LocationStatistics = ({ data }) => (
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Requests</th>
        <th>Commitments</th>
      </tr>
    </thead>

    <tbody>
      {map(data, (stats, type) => (
        <LocationStatisticsRow key={type} type={type} stats={stats} />
      ))}
    </tbody>
  </table>
);

export default LocationStatistics;
