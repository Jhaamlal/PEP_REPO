import { Checkbox } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Leversdata } from 'services';

function Sectors({ selectedLever }) {
  const [sectorData, setSectorData] = useState([]);
  const selectedSectorsData = {};
  const ref = useRef(true);
  const [totalParents, setTotalParents] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState('');
  const [grandParentSelected, setGrandparentSelected] = useState({
    isChecked: false,
    isIndeterminate: false,
  });
  const [parentSelected, setParentSelected] = useState([]);
  const [childSelected, setChildSelected] = useState(false);

  useEffect(() => {
    Leversdata.getSelectedLever(selectedLever).then((data) =>
      setSectorData(data),
    );
  }, [selectedLever]);

  sectorData?.map((item, index) => {
    const isKeyExist = selectedSectorsData.hasOwnProperty(item['segment']);
    if (isKeyExist) {
      const newObj = {
        name: item['name'],
        category: item['category'],
        location: item['location'],
        description: item['description'],
      };
      selectedSectorsData[item['segment']].push(newObj);
    }
    if (!isKeyExist) {
      selectedSectorsData[item['segment']] = [];
    }
  });

  const grandParentSelectedHandler = () => {
    setGrandparentSelected((prev) => ({
      isChecked: !prev.isChecked,
      isIndeterminate: '',
    }));
    setParentSelected((prev) => ({
      isChecked: !prev.isChecked,
      isIndeterminate: '',
    }));
  };

  const parentChangehandler = ({ item, index }) => {
    setSelectedSegment(item);
    // setGrandparentSelected((prev) => ({
    //   isIndeterminate: true,
    // }));

    setParentSelected((prev) => {
      let newPrev = prev;

      if (!prev[index]) {
        let obj = {
          isChecked: true,
          isIndeterminate: false,
        };
        newPrev[index] = obj;
      } else {
        newPrev[index] = {
          isChecked: !prev[index]?.['isChecked'],
          isIndeterminate: prev[index]?.['isIndeterminate'],
        };
      }

      return newPrev;
    });
  };

  const totalParentsNumber = Object.keys(selectedSectorsData).length;

  // useEffect(() => {
  //   let parent = [];

  //   for (let index = 0; index < totalParentsNumber; index++) {
  //     let obj = {
  //       isChecked: false,
  //       isIndeterminate: false,
  //     };
  //     parent.push(obj);
  //   }
  //   console.log(parent);
  //   setParentSelected(parent);
  // }, [selectedLever, selectedSegment]);

  const childChangeHandler = () => {};
  // console.log('parent selcted', parentSelected);

  return (
    <>
      <div className='tw-grid tw-grid-cols-6 tw-h-96 tw-gap-4 tw-mt-8 tw-mx-4'>
        <div className='tw-col-span-1 tw-bg-slate-50 '>
          <div className='tw-mt-4 tw-font-bold tw-ml-2'>4 Segment</div>
          <FormControlLabel
            label={'SelectAll'}
            control={
              <Checkbox
                checked={grandParentSelected.isChecked}
                indeterminate={grandParentSelected.isIndeterminate}
              />
            }
            onChange={grandParentSelectedHandler}
          />
          {Object.keys(selectedSectorsData).map((item, index) => {
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
                  onClick={() => parentChangehandler({ item, index })}
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
            return (
              <div
                className='tw-grid tw-grid-cols-4 tw-px-2 tw-gap-2'
                key={index}
              >
                <FormControlLabel
                  label={item['name']}
                  control={<Checkbox checked={true} />}
                  onClick={() => childChangeHandler(item)}
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
