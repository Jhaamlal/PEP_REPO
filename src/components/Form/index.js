import { InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';

function ProjectForm() {
  return (
    <div className=' tw-bg-white'>
      <h1>Project Info</h1>
      <div className='tw-grid tw-grid-cols-6'>
        <div className='tw-col-span-3 '>Basic Information</div>
        <div className='tw-col-span-3 '>
          {/* Basic part 1 */}
          <div className='tw-grid tw-grid-cols-2'>
            <div className='tw-col-span-1 '>
              <InputLabel id='demo-simple-select-label'>
                Project Name
              </InputLabel>
              <TextField
                helperText='Please enter your name'
                id='demo-helper-text-aligned'
                label='Name'
                className='tw-w-56 '
              />
            </div>
            <div className='tw-col-span-1'>
              <InputLabel id='demo-simple-select-label'>
                Project Type
              </InputLabel>
              <Select
                className='tw-w-56  '
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
          <div className='tw-grid tw-grid-cols-2'>
            <div className='tw-col-span-1 '>
              <InputLabel id='demo-simple-select-label'>
                Project Name
              </InputLabel>
              <TextField
                helperText='Please enter your name'
                id='demo-helper-text-aligned'
                label='Name'
                className='tw-w-56 '
              />
            </div>
            <div className='tw-col-span-1'>
              <InputLabel id='demo-simple-select-label'>
                Project Type
              </InputLabel>
              <Select
                className='tw-w-56  '
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
        </div>
      </div>
    </div>
  );
}

export { ProjectForm };
