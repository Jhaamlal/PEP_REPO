import { Lever } from 'components';
import React, { useEffect, useState } from 'react';
import leversdata from 'services/lever';

function Levers() {
  const [leverData, setLeverData] = useState([]);
  const leverObject = {};
  const leverObjectWithIcon = {};

  useEffect(() => {
    leversdata.getAllLever().then((data) => setLeverData(data));
  }, []);

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
      <Lever leverObject={leverObject} />
    </div>
  );
}

export { Levers };
