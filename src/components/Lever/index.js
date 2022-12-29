import React from 'react';

import {
  FaTractor,
  FaIndustry,
  FaRegBuilding,
  FaEthereum,
  FaSuperpowers,
} from 'react-icons/fa';
import { MdEmojiTransportation } from 'react-icons/md';

const objectWithIcons = {
  Agriculture: <FaTractor size={20} />,
  Industry: <FaIndustry size={20} />,
  Sector: <FaEthereum size={20} />,
  Transport: <MdEmojiTransportation size={20} />,
  Power: <FaSuperpowers size={20} />,
};

function Lever({ leverObject }) {
  return (
    <div className='tw-grid tw-grid-cols-5 tw-grid-flow-row tw-mt-4'>
      {Object.keys(leverObject).map((item, index) => {
        return (
          <div className='tw-col-span-1 tw-flex tw-bg-slate-100 tw-rounded-md tw-p-2 tw-mx-3'>
            <div className='tw-self-center tw-mx-2'>
              {objectWithIcons[item]}
            </div>
            <div className=''>
              <p>{item}</p>
              <p>{`0/${leverObject[item]} Levers selected`}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { Lever };
