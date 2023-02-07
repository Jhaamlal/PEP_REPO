// all item selected in that all sectors
export function grandTotal({ allSectorData }) {
  let total = 0;
  for (let index = 0; index < Object.keys(allSectorData).length - 1; index++) {
    total +=
      allSectorData[Object.keys(allSectorData)[index]]['totalSegmentSelected'];
  }
  return { ...allSectorData, grandTotal: total };
}

export const createNewSegment = ({ selectedSectorsData }) => {
  let obj2 = {};
  for (
    let index = 0;
    index < Object.keys(selectedSectorsData).length;
    index++
  ) {
    obj2[Object.keys(selectedSectorsData)[index]] = {
      isChecked: true,
      intermediate: false,
      selectedChild: [],
      segmentSelected:
        selectedSectorsData[Object.keys(selectedSectorsData)[index]].length,
    };
  }

  return obj2;
};

// to find get the if the grandParent is selected or Not
export const getGrandParentSelection = ({
  selectedSectorSegments,
  allSectorData,
  selectedSector,
}) => {
  let isChecked = 0;
  let isUnchecked = 0;
  let isGPSelected = false;
  let isGPIntermediate = false;
  const allSectorKeys = Object.keys(selectedSectorSegments);
  for (const key of allSectorKeys) {
    const isKeyChecked = !!allSectorData[selectedSector]?.[key]?.isChecked;
    if (isKeyChecked) {
      isChecked += 1;
    }
    if (!isKeyChecked) {
      isUnchecked += 1;
    }
  }

  allSectorKeys.length === isChecked
    ? (isGPSelected = true)
    : (isGPIntermediate = true);

  if (isChecked === 0) {
    isGPSelected = false;
    isGPIntermediate = false;
  }

  return { isGPSelected, isGPIntermediate };
};

// set Intermediate  state to parent if not all child are selected
export const setIntermediate = ({
  allSectorData,
  selectedSector,
  selectedSegment,
}) => {
  allSectorData[selectedSector] = {
    ...allSectorData[selectedSector],
    isChecked: false,
    intermediate: true,
  };
  allSectorData[selectedSector][selectedSegment] = {
    ...allSectorData[selectedSector][selectedSegment],
    isChecked: false,
    intermediate: true,
  };
  const isAllRemove =
    allSectorData[selectedSector][selectedSegment]['segmentSelected'] === 0;

  if (isAllRemove) {
    allSectorData[selectedSector] = {
      ...allSectorData[selectedSector],
      isChecked: false,
      intermediate: false,
    };
    allSectorData[selectedSector][selectedSegment] = {
      ...allSectorData[selectedSector][selectedSegment],
      isChecked: false,
      intermediate: false,
    };
  }

  return { ...allSectorData };
};

// This function put the,  selected parent children in in the array
export const containChildElement = ({
  allSectorData,
  selectedSector,
  selectedSegment,
  selectedItem,
}) => {
  allSectorData[selectedSector][selectedSegment] = {
    ...allSectorData[selectedSector][selectedSegment],
    ...allSectorData[selectedSector][selectedSegment]['selectedChild'].push(
      selectedItem['id'],
    ),
    segmentSelected:
      allSectorData[selectedSector][selectedSegment]['segmentSelected'] + 1,
  };
  allSectorData[selectedSector] = {
    ...allSectorData[selectedSector],
    totalSegmentSelected:
      allSectorData[selectedSector]['totalSegmentSelected'] + 1,
  };

  return { ...allSectorData };
};

export const withoutChildElement = ({
  allSectorData,
  selectedSector,
  selectedSegment,
  selectedItem,
}) => {
  allSectorData[selectedSector][selectedSegment] = {
    ...allSectorData[selectedSector][selectedSegment],
    selectedChild: allSectorData[selectedSector][selectedSegment][
      'selectedChild'
    ].filter((item) => item !== selectedItem['id']),
    segmentSelected:
      allSectorData[selectedSector][selectedSegment]['segmentSelected'] - 1,
  };
  allSectorData[selectedSector] = {
    ...allSectorData[selectedSector],
    totalSegmentSelected:
      allSectorData[selectedSector]['totalSegmentSelected'] - 1,
  };

  return { ...allSectorData };
};

// Put the child of sector data in array of SelectedChild by iterate over it.
// also Increment in segmentedSelected add +1 and also in TotalSegment add
export const addSegmentChild = ({
  selectedSegment,
  selectedSectorSegments,
  selectedSector,
  allSectorData,
}) => {
  selectedSectorSegments[selectedSegment].map((item1, index) => {
    allSectorData[selectedSector][selectedSegment]['selectedChild'].push(
      item1.id,
    );
    allSectorData[selectedSector][selectedSegment]['segmentSelected'] += 1;
    allSectorData[selectedSector]['totalSegmentSelected'] += 1;
    return '';
  });
  return allSectorData;
};

// When in grandParent item is selected ,this makes item child put in the selected segment array
export const addAllSegment = ({
  allSectorData,
  selectedSectorsData,
  selectedSector,
}) => {
  Object.keys(selectedSectorsData).map((item, index) => {
    allSectorData[selectedSector]['totalSegmentSelected'] +=
      selectedSectorsData[item].length;
  });
  let newSegment = createNewSegment({ selectedSectorsData });
  allSectorData[selectedSector] = {
    ...allSectorData[selectedSector],
    isChecked: true,
    intermediate: false,
    ...newSegment,
  };

  // push each child id  into array of selected child
  Object.keys(selectedSectorsData).map((sectorKey, index) => {
    selectedSectorsData[sectorKey].map((item) => {
      allSectorData[selectedSector][sectorKey]['selectedChild'].push(
        item['id'],
      );
    });
  });

  return allSectorData;
};

function addChildElement({
  allSectorData,
  selectedSector,
  selectedSegment,
  selectedItem,
}) {
  allSectorData[selectedSector][selectedSegment] = {
    ...allSectorData[selectedSector][selectedSegment],
    ...allSectorData[selectedSector][selectedSegment]['selectedChild'].push(
      selectedItem['id'],
    ),
    segmentSelected: 1,
  };

  allSectorData[selectedSector] = {
    ...allSectorData[selectedSector],
    totalSegmentSelected:
      allSectorData[selectedSector]['totalSegmentSelected'] + 1,
  };
  return allSectorData;
}

export const createParentOfSegment = ({
  allSectorData,
  selectedSector,
  selectedSegment,
  selectedItem,
}) => {
  allSectorData[selectedSector] = {
    ...allSectorData[selectedSector],
    [selectedSegment]: {
      isChecked: true,
      intermediate: false,
      segmentSelected: 0,
      selectedChild: [],
    },
  };
  // push child and update the selected item list
  allSectorData = addChildElement({
    allSectorData,
    selectedSector,
    selectedSegment,
    selectedItem,
  });

  return allSectorData;
};

// set the grandParent state
export const grandParentState = ({
  isChecked,
  intermediate,
  allSectorData,
  selectedSector,
}) => {
  allSectorData[selectedSector] = {
    ...allSectorData[selectedSector],
    isChecked: isChecked,
    intermediate: intermediate,
  };
  return { ...allSectorData };
};
