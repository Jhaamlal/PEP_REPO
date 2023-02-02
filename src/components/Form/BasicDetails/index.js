import { InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React, { useState, memo } from 'react';
import { validateProperty } from 'utils';

import { BasicDetailSchema } from '../Schema';
import { ProjectName } from 'components/UI';
import dayjs from 'dayjs';
import { basicDetailsActions } from 'utils/constant';

// let todays = new Date().toISOString().split('T')[0];
let todays = dayjs(new Date());
function BasicDetails({ error, basicDetailsState, basicDetailsDispatch }) {
  const [startDate, setStartDate] = useState(todays);
  const [endDate, setEndDate] = useState(todays);

  const handelDispatch = (event) => {
    event.preventDefault();
    event.stopPropagation();
    basicDetailsDispatch({ type: basicDetailsActions.TEXT, payload: event });
  };

  const handleDateDispatch = (newValue, dateType) => {
    basicDetailsDispatch({
      type: basicDetailsActions.DATE,
      payload: { newValue, dateType },
    });
  };

  return (
    <div className='tw-grid tw-grid-cols-6 tw-gap-y-4 '>
      <ProjectName name={'Basic Details'} />
      <div className='tw-col-span-4'>
        {/* Basic part 1 */}
        <div className='tw-grid tw-grid-cols-4 tw-gap-4'>
          <div className='tw-col-span-2 '>
            <InputLabel id='demo-simple-select-label'>Project Name</InputLabel>
            <TextField
              className='tw-w-full'
              onChange={handelDispatch}
              name='projectName'
              value={basicDetailsState.projectName}
              id='demo-helper-text-aligned'
              inputProps={{ minLength: 3 }}
              required={true}
            />
            {basicDetailsState.errors.projectName && (
              <div className='tw-text-red-400 tw-font-light'>
                {basicDetailsState.errors.projectName}
              </div>
            )}
          </div>
          <div className='tw-col-span-2'>
            <InputLabel id='demo-simple-select-label'>Project Type</InputLabel>
            <Select
              className='tw-w-full '
              name='projectType'
              size='medium'
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Age'
              value={basicDetailsState.projectType}
              required={true}
              onChange={handelDispatch}
            >
              <MenuItem value={'project1'}>Project 1</MenuItem>
              <MenuItem value={'project2'}>Project 2</MenuItem>
              <MenuItem value={'project3'}>Project 3</MenuItem>
            </Select>
            {basicDetailsState.errors.projectType && (
              <div className='tw-text-red-400 tw-font-light'>
                {basicDetailsState.errors.projectType}
              </div>
            )}
          </div>
        </div>
        {/* Basic 2 */}
        <div className='tw-grid tw-grid-cols-4 tw-gap-4 tw-my-4'>
          <div className='tw-col-span-2 '>
            <InputLabel id='demo-simple-select-label'>
              Project Start date
            </InputLabel>
            <DatePicker
              value={startDate}
              className='tw-w-full'
              disablePast={true}
              required={true}
              onChange={(newValue, dateType = 'startDate') => {
                setStartDate(newValue);
                handleDateDispatch(newValue, dateType);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <div className='tw-col-span-2'>
            <InputLabel id='demo-simple-select-label'>
              Project End date
            </InputLabel>
            <DatePicker
              value={endDate}
              className='tw-w-full'
              disablePast={true}
              required={true}
              minDate={startDate}
              onChange={(newValue, dateType = 'endData') => {
                setEndDate(newValue);
                handleDateDispatch(newValue, dateType);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </div>
        {/* Basic part 3 */}
        <div className='tw-col-span-2'>
          <InputLabel id='Form Id'>Description</InputLabel>
          <TextField
            className='tw-w-full'
            placeholder='Put the Descriptions'
            name='descriptions'
            multiline
            rows={2}
            onChange={handelDispatch}
            required={true}
            maxRows={4}
            inputProps={{ maxLength: 1000 }}
            helperText={'max limit 1000'}
          />
          {basicDetailsState.errors.descriptions && (
            <div className='tw-text-red-400 tw-font-light'>
              {basicDetailsState.errors.descriptions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
BasicDetails = memo(BasicDetails);
export { BasicDetails };
