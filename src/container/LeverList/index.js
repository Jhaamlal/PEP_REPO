import { useGetLevers } from 'api';
import { Lever, Sectors } from 'components';
import React, { useMemo, useState } from 'react';
import { allSectorsData } from 'utils';

function Levers() {
  const [selectedLever, setSelectedLever] = useState('Agriculture');
  const { data: levers } = useGetLevers();
  const leverObject = useMemo(() => allSectorsData({ levers }), [levers]);

  return (
    <div>
      <Lever leverObject={leverObject} setSelectedLever={setSelectedLever} />
      <Sectors selectedLever={selectedLever} leverObject={leverObject} />
    </div>
  );
}

export { Levers };
