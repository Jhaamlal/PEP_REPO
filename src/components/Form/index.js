import { Button } from '@mui/material';
import { ModalComponent } from 'components/ui/Modal';
import React, { useEffect, useState } from 'react';
import { Basic } from './BasicDetails';
import { ChargeCode } from './ChargeCode';
import { PepoleFormDetails } from './PeopleDetails';

let todays = new Date().toISOString().split('T')[0];
function ProjectForm() {
  const [basicDetails, setBasicDetails] = useState({
    projectName: '',
    projectType: '',
    startDate: todays,
    endData: '',
    descriptions: '',
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [chargeCode, setChargeCode] = useState({
    value: '',
    errorMessage: '',
    error: false,
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

  const formValid = () => {
    for (const key in basicDetails) {
      const isValueAllExist = basicDetails[key].length >= 4;
      if (!isValueAllExist) {
        setIsFormValid((prev) => ({
          ...prev,
          basicDetails: false,
        }));
        break;
      } else {
        setIsFormValid((prev) => ({
          ...prev,
          basicDetails: true,
        }));
      }
    }
    for (const key in peopleDetails) {
      const isValueAllExist = peopleDetails[key].length >= 1;
      if (key === 'director') {
        const isValueAllExist =
          !!peopleDetails['director']?.['name']?.length >= 1;
        if (!isValueAllExist) {
          setIsFormValid((prev) => ({
            ...prev,
            peopleDetails: false,
          }));
          break;
        } else {
          setIsFormValid((prev) => ({
            ...prev,
            peopleDetails: true,
          }));
        }
      } else {
        if (!isValueAllExist) {
          setIsFormValid((prev) => ({
            ...prev,
            peopleDetails: false,
          }));
          break;
        } else {
          setIsFormValid((prev) => ({
            ...prev,
            peopleDetails: true,
          }));
        }
      }
    }
  };
  useEffect(() => {
    formValid();
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
          // error={isBasicValid}
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
            <Button variant='outlined' className='tw-mx-4' onClick={handleOpen}>
              Cancel
            </Button>
            <Button
              variant='outlined'
              className='tw-mx-4'
              disabled={!isReadyToSubmit}
            >
              Procced
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProjectForm };
