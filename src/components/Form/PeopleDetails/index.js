import {
  Autocomplete,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

import React from 'react';

import { nameEmail } from '../../../utils/constant';

function PepoleFormDetails({ peopleDetails, setPeopleDetails }) {
  return (
    <div className='tw-grid tw-grid-cols-6 tw-gap-y-4'>
      <div className='tw-col-span-3 '>Project</div>
      <div className='tw-col-span-3'>
        {/* Basic part 1 */}
        <div className='tw-grid tw-grid-cols-2 tw-gap-4'>
          <div className='tw-col-span-1 '>
            <InputLabel id='client Name'>Client naame</InputLabel>
            <TextField
              className='tw-w-[90%]'
              id='demo-helper-text-aligned'
              label='Name'
              value={peopleDetails.clientName}
              required={true}
              onChange={(e) => {
                setPeopleDetails((prev) => ({
                  ...prev,
                  clientName: e.target.value,
                }));
              }}
            />
          </div>
          <div className='tw-col-span-1'>
            <InputLabel id='demo-simple-select-label'>Colabrators</InputLabel>
            <Autocomplete
              multiple
              className='tw-w-[90%]'
              options={nameEmail}
              onChange={(_e, newValue) => {
                setPeopleDetails((prev) => ({
                  ...prev,
                  colaborators: newValue,
                }));
              }}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Select colaborators'
                  placeholder='Favorites'
                />
              )}
            />
          </div>
        </div>
        {/* Basic 2 */}
        <div className='tw-grid tw-grid-cols-2 tw-gap-4'>
          <div className='tw-col-span-1'>
            <InputLabel id='demo-simple-select-label'>
              Engagment director
            </InputLabel>
            <Autocomplete
              options={nameEmail}
              className='tw-w-[90%]'
              disablePortal
              // value={peopleDetails.colaborators || []}
              onChange={(_e, newValue) => {
                setPeopleDetails((prev) => ({
                  ...prev,
                  director: newValue,
                }));
              }}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} placeholder='Engagment director' />
              )}
            />
          </div>
          <div className='tw-col-span-1'>
            <InputLabel id='demo-simple-select-label'>Project lead</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              className='tw-w-[90%]'
              id='demo-simple-select'
              // value={age}
              label='Age'
              onChange={(_e) => {
                setPeopleDetails((prev) => ({
                  ...prev,
                  projectLead: _e.target.value,
                }));
              }}
            >
              <MenuItem value={'trilok'}>trilok</MenuItem>
              <MenuItem value={'kaushik'}>Kaushik</MenuItem>
              <MenuItem value={'sanjay'}>sanjay</MenuItem>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

export { PepoleFormDetails };
