import * as React from 'react';

import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function BasicDatePicker({ startDate, setStartDate }) {
  let todays = new Date().toISOString().split('T')[0];
  const [value, setValue] = React.useState(todays);

  return (
    <DatePicker
      ampm={false}
      value={startDate}
      disablePast={true}
      required={true}
      onChange={(newValue) => {
        setStartDate(newValue);
      }}
      renderInput={(params) => <TextField {...params} />}
    />
  );
}

export { BasicDatePicker };
