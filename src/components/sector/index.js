import { Checkbox } from '@mui/material';
import React, { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useGetSingleLever } from 'api';

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
  const [parentSelected, setParentSelected] = useState([]);
  const [childSelected, setChildSelected] = useState({});

  const { data: leverData } = useGetSingleLever(selectedLever);
  //  isChecked: false,
  //     isIndeterminate: false,
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

  const grandParentSelectedHandler = () => {
    console.log('log segment', selectedSectorsData);
    console.log('LeverData', leverData[0]['sector']);
    console.log('Lever object', leverObject);
    console.count('gp');

    const isSectorExist = grandParentSelected.hasOwnProperty(
      leverData[0]['sector'],
    );

    // if (!isSectorExist) {
    let obj2 = {};
    let obj = {
      totalSelected: 0,
    };

    obj[leverData[0]['sector']] = {
      isChecked: true,
      isIntermeideate: false,
      totalSegmentSelected: 0,
    };

    Object.keys(selectedSectorsData).map((item, index) => {
      console.log(item);
      obj[leverData[0]['sector']]['totalSegmentSelected'] +=
        selectedSectorsData[item].length;
    });

    for (
      let index = 0;
      index < Object.keys(selectedSectorsData).length;
      index++
    ) {
      obj2[Object.keys(selectedSectorsData)[index]] = {
        isChecked: true,
        isIntermeideate: true,
        selectedChild: [],
        segmentSelected:
          selectedSectorsData[Object.keys(selectedSectorsData)[index]].length,
      };
    }
    console.log('object 2', obj2);

    obj[leverData[0]['sector']] = { ...obj[leverData[0]['sector']], ...obj2 };
    console.log('object', obj);
    Object.keys(selectedSectorsData).map((sectorKey, index) => {
      console.log(selectedSectorsData[sectorKey]);
      console.log(obj[leverData[0]['sector']][sectorKey]['selectedChild']);
      selectedSectorsData[sectorKey].map((item) => {
        obj[leverData[0]['sector']][sectorKey]['selectedChild'].push(
          item['id'],
        );
        return;
      });
      return '';
    });

    setGrandparentSelected((prev) => {
      const allObjects = { ...prev, ...obj };
      Object.keys(allObjects);
      for (let index = 1; index < Object.keys(allObjects).length; index++) {
        allObjects[Object.keys(allObjects)[0]] +=
          allObjects[Object.keys(allObjects)[index]]['totalSegmentSelected'];
      }
      return allObjects;
    });
    // }
    // if (isSectorExist) {
    //   const removeFromTotal =
    //     grandParentSelected[leverData[0]['sector']]['totalSegmentSelected'];
    //   grandParentSelected['totalSelected'] =
    //     grandParentSelected['totalSelected'] - removeFromTotal;
    //   grandParentSelected[leverData[0]['sector']] = {
    //     isChecked: false,
    //     isIntermeideate: false,
    //     totalSegmentSelected: 0,
    //   };
    //   delete grandParentSelected[leverData[0]['sector']];
    //   console.log('grand parent', grandParentSelected);
    // }
  };

  const parentChangehandler = ({ item, index, event }) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedSegment(item);

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
        console.log(Object.keys(allObjects));
        allObjects[Object.keys(allObjects)[0]] = 0;
        for (let index = 1; index < Object.keys(allObjects).length; index++) {
          allObjects[Object.keys(allObjects)[0]] +=
            allObjects[Object.keys(allObjects)[index]]['totalSegmentSelected'];
        }
        return allObjects;
      });
    }
    console.log(grandParentSelected);
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
    console.log('log segment', selectedSectorsData);
    console.log('LeverData', leverData[0]['sector']);
    console.log('Lever object', leverObject);
    const isSectorExist = grandParentSelected.hasOwnProperty(item['sector']);

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

  // console.log('child selected selcted', childSelected);

  console.log('grand parent selected', grandParentSelected);
  console.log('is checkeed grand parent ', grandParentSelected);
  console.log('is checkeed', leverData?.[0]?.['sector']);
  // console.log('selcted sector data', selectedSectorsData);
  return (
    <>
      <div className='tw-grid tw-grid-cols-6 tw-h-96 tw-gap-4 tw-mt-8 tw-mx-4'>
        <div className='tw-col-span-1 tw-bg-slate-50 '>
          <div className='tw-mt-4 tw-font-bold tw-ml-2'>4 Segment</div>
          <div>
            <FormControlLabel
              label={'SelectAll'}
              control={
                <Checkbox
                  checked={
                    !!grandParentSelected[leverData?.[0]?.['sector']]?.isChecked
                  }
                  indeterminate={
                    !!grandParentSelected[leverData?.[0]?.['sector']]
                      ?.isIndeterminate
                  }
                />
              }
              onChange={grandParentSelectedHandler}
            />
          </div>
          {Object.keys(selectedSectorsData).map((item, index) => {
            console.log('item', item);
            return (
              <div className='tw-ml-2' key={index}>
                <FormControlLabel
                  label={item}
                  control={
                    <Checkbox
                      checked={!!parentSelected?.[index]?.['isChecked']}
                      indeterminate={
                        parentSelected?.[index]?.['isIndeterminate']
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
        <div className='tw-col-span-5 tw-bg-slate-50'>
          <div className='tw-grid tw-grid-cols-4 tw-p-2 tw-gap-4 tw-bg-slate-800 tw-text-white'>
            <div className='tw-col-span-1'>Lever Name</div>
            <div className='tw-col-span-1'>Category</div>
            <div className='tw-col-span-1'>Location</div>
            <div className='tw-col-span-1'>Description</div>
          </div>
          {selectedSectorsData[selectedSegment]?.map((item, index) => {
            const isChecked = !!childSelected?.[item['sector']]?.[
              item['segment']
            ]?.includes(item['id']);
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
