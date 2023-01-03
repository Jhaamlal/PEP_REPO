import { useGetLevers } from 'api';
import { Lever, Sectors } from 'components';
import React, { useState } from 'react';

function Levers() {
  const [selectedLever, setSelectedLever] = useState('Agriculture');
  const leverObject = {};
  const { data: levers } = useGetLevers();

  // function make
  levers?.map((item, index) => {
    const isSectorExist = leverObject.hasOwnProperty(item['sector']);

    if (isSectorExist) {
      const isSegemntExist = leverObject?.[item['sector']]?.hasOwnProperty(
        item['segment'],
      );
      if (isSegemntExist) {
        leverObject[item['sector']]['total'] += 1;
        leverObject[item['sector']][item['segment']] += 1;
      }
      if (!isSegemntExist) {
        leverObject[item['sector']] = {
          ...leverObject[item['sector']],
          [item['segment']]: 0,
        };
      }
    } else {
      leverObject[item['sector']] = {
        total: 0,
        [item['segment']]: 0,
      };
    }
    return '';
  });
  delete leverObject['DuMmY'];
  delete leverObject['Test'];

  return (
    <div>
      <Lever leverObject={leverObject} setSelectedLever={setSelectedLever} />
      <Sectors selectedLever={selectedLever} leverObject={leverObject} />
    </div>
  );
}

export { Levers };
