import React from 'react';

let ProjectName = ({ name }) => {
  return <div className='tw-col-span-2 tw-font-bold'>{name}</div>;
};
ProjectName = React.memo(ProjectName);
export { ProjectName };
