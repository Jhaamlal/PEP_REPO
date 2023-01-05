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
      isIntermeideate: false,
      selectedChild: [],
      segmentSelected:
        selectedSectorsData[Object.keys(selectedSectorsData)[index]].length,
    };
  }

  return obj2;
};

export const getGrandParentSelection = ({
  selectedSectorSegments,
  allSectorData,
  selectedSector,
}) => {
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

  return { isGPSelected, isGPIntermidiate };
};

export const setIntermideateState = ({
  allSectorData,
  selectedSector,
  selectedSegment,
}) => {
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
    allSectorData[selectedSector][selectedSegment]['segmentSelected'] === 0;

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

  return { ...allSectorData };
};

export const hasContainChildElement = ({
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
