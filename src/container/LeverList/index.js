import { useGetLevers } from 'api';
import { Lever, Sectors } from 'components';
import React, { useState } from 'react';

function Levers() {
  const [selectedLever, setSelectedLever] = useState('Agriculture');
  const leverObject = {};
  const { data: levers } = useGetLevers();

  // function make
  levers?.map((item, index) => {
    const isKeyExist = leverObject.hasOwnProperty(item['sector']);
    if (isKeyExist) {
      leverObject[item['sector']] += 1;
    } else {
      leverObject[item['sector']] = 0;
    }
  });
  delete leverObject['DuMmY'];
  delete leverObject['Test'];
  return (
    <div>
      <Lever leverObject={leverObject} setSelectedLever={setSelectedLever} />
      <Sectors selectedLever={selectedLever} />
    </div>
  );
}

export { Levers };
