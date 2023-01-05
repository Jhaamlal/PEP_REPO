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
    <div className='tw-relative '>
      <div className='tw-bg-slate-300 tw-h-screen '>
        <Home />
        <Levers />
      </div>
      <div className=' tw-fixed  tw-min-w-full tw-flex tw-justify-between  tw-bottom-0  tw-bg-white tw-px-8 tw-py-2'>
        <div className='tw-p-2 '>{`Total : ${selector?.grandTotal}`}</div>

        <Button variant='contained' disabled={isButtonDisabled}>
          Proced to add Project Info
        </Button>
      </div>
    </div>
  );
};

export { HomeComponents };
