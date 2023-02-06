import { Checkbox } from '@mui/material';
import React, { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useGetSingleLever } from 'api';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineArrowRight } from 'react-icons/ai';
import {
  childUpdate,
  grandParentUpdate,
  parentUpdate,
} from '../../store/Features/leverSlice';
import { sectorsData } from 'utils';
import { Segment } from './Segment';
import { SegmentChild } from './SegmentChild';

function Sectors({ selectedLever, leverObject }) {
  const [selectedSegment, setSelectedSegment] = useState('');
  const [totalSegments, setTotalSegments] = useState(0);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.levers.sectorData);

  const { data: leverData } = useGetSingleLever(selectedLever);
  const selectedSectorsData = sectorsData({ leverData });
  const selectedSector = leverData?.[0]?.['sector'];

  useEffect(() => {
    const defaultSelect = Object.keys(selectedSectorsData)[0];
    setSelectedSegment(defaultSelect);
    setTotalSegments(Object.keys(selectedSectorsData).length);
  }, [selectedSector]);

  const grandParentSelectedHandler = () => {
    dispatch(
      grandParentUpdate({
        selectedSectorsData,
        selectedSector: leverData[0]['sector'],
        leversObjectData: leverObject,
      }),
    );
  };

  const parentChangehandler = ({ item, index, event }) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedSegment(item);

    dispatch(
      parentUpdate({
        selectedSectorSegments: selectedSectorsData,
        selectedSegment: item,
        selectedSector: leverData[0]['sector'],
      }),
    );
  };

  const showSegmentChild = ({ item, event }) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedSegment(item);
  };

  const childChangeHandler = ({ item, event, index }) => {
    event.preventDefault();
    dispatch(
      childUpdate({
        selectedSectorSegments: selectedSectorsData,
        selectedItem: item,
        selectedSector: leverData[0]['sector'],
      }),
    );
  };
  const isGrandParentChecked = !!selector[selectedSector]?.['isChecked'];
  const isGrandParentIndeterminate =
    !!selector[selectedSector]?.['intermediate'];
  return (
    <>
      <div className='tw-grid tw-grid-cols-6 tw-h-96 tw-gap-4 tw-mt-8 tw-mx-4'>
        <div className='tw-col-span-1 tw-bg-slate-50  '>
          <div className='tw-mt-4 tw-font-bold tw-ml-2'>{`${totalSegments} Segments`}</div>
          <div>
            <FormControlLabel
              label={'SelectAll'}
              control={
                <Checkbox
                  checked={isGrandParentChecked}
                  indeterminate={isGrandParentIndeterminate}
                  onChange={grandParentSelectedHandler}
                />
              }
            />
          </div>
          <Segment
            selectedSectorsData={selectedSectorsData}
            selector={selector}
            selectedSector={selectedSector}
            parentChangehandler={parentChangehandler}
            showSegmentChild={showSegmentChild}
          />
        </div>
        <SegmentChild
          selectedSectorsData={selectedSectorsData}
          selectedSegment={selectedSegment}
          selector={selector}
          childChangeHandler={childChangeHandler}
          selectedSector={selectedSector}
        />
      </div>
    </>
  );
}

export { Sectors };
