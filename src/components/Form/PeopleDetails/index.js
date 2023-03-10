import {
  Autocomplete,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

import React from 'react';

import { NAME_EMAIL } from '../../../utils/Constant';
import { ProjectName } from 'components/UI';

function PeopleFormDetails({ peopleDetails, setPeopleDetails }) {
  const textChangeHandler = (e) => {
    setPeopleDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const selectChangeHandler = (e, newValue) => {
    setPeopleDetails((prev) => ({
      ...prev,
      [e.target.id.split('-')[0]]: newValue,
    }));
  };

  return (
    <div className='tw-grid tw-grid-cols-6 tw-gap-y-4'>
      <ProjectName name={'Project'} />
      <div className='tw-col-span-4'>
        {/* Basic part 1 */}
        <div className='tw-grid tw-grid-cols-2 tw-gap-4 tw-mb-5'>
          <div className='tw-col-span-1 '>
            <InputLabel id='client Name'>Client Name</InputLabel>
            <TextField
              className='tw-w-[90%]'
              id='clientName'
              name='clientName'
              value={peopleDetails.clientName}
              required={true}
              // never pass directly
              onChange={textChangeHandler}
            />
          </div>
          <div className='tw-col-span-1'>
            <InputLabel id='demo-simple-select-label'>Collaborators</InputLabel>
            <Autocomplete
              multiple
              id='collaborators'
              className='tw-w-[90%]'
              options={NAME_EMAIL}
              onChange={(_e, newValue) => {
                selectChangeHandler(_e, newValue);
              }}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} placeholder='Collaborators' />
              )}
            />
          </div>
        </div>
        {/* Basic 2 */}
        <div className='tw-grid tw-grid-cols-2 tw-gap-4'>
          <div className='tw-col-span-1'>
            <InputLabel id='demo-simple-select-label'>
              Engagement director
            </InputLabel>
            <Autocomplete
              options={NAME_EMAIL}
              className='tw-w-[90%]'
              id='director'
              disablePortal
              onChange={(_e, newValue) => {
                selectChangeHandler(_e, newValue);
              }}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} placeholder='Engagement director' />
              )}
            />
          </div>
          <div className='tw-col-span-1'>
            <InputLabel id='demo-simple-select-label'>Project lead</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              className='tw-w-[90%]'
              id='projectLead'
              name='projectLead'
              label=''
              onChange={textChangeHandler}
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
PeopleFormDetails = React.memo(PeopleFormDetails);
export { PeopleFormDetails };
