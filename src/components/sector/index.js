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
} from '../../Store/Features/leverSlice';
import { sectoreData } from 'utils';

function Sectors({ selectedLever, leverObject }) {
  const [selectedSegment, setSelectedSegment] = useState('');
  const [totalSegments, setTotalSegments] = useState(0);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.levers.sectorData);

  const { data: leverData } = useGetSingleLever(selectedLever);
  const selectedSectorsData = sectoreData({ leverData });
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
                  checked={!!selector[selectedSector]?.['isChecked']}
                  indeterminate={
                    !!selector[selectedSector]?.['isIntermeideate']
                  }
                  onChange={grandParentSelectedHandler}
                />
              }
            />
          </div>
          {Object.keys(selectedSectorsData).map((item, index) => {
            return (
              <div
                className={`tw-ml-2 tw-flex tw-justify-between active:tw-bg-blue-200`}
                key={index}
              >
                <FormControlLabel
                  label={item}
                  control={
                    <Checkbox
                      checked={
                        !!selector[selectedSector]?.[item]?.['isChecked']
                      }
                      indeterminate={
                        !!selector[selectedSector]?.[item]?.['isIntermeideate']
                      }
                    />
                  }
                  onClick={(event) =>
                    parentChangehandler({ item, index, event })
                  }
                />
                <AiOutlineArrowRight
                  className='tw-self-center tw-mr-4 tw-cursor-pointer'
                  onClick={(event) => showSegmentChild({ event, item })}
                />
              </div>
            );
          })}
        </div>
        <div className='tw-col-span-5 tw-bg-slate-50 '>
          <div className='tw-grid tw-grid-cols-4 tw-p-2 tw-gap-4 tw-bg-slate-800 tw-text-white'>
            <div className='tw-col-span-1'>Lever Name</div>
            <div className='tw-col-span-1'>Category</div>
            <div className='tw-col-span-1'>Location</div>
            <div className='tw-col-span-1'>Description</div>
          </div>
          {selectedSectorsData[selectedSegment]?.map((item, index) => {
            const isChecked = !!selector[selectedSector]?.[selectedSegment]?.[
              'selectedChild'
            ]?.includes(item.id);
            return (
              <div
                className='tw-grid tw-grid-cols-4 tw-px-2 tw-gap-2'
                key={index}
              >
                <FormControlLabel
                  label={item['name']}
                  control={<Checkbox checked={isChecked} />}
                  onClick={(event) =>
                    childChangeHandler({ item, event, index })
                  }
                  className='tw-col-span-1'
                />
                <div className='tw-col-span-1 tw-self-center'>
                  {item['category']}
                </div>
                <div className='tw-col-span-1 tw-self-center'>
                  {item['location']}
                </div>
                <div className='tw-col-span-1 tw-self-center'>
                  {item['description']}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export { Sectors };
