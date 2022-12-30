import { Lever, Sectors } from 'components';
import React, { useEffect, useState } from 'react';
import { Leversdata } from 'services';

function Levers() {
  const [leverData, setLeverData] = useState([]);
  const [selectedLever, setSelectedLever] = useState('Agriculture');
  const leverObject = {};

  useEffect(() => {
    Leversdata.getAllLever().then((data) => setLeverData(data));
  }, []);

  // function make
  leverData?.map((item, index) => {
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
