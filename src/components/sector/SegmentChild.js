import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';

function SegmentChild({
  selectedSectorsData,
  selectedSegment,
  selector,
  childChangeHandler,
  selectedSector,
}) {
  const handleChild = ({ item, event, index }) => {
    childChangeHandler({ item, event, index });
  };
  return (
    <div className='tw-col-span-5 tw-bg-slate-50 '>
      <div className='tw-grid tw-grid-cols-4 tw-p-2 tw-gap-4 tw-bg-slate-800 tw-text-white'>
        <div className='tw-col-span-1'>Lever Name</div>
        <div className='tw-col-span-1'>Category</div>
        <div className='tw-col-span-1'>Location</div>
        <div className='tw-col-span-1'>Description</div>
      </div>
      {selectedSectorsData[selectedSegment]?.map((item, index) => {
        const isChecked = !!selector[selectedSector]?.[selectedSegment]?.[
          'selectedChild'
        ]?.includes(item.id);
        return (
          <div className='tw-grid tw-grid-cols-4 tw-px-2 tw-gap-2' key={index}>
            <FormControlLabel
              label={item['name']}
              control={<Checkbox checked={isChecked} />}
              onClick={(event) => handleChild({ item, event, index })}
              className='tw-col-span-1'
            />
            <div className='tw-col-span-1 tw-self-center'>
              {item['category']}
            </div>
            <div className='tw-col-span-1 tw-self-center'>
              {item['location']}
            </div>
            <div className='tw-col-span-1 tw-self-center'>
              {item['description']}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { SegmentChild };
