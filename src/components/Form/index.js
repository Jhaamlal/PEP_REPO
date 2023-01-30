import { Button, Typography } from '@mui/material';
import { ModalComponent } from 'components/UI/Modal';
import React, { useEffect, useState } from 'react';
import { formValid } from 'utils';
import { BasicDetails } from './BasicDetails';
import { ChargeCode } from './ChargeCode';
import { PeopleFormDetails } from './PeopleDetails';
import { Selectedchildren } from 'components/UI';

const WarningModal = () => {
  return (
    <>
      <Typography id='modal-modal-title' variant='h6' component='h2'>
        Leave the Page ?
      </Typography>
      <Typography id='modal-modal-description' sx={{ mt: 2 }}>
        Change You made will not be save ? Are You sure ?
      </Typography>
    </>
  );
};

function ProjectForm() {
  const [basicDetails, setBasicDetails] = useState({
    projectName: '',
    projectType: '',
    startDate: '',
    endData: '',
    descriptions: '',
  });
  const [selectedModal, setSelectedModal] = useState(WarningModal);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [chargeCode, setChargeCode] = useState({
    value: '',
    errorMessage: '',
    error: false,
  });

  const [peopleDetails, setPeopleDetails] = useState({
    clientName: '',
    collaborators: '',
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

  const proceedHandler = () => {
    setSelectedModal(<Selectedchildren />);
    setOpen(true);
  };

  const cancelHandler = () => {
    setSelectedModal(<WarningModal />);
    setOpen(true);
  };

  return (
    <div className=' tw-bg-white tw-px-8 '>
      <h1>Project Info</h1>
      <div className='tw-my-8'>
        <BasicDetails
          setBasicDetails={setBasicDetails}
          // naming function
          basicDetails={basicDetails}
        />
      </div>
      <hr className='tw-h-8 tw-min-w-full tw-col-span-6'></hr>
      <div className='tw-my-8'>
        <PeopleFormDetails
          peopleDetails={peopleDetails}
          setPeopleDetails={setPeopleDetails}
        />
      </div>
      <hr className='tw-h-8 tw-min-w-full tw-col-span-6'></hr>
      <ModalComponent
        open={open}
        handleClose={handleClose}
        modalComponent={selectedModal}
      />

      <ChargeCode chargeCode={chargeCode} setChargeCode={setChargeCode} />

      <div className='tw-grid tw-grid-cols-6 tw-gap-y-4 tw-mt-8'>
        <hr className='tw-h-8 tw-min-w-full tw-col-span-6'></hr>
        <div className='tw-col-span-6 '>
          <div className='tw-flex tw-justify-end  tw-my-4 tw-mx-4'>
            <Button
              variant='outlined'
              sx={{ marginRight: 2 }}
              onClick={cancelHandler}
            >
              Cancel
            </Button>
            <Button
              variant='outlined'
              disabled={!isReadyToSubmit}
              onClick={proceedHandler}
            >
              Proceed
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProjectForm };
