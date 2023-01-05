import { Button } from '@mui/material';
import { ModalComponent } from 'components/ui/Modal';
import React, { useEffect, useState } from 'react';
import { formValid } from 'utils';
import { Basic } from './BasicDetails';
import { ChargeCode } from './ChargeCode';
import { PepoleFormDetails } from './PeopleDetails';

let todays = new Date().toISOString().split('T')[0];
function ProjectForm() {
  const [basicDetails, setBasicDetails] = useState({
    projectName: '',
    projectType: '',
    startDate: todays,
    endData: todays,
    descriptions: '',
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [chargeCode, setChargeCode] = useState({
    value: '',
    errorMessage: '',
    error: true,
  });

  const [peopleDetails, setPeopleDetails] = useState({
    clientName: '',
    colaborators: '',
    director: '',
    projectLead: '',
  });

  const [isFormValid, setIsFormValid] = useState({
    basicDetails: false,
    peopleDetails: false,
  });

  useEffect(() => {
    formValid({ basicDetails, peopleDetails, setIsFormValid });
  }, [peopleDetails, basicDetails]);

  const isReadyToSubmit =
    isFormValid.basicDetails && isFormValid.peopleDetails && chargeCode.error;

  return (
    <div className=' tw-bg-white'>
      <h1>Project Info</h1>
      <div className='tw-my-8'>
        <Basic
          setBasicDetails={setBasicDetails}
          basicDetails={setBasicDetails}
        />
      </div>
      <div className='tw-my-8'>
        <PepoleFormDetails
          peopleDetails={peopleDetails}
          setPeopleDetails={setPeopleDetails}
        />
      </div>

      <ModalComponent open={open} handleClose={handleClose} />

      <ChargeCode chargeCode={chargeCode} setChargeCode={setChargeCode} />
      <div className='tw-grid tw-grid-cols-6 tw-gap-y-4 tw-mt-8'>
        <hr className='tw-h-8 tw-min-w-full tw-col-span-6'></hr>
        <div className='tw-col-span-6 '>
          <div className='tw-flex tw-justify-end  tw-my-4 tw-mx-4'>
            <Button
              variant='outlined'
              sx={{ marginRight: 2 }}
              onClick={handleOpen}
            >
              Cancel
            </Button>
            <Button variant='outlined' disabled={!isReadyToSubmit}>
              Procced
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProjectForm };
