import React from 'react';

//Component to calculate the time to destination from distance

const CalculateTime = ({ distance }) => {
    if (Math.round((distance/1.2)/60) > 1.5) {return (
        <p className='time-taken'>
          {Math.round((distance/1.2)/60)} minutes
          
        </p>
      )}
      else if (Math.round((distance/1.2)/60) > 0.5) {return (
        <p className='time-taken'>
          1 minute
        </p>
      )}
      else { return (
        <p className='time-taken'> &lt; 1 minute</p>
      )}
  
};

export default CalculateTime;