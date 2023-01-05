import { Button, Checkbox } from '@mui/material';
import React, { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useGetSingleLever } from 'api';
import { useDispatch, useSelector } from 'react-redux';

import {
  childUpdate,
  grandParentUpdate,
  parentUpdate,
} from '../../Store/Features/leverSlice';

// let x = {
//   Agricultue: {
//     segemet1: {
//       isChecked: true, //selected child is true if  total segmentSelected sector wale se mile
//       isIntermeideate: true, // is total selected is less then total segment selected
//       totalSegmentSelected: 108, // length of child selected
//       selectedChild: [],
//     },
//     segent2: {
//       isChecked: true,
//       isIntermeideate: true,
//       totalSegmentSelected: 108,
//       selectedChild: [],
//     },
//     segment3: {
//       isChecked: true,
//       isIntermeideate: true,
//       totalSegmentSelected: 108,
//       selectedChild: [],
//     },
//     isChecked: true,
//     isIntermeideate: true,
//     totalSegmentSelected: 108,
//   },
//   Industry: {
//     segemet1: {
//       isChecked: true, //selected child is true if  total segmentSelected sector wale se mile
//       isIntermeideate: true, // is total selected is less then total segment selected
//       totalSegmentSelected: 108, // length of child selected
//       selectedChild: [],
//     },
//     segent2: {
//       isChecked: true,
//       isIntermeideate: true,
//       totalSegmentSelected: 108,
//       selectedChild: [],
//     },
//     segment3: {
//       isChecked: true,
//       isIntermeideate: true,
//       totalSegmentSelected: 108,
//       selectedChild: [],
//     },
//     isChecked: true,
//     isIntermeideate: true,
//     totalSegmentSelected: 108,
//   },
//   total: 0,
// };

function Sectors({ selectedLever, leverObject }) {
  const selectedSectorsData = {};
  const [selectedSegment, setSelectedSegment] = useState('');
  const [grandParentSelected, setGrandparentSelected] = useState({});
  const [totalSegments, setTotalSegments] = useState(0);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.levers.sectorData);

  const { data: leverData } = useGetSingleLever(selectedLever);

  leverData?.map((item, index) => {
    const isKeyExist = selectedSectorsData.hasOwnProperty(item['segment']);
    if (isKeyExist) {
      const newObj = {
        name: item['name'],
        category: item['category'],
        location: item['location'],
        description: item['description'],
        id: item['uuid'],
        sector: item['sector'],
        segment: item['segment'],
      };
      selectedSectorsData[item['segment']].push(newObj);
    }
    if (!isKeyExist) {
      selectedSectorsData[item['segment']] = [];
    }
  });

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

    // agar nahi hai
    let obj = { ...grandParentSelected };
    const isSectorExist = grandParentSelected.hasOwnProperty(
      leverData[0]['sector'],
    );
    if (isSectorExist) {
      obj[leverData[0]['sector']] = {
        ...obj[leverData[0]['sector']],
        [item]: {
          isChecked: true,
          isIntermeideate: false,
          segmentSelected: 0,
          selectedChild: [],
        },
      };

      selectedSectorsData[item].map((item1, index) => {
        obj[leverData[0]['sector']][item1['segment']]['selectedChild'].push(
          item1.id,
        );
        obj[leverData[0]['sector']][item1['segment']]['segmentSelected'] += 1;
        obj[leverData[0]['sector']]['totalSegmentSelected'] += 1;
      });

      setGrandparentSelected((prev) => {
        const allObjects = { ...prev, ...obj };

        allObjects[Object.keys(allObjects)[0]] = 0;
        for (let index = 1; index < Object.keys(allObjects).length; index++) {
          allObjects[Object.keys(allObjects)[0]] +=
            allObjects[Object.keys(allObjects)[index]]['totalSegmentSelected'];
        }
        return allObjects;
      });
    }

    if (!isSectorExist) {
      let obj = {
        totalSelected: !!grandParentSelected['totalSelected']
          ? grandParentSelected['totalSelected']
          : 0,
      };
      obj[leverData[0]['sector']] = {
        isChecked: false,
        isIntermeideate: true,
        totalSegmentSelected: 0,
        [item]: {
          isChecked: true,
          isIntermeideate: false,
          segmentSelected: 0,
          selectedChild: [],
        },
      };

      selectedSectorsData[item].map((item1, index) => {
        obj[leverData[0]['sector']][item1['segment']]['selectedChild'].push(
          item1.id,
        );
        obj[leverData[0]['sector']][item1['segment']]['segmentSelected'] += 1;
        obj[leverData[0]['sector']]['totalSegmentSelected'] += 1;
      });

      setGrandparentSelected((prev) => {
        const allObjects = { ...prev, ...obj };
        Object.keys(allObjects);
        allObjects[Object.keys(allObjects)[0]] = 0;
        for (let index = 1; index < Object.keys(allObjects).length; index++) {
          allObjects[Object.keys(allObjects)[0]] +=
            allObjects[Object.keys(allObjects)[index]]['totalSegmentSelected'];
        }
        return allObjects;
      });
    }
  };

  const childChangeHandler = ({ item, event, index }) => {
    event.preventDefault();
    const isSectorExist = grandParentSelected.hasOwnProperty(item['sector']);

    dispatch(
      childUpdate({
        selectedSectorSegments: selectedSectorsData,
        selectedItem: item,
        selectedSector: leverData[0]['sector'],
      }),
    );

    if (!isSectorExist) {
      let obj = {
        totalSelected: 0,
      };

      obj[leverData[0]['sector']] = {
        isChecked: true,
        isIntermeideate: true,
        totalSegmentSelected: 0,
      };
    }

    // if (!isSectorExist) {
    //   const sectorObj = {};
    //   sectorObj[item['sector']] = {};
    //   sectorObj[item['sector']][item['segment']] = [];
    //   sectorObj[item['sector']][item['segment']].push(item['id']);

    //   setChildSelected((prev) => {
    //     return { ...prev, ...sectorObj };
    //   });
    // }
    // if (isSectorExist) {
    //   const isSegmentExist = childSelected[item['sector']].hasOwnProperty(
    //     item['segment'],
    //   );
    //   if (!isSegmentExist) {
    //     childSelected[item['sector']][item['segment']] = [];
    //     childSelected[item['sector']][item['segment']].push(item['id']);
    //     setChildSelected((prev) => {
    //       return { ...prev };
    //     });
    //   }
    //   if (isSegmentExist) {
    //     const idExist = childSelected[item['sector']][item['segment']].includes(
    //       item['id'],
    //     );
    //     if (idExist) {
    //       childSelected[item['sector']][item['segment']] = childSelected[
    //         item['sector']
    //       ][item['segment']].filter((id) => id !== item['id']);
    //       setChildSelected((prev) => {
    //         return { ...prev };
    //       });
    //     }
    //     if (!idExist) {
    //       childSelected[item['sector']][item['segment']].push(item['id']);
    //       setChildSelected((prev) => {
    //         return { ...prev };
    //       });
    //     }
    //   }
    // if nahi
    // if (!isSectorExist) {
    //   const sectorObj = {};
    //   sectorObj[item['sector']] = {};
    //   sectorObj[item['sector']][item['segment']] = [];
    //   sectorObj[item['sector']][item['segment']].push(item['id']);

    //   setChildSelected((prev) => {
    //     return { ...prev, ...sectorObj };
    //   });
    // }
    // if (isSectorExist) {
    //   const isSegmentExist = childSelected[item['sector']].hasOwnProperty(
    //     item['segment'],
    //   );
    //   if (!isSegmentExist) {
    //     childSelected[item['sector']][item['segment']] = [];
    //     childSelected[item['sector']][item['segment']].push(item['id']);
    //     setChildSelected((prev) => {
    //       return { ...prev };
    //     });
    //   }
    //   if (isSegmentExist) {
    //     const idExist = childSelected[item['sector']][item['segment']].includes(
    //       item['id'],
    //     );
    //     if (idExist) {
    //       childSelected[item['sector']][item['segment']] = childSelected[
    //         item['sector']
    //       ][item['segment']].filter((id) => id !== item['id']);
    //       setChildSelected((prev) => {
    //         return { ...prev };
    //       });
    //     }
    //     if (!idExist) {
    //       childSelected[item['sector']][item['segment']].push(item['id']);
    //       setChildSelected((prev) => {
    //         return { ...prev };
    //       });
    //     }
    //   }
    // }

    return;
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
              <div className='tw-ml-2' key={index}>
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
