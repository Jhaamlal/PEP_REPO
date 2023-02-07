import { createSlice } from '@reduxjs/toolkit';
import {
  addSegmentChild,
  createNewSegment,
  getGrandParentSelection,
  grandTotal,
  containChildElement,
  setIntermediate,
  withoutChildElement,
  addAllSegment,
  createParentOfSegment,
  grandParentState,
} from '../Utils';

const initialState = {
  sectorData: {
    Agriculture: {
      isChecked: false,
      intermediate: false,
      totalSegmentSelected: 0,
    },
    Industry: {
      isChecked: false,
      intermediate: false,
      totalSegmentSelected: 0,
    },
    Sector: {
      isChecked: false,
      intermediate: false,
      totalSegmentSelected: 0,
    },
    Transport: {
      isChecked: false,
      intermediate: false,
      totalSegmentSelected: 0,
    },
    Power: {
      isChecked: false,
      intermediate: false,
      totalSegmentSelected: 0,
    },
    grandTotal: 0,
  },
};
const initialParentObj = {
  isChecked: false,
  intermediate: false,
  totalSegmentSelected: 0,
};

const LeversSlice = createSlice({
  name: 'Levers',
  initialState,
  reducers: {
    grandParentUpdate: (state, { payload }) => {
      const { selectedSectorsData, selectedSector, leversObjectData } = payload;

      const isChecked = state.sectorData[selectedSector]?.['isChecked'];

      let allSectorData = { ...state.sectorData };

      //
      if (isChecked) {
        allSectorData = {
          ...allSectorData,
          [selectedSector]: {
            ...initialParentObj,
          },
        };
      }

      // if not checked add item inside sectors
      if (!isChecked) {
        allSectorData = addAllSegment({
          allSectorData,
          selectedSectorsData,
          selectedSector,
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

      // if segment existed ,mean it is checked or Intermediate state, so remove it  from the object
      if (isSegmentExist) {
        const segmentSelected =
          allSectorData[selectedSector]?.[selectedSegment]['segmentSelected'];
        delete allSectorData[selectedSector]?.[selectedSegment];
        allSectorData[selectedSector]['totalSegmentSelected'] -=
          segmentSelected;
      }

      // If segment not existed ,  create a new Object ,and Put the checked the parent  and put child into that
      if (!isSegmentExist) {
        allSectorData[selectedSector] = {
          ...allSectorData[selectedSector],
          [selectedSegment]: {
            isChecked: true,
            intermediate: false,
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

      // it check that if ,parent selected what is state of  selectAll checkbox
      // it isChecked or in intermediate state
      const { isGPSelected, isGPIntermediate } = getGrandParentSelection({
        selectedSectorSegments,
        allSectorData,
        selectedSector,
      });

      allSectorData[selectedSector] = {
        ...allSectorData[selectedSector],
        isChecked: isGPSelected,
        intermediate: isGPIntermediate,
      };

      state.sectorData = grandTotal({ allSectorData });
    },

    childUpdate: (state, { payload }) => {
      const { selectedSectorSegments, selectedItem, selectedSector } = payload;

      const selectedSegment = selectedItem['segment'];

      let allSectorData = { ...state.sectorData };

      const hasSegment =
        allSectorData[selectedSector].hasOwnProperty(selectedSegment);

      // if segment,then check if that particular Item is existed or Not
      if (hasSegment) {
        const hasChild = allSectorData[selectedSector][
          selectedSegment
        ].selectedChild.includes(selectedItem['id']);

        // if childElement is not there then add that particular element
        if (!hasChild) {
          allSectorData = containChildElement({
            allSectorData,
            selectedItem,
            selectedSector,
            selectedSegment,
          });
        }
        // If childElement is There ,remove it as it was again clicked means new ,it is to remove now
        if (hasChild) {
          allSectorData = withoutChildElement({
            allSectorData,
            selectedItem,
            selectedSector,
            selectedSegment,
          });
        }
      }

      // if no segment ,it means child has been selected without parent so, it has to be select it's parent also
      if (!hasSegment) {
        // create parent of selected child
        allSectorData = createParentOfSegment({
          allSectorData,
          selectedSector,
          selectedSegment,
          selectedItem,
        });
      }

      state.sectorData = grandTotal({ allSectorData });

      allSectorData = { ...state.sectorData };

      // Below is to check the item ,if it has to be in checked state  or intermediate state
      const isAllChildSelected =
        selectedSectorSegments[selectedSegment].length <=
        allSectorData[selectedSector][selectedSegment]['segmentSelected'];

      const { isGPSelected, isGPIntermediate } = getGrandParentSelection({
        selectedSectorSegments,
        allSectorData,
        selectedSector,
      });

      // agar false hai,if not all selected  then set it as Intermediate
      if (!isAllChildSelected) {
        allSectorData = setIntermediate({
          allSectorData,
          selectedSector,
          selectedSegment,
        });
      }
      // if parent selected then,see the GrandParent state
      if (isAllChildSelected) {
        if (isGPSelected) {
          allSectorData = grandParentState({
            allSectorData,
            selectedSector,
            isChecked: true,
            intermediate: false,
          });
        }
        if (!isGPSelected) {
          allSectorData = grandParentState({
            allSectorData,
            selectedSector,
            isChecked: false,
            intermediate: true,
          });
        }
        // this is still lower level of abstraction then it can  be take out
        allSectorData[selectedSector][selectedSegment] = {
          ...allSectorData[selectedSector][selectedSegment],
          isChecked: true,
          intermediate: false,
        };
      }
      state.sectorData = { ...allSectorData };
    },
  },
});

export default LeversSlice.reducer;
export const { grandParentUpdate, parentUpdate, childUpdate } =
  LeversSlice.actions;
