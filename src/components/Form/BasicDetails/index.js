import { InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React, { useState } from 'react';
import { validateProperty } from 'utils';

import { BasicDetailSchema } from '../Schema';
import { ProjectName } from 'components/ui';

let todays = new Date().toISOString().split('T')[0];
function Basic({ basicDetails, setBasicDetails, error }) {
  const [startDate, setStartDate] = useState(todays);
  const [endtDate, setEndtDate] = useState(todays);
  const [errors, setErrors] = useState({});

  const handleStartData = (newValue) => {
    const changeFormate = `${newValue['$y']}-${newValue['$M'] + 1}-${
      newValue['$D']
    }`;
    setBasicDetails((prev) => {
      return { ...prev, startDate: changeFormate };
    });
  };
  const handleEndData = (newValue) => {
    const changeFormate = `${newValue['$y']}-${newValue['$M'] + 1}-${
      newValue['$D']
    }`;
    setBasicDetails((prev) => {
      return { ...prev, endData: changeFormate };
    });
  };

  // const handleDates = ({ newValue, type }) => {
  //   const changeFormate = `${newValue['$y']}-${newValue['$M'] + 1}-${
  //     newValue['$D']
  //   }`;

  //   let yZ=type.toString()

  //   setBasicDetails((prev) => {
  //     return { ...prev, yZ: changeFormate };
  //   });
  // };

  const handleSave = (event) => {
    const { name, value } = event.target;
    let errorData = { ...errors };
    const errorMessage = validateProperty({ event, BasicDetailSchema });
    if (errorMessage) {
      errorData[name] = errorMessage;
    } else {
      delete errorData[name];
    }
    let customerData = { ...basicDetails };
    customerData[name] = value;
    setBasicDetails((prev) => {
      return { ...prev, ...customerData };
    });
    setErrors(errorData);
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
              onChange={handleSave}
              name='projectName'
              value={basicDetails.projectName}
              id='demo-helper-text-aligned'
              inputProps={{ minLength: 3 }}
              required={true}
            />
            {errors.projectName && (
              <div className='tw-text-red-400 tw-font-light'>
                {errors.projectName}
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
              value={basicDetails.projectType}
              required={true}
              onChange={handleSave}
            >
              <MenuItem value={'project1'}>Project 1</MenuItem>
              <MenuItem value={'project2'}>Project 2</MenuItem>
              <MenuItem value={'project3'}>Project 3</MenuItem>
            </Select>
            {errors.projectType && (
              <div className='tw-text-red-400 tw-font-light'>
                {errors.projectType}
              </div>
            )}
          </div>
        </div>
        {/* Basic 2 */}
        <div className='tw-grid tw-grid-cols-4 tw-gap-y-4 tw-my-4'>
          <div className='tw-col-span-2 '>
            <InputLabel id='demo-simple-select-label'>
              Project Start date
            </InputLabel>
            <DatePicker
              value={startDate}
              className='tw-w-[33rem]'
              disablePast={true}
              required={true}
              onChange={(newValue) => {
                setStartDate(newValue);
                handleStartData(newValue);
                // handleDates({ newValue, type: 'startDate' });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <div className='tw-col-span-2'>
            <InputLabel id='demo-simple-select-label'>
              Project End date
            </InputLabel>
            <DatePicker
              value={endtDate}
              className='tw-w-[33rem]'
              disablePast={true}
              required={true}
              onChange={(newValue) => {
                setEndtDate(newValue);
                handleEndData(newValue);
                // handleDates({ newValue, type: 'endtDate' });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </div>
        {/* Basic part 3 */}
        <div className='tw-col-span-2'>
          <InputLabel id='Form Id'>Description</InputLabel>
          <TextField
            className='tw-w-[80%]'
            placeholder='Put the Descriptions'
            name='descriptions'
            multiline
            rows={2}
            onChange={handleSave}
            required={true}
            maxRows={4}
            inputProps={{ maxLength: 1000 }}
            helperText={'max limit 1000'}
          />
          {errors.descriptions && (
            <div className='tw-text-red-400 tw-font-light'>
              {errors.descriptions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { Basic };
