import { useGetLevers } from 'api';
import { Lever, Sectors } from 'components';
import React, { useState } from 'react';
import { allSectoresData } from 'utils';

function Levers() {
  const [selectedLever, setSelectedLever] = useState('Agriculture');
  const { data: levers } = useGetLevers();
  const leverObject = allSectoresData({ levers });
  return (
    <div>
      <Lever leverObject={leverObject} setSelectedLever={setSelectedLever} />
      <Sectors selectedLever={selectedLever} leverObject={leverObject} />
    </div>
  );
}

export { Levers };
