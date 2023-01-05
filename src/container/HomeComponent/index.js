import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const { Home } = require('container/Home');
const { Levers } = require('container/LeverList');

const HomeComponents = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const selector = useSelector((state) => state.levers.sectorData);
  useEffect(() => {
    const isLessThenOneSelected = selector.grandTotal === 0;
    setIsButtonDisabled(isLessThenOneSelected);
  }, [selector.grandTotal]);

  return (
    <div>
      <div className='tw-bg-slate-300 tw-h-screen'>
        <Home />
        <Levers />
      </div>
      <div className='tw-flex tw-justify-between tw-sticky tw-bottom-0 tw-mb-2 tw-bg-white tw-px-8 tw-py-4'>
        <div className='tw-p-2 '>{`Total : ${selector?.grandTotal}`}</div>

        <Button variant='contained' disabled={isButtonDisabled}>
          Proced to add Project Info
        </Button>
      </div>
    </div>
  );
};

export { HomeComponents };
