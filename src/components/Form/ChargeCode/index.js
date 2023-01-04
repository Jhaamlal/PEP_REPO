import { InputLabel, TextField } from '@mui/material';
import React, { useState } from 'react';

function ChargeCode({ chargeCode, setChargeCode }) {
  const handleChargeCodeChange = (e) => {
    let specialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const isContainSpecialCharecter = specialChar.test(e.target.value);

    if (!isContainSpecialCharecter) {
      setChargeCode({
        value: e.target.value,
        errorMessage: '',
        error: false,
      });
    }
    if (isContainSpecialCharecter) {
      setChargeCode((prev) => ({
        ...prev,
        errorMessage: 'Special charecter are not allowed ',
        error: false,
      }));
    }
    const totalLength = e.target.value.length < 6;
    if (totalLength) {
      setChargeCode((prev) => ({
        ...prev,
        errorMessage: 'At least 6 charecter',
        error: false,
      }));
    }
    if (!totalLength) {
      setChargeCode((prev) => ({
        ...prev,
        errorMessage: '',
        error: true,
      }));
    }
  };
  return (
    <div className='tw-grid tw-grid-cols-6 tw-gap-y-4 tw-mt-8'>
      <div className='tw-col-span-3 '>Acesss</div>
      <div className='tw-col-span-3'>
        {/* Basic part 1-2 */}
        <div className='tw-grid tw-grid-cols-2 tw-gap-4'>
          <div className='tw-col-span-2 '>
            <div className=' tw-bg-white'>
              <p>Note: Pk Fee will be calculated sed on number leverd </p>
              <InputLabel id='Form Id'>Chage code</InputLabel>

              <TextField
                value={chargeCode.value}
                className='tw-w-[50%]'
                onChange={handleChargeCodeChange}
                helperText={chargeCode.errorMessage} // error message
                error={!chargeCode.error} // set to true to change the border/helperText color to red
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
