import React from 'react';
import { useParams } from 'react-router-dom';

const StationDetails = () => {
  const { id } = useParams();
  
  return (
    <div>
      <h2>Station Details</h2>
      <p>Station ID: {id}</p>
    </div>
  );
};

export default StationDetails;
