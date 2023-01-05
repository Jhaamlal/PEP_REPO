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
      const { selectedSectorsData, selectedSector, leversObjectData } = payload;

      const isChecked = state.sectorData[selectedSector]?.['isChecked'];

      let allSectorData = { ...state.sectorData };

      if (isChecked) {
        allSectorData = {
          ...allSectorData,
          [selectedSector]: {
            isChecked: false,
            isIntermeideate: false,
            totalSegmentSelected: 0,
          },
        };
      }

      if (!isChecked) {
        Object.keys(selectedSectorsData).map((item, index) => {
          allSectorData[selectedSector]['totalSegmentSelected'] +=
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
            isIntermeideate: false,
            selectedChild: [],
            segmentSelected:
              selectedSectorsData[Object.keys(selectedSectorsData)[index]]
                .length,
          };
        }

        allSectorData[selectedSector] = {
          ...allSectorData[selectedSector],
          isChecked: true,
          isIntermeideate: false,
          ...obj2,
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
        state.sectorData = { ...allSectorData, grandTotal: total };
      }
      grandTotal();
    },

    parentUpdate: (state, { payload }) => {
      const { selectedSectorSegments, selectedSegment, selectedSector } =
        payload;
      const allSectorData = { ...state.sectorData };

      const isSegmentExist =
        allSectorData[selectedSector].hasOwnProperty(selectedSegment);

      // if existed means you want to remove it ,else you want to add that ,
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
        selectedSectorSegments[selectedSegment].map((item1, index) => {
          allSectorData[selectedSector][selectedSegment]['selectedChild'].push(
            item1.id,
          );
          allSectorData[selectedSector][selectedSegment][
            'segmentSelected'
          ] += 1;
          allSectorData[selectedSector]['totalSegmentSelected'] += 1;
          return '';
        });
      }
      let isChecked = 0;
      let isUncheacked = 0;
      let isGPSelected = false;
      let isGPIntermidiate = false;
      const allSectorKeys = Object.keys(selectedSectorSegments);
      for (const key of allSectorKeys) {
        const isKeyChecked = !!allSectorData[selectedSector]?.[key]?.isChecked;
        if (isKeyChecked) {
          isChecked += 1;
        }
        if (!isKeyChecked) {
          isUncheacked += 1;
        }
      }

      allSectorKeys.length === isChecked
        ? (isGPSelected = true)
        : (isGPIntermidiate = true);

      if (isChecked === 0) {
        isGPSelected = false;
        isGPIntermidiate = false;
      }

      allSectorData[selectedSector] = {
        ...allSectorData[selectedSector],
        isChecked: isGPSelected,
        isIntermeideate: isGPIntermidiate,
      };

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
        state.sectorData = { ...allSectorData, grandTotal: total };
      }
      grandTotal();
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
          allSectorData[selectedSector][selectedSegment] = {
            ...allSectorData[selectedSector][selectedSegment],
            ...allSectorData[selectedSector][selectedSegment][
              'selectedChild'
            ].push(selectedItem['id']),
            segmentSelected:
              allSectorData[selectedSector][selectedSegment][
                'segmentSelected'
              ] + 1,
          };
          allSectorData[selectedSector] = {
            ...allSectorData[selectedSector],
            totalSegmentSelected:
              allSectorData[selectedSector]['totalSegmentSelected'] + 1,
          };
        }
        if (hasChild) {
          allSectorData[selectedSector][selectedSegment] = {
            ...allSectorData[selectedSector][selectedSegment],
            selectedChild: allSectorData[selectedSector][selectedSegment][
              'selectedChild'
            ].filter((item) => item !== selectedItem['id']),
            segmentSelected:
              allSectorData[selectedSector][selectedSegment][
                'segmentSelected'
              ] - 1,
          };
          allSectorData[selectedSector] = {
            ...allSectorData[selectedSector],
            totalSegmentSelected:
              allSectorData[selectedSector]['totalSegmentSelected'] - 1,
          };
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
        state.sectorData = { ...allSectorData, grandTotal: total };
      }
      grandTotal();

      allSectorData = { ...state.sectorData };
      const isAllChildSelected =
        selectedSectorSegments[selectedSegment].length <=
        allSectorData[selectedSector][selectedSegment]['segmentSelected'];

      // agar false hai
      if (!isAllChildSelected) {
        allSectorData[selectedSector] = {
          ...allSectorData[selectedSector],
          isChecked: false,
          isIntermeideate: true,
        };
        allSectorData[selectedSector][selectedSegment] = {
          ...allSectorData[selectedSector][selectedSegment],
          isChecked: false,
          isIntermeideate: true,
        };
        const isAllRemove =
          allSectorData[selectedSector][selectedSegment]['segmentSelected'] ===
          0;

        if (isAllRemove) {
          allSectorData[selectedSector] = {
            ...allSectorData[selectedSector],
            isChecked: false,
            isIntermeideate: false,
          };
          allSectorData[selectedSector][selectedSegment] = {
            ...allSectorData[selectedSector][selectedSegment],
            isChecked: false,
            isIntermeideate: false,
          };
        }
      }
      if (isAllChildSelected) {
        allSectorData[selectedSector] = {
          ...allSectorData[selectedSector],
          isChecked: true,
          isIntermeideate: false,
        };
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
