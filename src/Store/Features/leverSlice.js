import { createSlice, current } from '@reduxjs/toolkit';

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

const leversSclice = createSlice({
  name: 'assumptions',
  initialState,
  reducers: {
    grandParentUpdate: (state, { payload }) => {
      const { selectedSectorsData, selectedSector } = payload;

      Object.keys(selectedSectorsData).map((item, index) => {
        state.sectorData[selectedSector]['totalSegmentSelected'] +=
          selectedSectorsData[item].length;
      });

      let obj2 = {};
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

      state.sectorData[selectedSector] = {
        ...state.sectorData[selectedSector],
        ...obj2,
      };

      Object.keys(selectedSectorsData).map((sectorKey, index) => {
        selectedSectorsData[sectorKey].map((item) => {
          state.sectorData[selectedSector][sectorKey]['selectedChild'].push(
            item['id'],
          );
          return;
        });
        return '';
      });

      const allSectorData = { ...state.sectorData };
      // let total = allSectorData.grandTotal;
      let total = 0;
      function grandTotal() {
        for (
          let index = 0;
          index < Object.keys(allSectorData).length - 1;
          index++
        ) {
          total +=
            allSectorData[Object.keys(allSectorData)[index]][
              'totalSegmentSelected'
            ];
        }
        console.log('total', total);
        state.sectorData = { ...allSectorData, grandTotal: total };
      }
      grandTotal();
    },

    parentUpdate: (state, { payload }) => {
      const { selectedSectorSegments, selectedSegment, selectedSector } =
        payload;
      const allSectorData = { ...state.sectorData };

      allSectorData[selectedSector] = {
        ...allSectorData[selectedSector],
        [selectedSegment]: {
          isChecked: true,
          isIntermeideate: false,
          segmentSelected: 0,
          selectedChild: [],
        },
      };
      selectedSectorSegments[selectedSegment].map((item1, index) => {
        allSectorData[selectedSector][selectedSegment]['selectedChild'].push(
          item1.id,
        );
        allSectorData[selectedSector][selectedSegment]['segmentSelected'] += 1;
        allSectorData[selectedSector]['totalSegmentSelected'] += 1;
        return '';
      });

      let total = 0;
      function grandTotal() {
        for (
          let index = 0;
          index < Object.keys(allSectorData).length - 1;
          index++
        ) {
          total +=
            allSectorData[Object.keys(allSectorData)[index]][
              'totalSegmentSelected'
            ];
        }
        console.log('total', total);
        state.sectorData = { ...allSectorData, grandTotal: total };
      }
      grandTotal();
    },

    childrenUpdate: (state, { payload }) => {},
  },
});

export default leversSclice.reducer;
export const { grandParentUpdate, parentUpdate, childrenUpdate } =
  leversSclice.actions;
