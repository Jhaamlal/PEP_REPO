import { createSlice, current } from '@reduxjs/toolkit';
import {
  addSegmentChild,
  createNewSegment,
  getGrandParentSelection,
  grandTotal,
  hasContainChildElement,
  setIntermideateState,
  withoutChildElement,
} from '../utils';

const initialState = {
  sectorData: {
    Agriculture: {
      isChecked: false,
      isIntermeideate: false,
      totalSegmentSelected: 0,
    },
    Industry: {
      isChecked: false,
      isIntermeideate: false,
      totalSegmentSelected: 0,
    },
    Sector: {
      isChecked: false,
      isIntermeideate: false,
      totalSegmentSelected: 0,
    },
    Transport: {
      isChecked: false,
      isIntermeideate: false,
      totalSegmentSelected: 0,
    },
    Power: {
      isChecked: false,
      isIntermeideate: false,
      totalSegmentSelected: 0,
    },
    grandTotal: 0,
  },
};
const initialParentObj = {
  isChecked: false,
  isIntermeideate: false,
  totalSegmentSelected: 0,
};

const leversSclice = createSlice({
  name: 'assumptions',
  initialState,
  reducers: {
    grandParentUpdate: (state, { payload }) => {
      const { selectedSectorsData, selectedSector, leversObjectData } = payload;

      const isChecked = state.sectorData[selectedSector]?.['isChecked'];

      let allSectorData = { ...state.sectorData };

      if (isChecked) {
        allSectorData = {
          ...allSectorData,
          [selectedSector]: {
            ...initialParentObj,
          },
        };
      }

      if (!isChecked) {
        Object.keys(selectedSectorsData).map((item, index) => {
          allSectorData[selectedSector]['totalSegmentSelected'] +=
            selectedSectorsData[item].length;
        });
        let newSegment = createNewSegment({ selectedSectorsData });
        allSectorData[selectedSector] = {
          ...allSectorData[selectedSector],
          isChecked: true,
          isIntermeideate: false,
          ...newSegment,
        };

        Object.keys(selectedSectorsData).map((sectorKey, index) => {
          selectedSectorsData[sectorKey].map((item) => {
            allSectorData[selectedSector][sectorKey]['selectedChild'].push(
              item['id'],
            );
            return;
          });
          return '';
        });
      }
      state.sectorData = grandTotal({ allSectorData });
    },

    parentUpdate: (state, { payload }) => {
      const { selectedSectorSegments, selectedSegment, selectedSector } =
        payload;
      let allSectorData = { ...state.sectorData };
      const isSegmentExist =
        allSectorData[selectedSector].hasOwnProperty(selectedSegment);

      if (isSegmentExist) {
        const segmentSelected =
          allSectorData[selectedSector]?.[selectedSegment]['segmentSelected'];
        delete allSectorData[selectedSector]?.[selectedSegment];
        allSectorData[selectedSector]['totalSegmentSelected'] -=
          segmentSelected;
      }

      if (!isSegmentExist) {
        allSectorData[selectedSector] = {
          ...allSectorData[selectedSector],
          [selectedSegment]: {
            isChecked: true,
            isIntermeideate: false,
            segmentSelected: 0,
            selectedChild: [],
          },
        };
        allSectorData = addSegmentChild({
          selectedSectorSegments,
          selectedSegment,
          selectedSector,
          allSectorData,
        });
      }

      const { isGPSelected, isGPIntermidiate } = getGrandParentSelection({
        selectedSectorSegments,
        allSectorData,
        selectedSector,
      });

      allSectorData[selectedSector] = {
        ...allSectorData[selectedSector],
        isChecked: isGPSelected,
        isIntermeideate: isGPIntermidiate,
      };

      state.sectorData = grandTotal({ allSectorData });
    },

    childUpdate: (state, { payload }) => {
      const { selectedSectorSegments, selectedItem, selectedSector } = payload;

      const selectedSegment = selectedItem['segment'];

      let allSectorData = { ...state.sectorData };

      const hasSegment =
        allSectorData[selectedSector].hasOwnProperty(selectedSegment);

      // if segemnt,and child nahi hai
      if (hasSegment) {
        const hasChild = allSectorData[selectedSector][
          selectedSegment
        ].selectedChild.includes(selectedItem['id']);

        if (!hasChild) {
          allSectorData = hasContainChildElement({
            allSectorData,
            selectedItem,
            selectedSector,
            selectedSegment,
          });
        }
        if (hasChild) {
          allSectorData = withoutChildElement({
            allSectorData,
            selectedItem,
            selectedSector,
            selectedSegment,
          });
        }
      }

      // if no segment
      if (!hasSegment) {
        allSectorData[selectedSector] = {
          ...allSectorData[selectedSector],
          [selectedSegment]: {
            isChecked: true,
            isIntermeideate: false,
            segmentSelected: 0,
            selectedChild: [],
          },
        };
        allSectorData[selectedSector][selectedSegment] = {
          ...allSectorData[selectedSector][selectedSegment],
          ...allSectorData[selectedSector][selectedSegment][
            'selectedChild'
          ].push(selectedItem['id']),
          segmentSelected: 1,
        };

        allSectorData[selectedSector] = {
          ...allSectorData[selectedSector],
          totalSegmentSelected:
            allSectorData[selectedSector]['totalSegmentSelected'] + 1,
        };
      }

      state.sectorData = grandTotal({ allSectorData });

      allSectorData = { ...state.sectorData };
      const isAllChildSelected =
        selectedSectorSegments[selectedSegment].length <=
        allSectorData[selectedSector][selectedSegment]['segmentSelected'];

      const { isGPSelected, isGPIntermidiate } = getGrandParentSelection({
        selectedSectorSegments,
        allSectorData,
        selectedSector,
      });

      // agar false hai
      if (!isAllChildSelected) {
        allSectorData = setIntermideateState({
          allSectorData,
          selectedSector,
          selectedSegment,
        });
      }
      if (isAllChildSelected) {
        if (isGPSelected) {
          allSectorData[selectedSector] = {
            ...allSectorData[selectedSector],
            isChecked: true,
            isIntermeideate: false,
          };
        }
        if (!isGPSelected) {
          allSectorData[selectedSector] = {
            ...allSectorData[selectedSector],
            isChecked: false,
            isIntermeideate: true,
          };
        }

        allSectorData[selectedSector][selectedSegment] = {
          ...allSectorData[selectedSector][selectedSegment],
          isChecked: true,
          isIntermeideate: false,
        };
      }
      state.sectorData = { ...allSectorData };
    },
  },
});

export default leversSclice.reducer;
export const { grandParentUpdate, parentUpdate, childUpdate } =
  leversSclice.actions;
