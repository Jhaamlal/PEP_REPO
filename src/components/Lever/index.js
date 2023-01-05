import React, { useEffect, useState } from 'react';

import {
  FaTractor,
  FaIndustry,
  FaRegBuilding,
  FaEthereum,
  FaSuperpowers,
} from 'react-icons/fa';
import { MdEmojiTransportation } from 'react-icons/md';
import { useSelector } from 'react-redux';

const objectWithIcons = {
  Agriculture: <FaTractor size={20} />,
  Industry: <FaIndustry size={20} />,
  Sector: <FaEthereum size={20} />,
  Transport: <MdEmojiTransportation size={20} />,
  Power: <FaSuperpowers size={20} />,
};

function Lever({ leverObject, setSelectedLever }) {
  const selector = useSelector((state) => state.levers.sectorData);
  return (
    <div className='tw-grid tw-grid-cols-5 tw-grid-flow-row tw-mt-4'>
      {Object.keys(leverObject).map((item, index) => {
        const totalChildSelected = selector[item]['totalSegmentSelected'];
        return (
          <div
            className='tw-col-span-1 tw-flex tw-bg-slate-100 tw-rounded-md tw-p-2 tw-mx-3 hover:tw-cursor-pointer'
            onClick={() => setSelectedLever(item)}
            key={index}
          >
            <div className='tw-self-center tw-mx-2'>
              {objectWithIcons[item]}
            </div>
            <div className=''>
              <p>{item}</p>
              <p>{`${totalChildSelected}/${leverObject[item]['total']} Levers selected`}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { Lever };
