import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';

function Segment({
  selectedSectorsData,
  selector,
  selectedSector,
  parentChangehandler,
  showSegmentChild,
}) {
  // code
  const parentHandler = ({ item, index, event }) => {
    parentChangehandler({ item, index, event });
  };

  const showChild = ({ event, item }) => {
    showSegmentChild({ event, item });
  };

  return (
    <>
      {Object.keys(selectedSectorsData).map((item, index) => {
        const isChecked = !!selector[selectedSector]?.[item]?.['isChecked'];
        const isInterMediate =
          !!selector[selectedSector]?.[item]?.['intermediate'];
        return (
          <div
            className={`tw-ml-2 tw-flex tw-justify-between active:tw-bg-blue-200`}
            key={index}
          >
            <FormControlLabel
              label={item}
              control={
                <Checkbox checked={isChecked} indeterminate={isInterMediate} />
              }
              onClick={(event) => parentHandler({ item, index, event })}
            />
            <AiOutlineArrowRight
              className='tw-self-center tw-mr-4 tw-cursor-pointer'
              onClick={(event) => showChild({ event, item })}
            />
          </div>
        );
      })}
    </>
  );
}

export { Segment };
