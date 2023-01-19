import { InputLabel, TextField } from '@mui/material';
import { ProjectName } from 'components/ui';
import React, { useState } from 'react';
import { chargeCodeSchema } from '../schema';

function ChargeCode({ chargeCode, setChargeCode }) {
  const handleChargeCodeChange = (e) => {
    const item = chargeCodeSchema.validate({ field: e.target.value });
    const { error } = item;

    if (!!error) {
      setChargeCode((prev) => ({
        value: e.target.value,
        errorMessage: error?.message,
        error: false,
      }));
    }
    if (!error) {
      setChargeCode((prev) => ({
        value: e.target.value,
        errorMessage: '',
        error: true,
      }));
    }
  };

  return (
    <div className='tw-grid tw-grid-cols-6 tw-gap-y-4 tw-mt-8'>
      <ProjectName name={'Access'} />
      <div className='tw-col-span-4'>
        {/* Basic part 1-2 */}
        <div className='tw-grid tw-grid-cols-2 tw-gap-4'>
          <div className='tw-col-span-2 '>
            <div className=' tw-bg-white'>
              <p>Note: Pk Fee will be calculated sed on number leverd </p>
              <InputLabel id='Form Id'>Charge code</InputLabel>

              <TextField
                value={chargeCode.value}
                className='tw-w-[50%]'
                onChange={handleChargeCodeChange}
                helperText={chargeCode.errorMessage} // error message
                inputProps={{ maxLength: 6 }}
              />
            </div>
          </div>
        </div>
        {/* Basic 2 */}
      </div>
    </div>
  );
}

export { ChargeCode };
