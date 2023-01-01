import { InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { BasicDatePicker } from 'components/ui';
import React, { useState } from 'react';

function ProjectForm() {
  const [startDate, setStartData] = React.useState(null);
  const [endData, setEndDate] = useState();

  return (
    <div className=' tw-bg-white'>
      <h1>Project Info</h1>
      <div className='tw-grid tw-grid-cols-6 tw-gap-y-4'>
        <div className='tw-col-span-3 '>Basic Information</div>
        <div className='tw-col-span-3'>
          {/* Basic part 1 */}
          <div className='tw-grid tw-grid-cols-2 tw-gap-4'>
            <div className='tw-col-span-1 '>
              <InputLabel id='demo-simple-select-label'>
                Project Name
              </InputLabel>
              <TextField
                className='tw-w-full'
                helperText='Please enter your name'
                id='demo-helper-text-aligned'
                label='Name'
              />
            </div>
            <div className='tw-col-span-1'>
              <InputLabel id='demo-simple-select-label'>
                Project Type
              </InputLabel>
              <Select
                className='tw-w-full '
                size='medium'
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                // value={age}
                label='Age'
                // onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </div>
          </div>
          {/* Basic 2 */}
          <div className='tw-grid tw-grid-cols-2 '>
            <div className='tw-col-span-1 '>
              <InputLabel id='demo-simple-select-label'>
                Project Name
              </InputLabel>
              <BasicDatePicker
                startDate={startDate}
                setStartData={setStartData}
              />
            </div>
            <div className='tw-col-span-1'>
              <InputLabel id='demo-simple-select-label'>
                Project Type
              </InputLabel>
              <BasicDatePicker />
            </div>
          </div>
          {/* Basic part 3 */}
          <div className='tw-col-span-1'>
            <TextField
              className='tw-w-[80%]  '
              placeholder='MultiLine with rows: 2 and rowsMax: 4'
              multiline
              rows={2}
              maxRows={4}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProjectForm };
