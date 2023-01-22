import React from 'react';

import { useSelector } from 'react-redux';
import { selectedSegment } from '../../../utils/index';

const Selectedchildren = (props) => {
  const selector = useSelector((state) => state.levers.sectorData);
  const selectedChildren = selectedSegment({ selector });
  const element = Object.entries(selectedChildren).map((item, index) => {
    let xBox = [];
    for (const key in item[1]) {
      xBox.push(item[1][key]);
    }
    return (
      <div key={index}>
        <h2 className='tw-font-bold tw-ml-1 tw-pt-2'>{item[0]}</h2>
        <ol>
          {xBox.map((item, key) => {
            return (
              <li key={key} className='tw-m-2 '>
                {item}
              </li>
            );
          })}
        </ol>
      </div>
    );
  });

  return <div>{element}</div>;
};

export { Selectedchildren };
