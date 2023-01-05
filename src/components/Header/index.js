import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logo } from 'utils/constant';

function Header() {
  let headers = ['Home', 'Lever', 'My Project'];
  const [selectedItem, setSelectedItem] = useState('Home');
  const navigation = useNavigate();

  const selectHandler = (selected) => {
    if (selected === 'Lever') {
      navigation('/form');
    }
    if (selected === 'Home') {
      navigation('/');
    }
    setSelectedItem(selected);
  };

  return (
    <div className='tw-bg-white tw-flex tw-text-black tw-p-4 tw-justify-between'>
      <div className='tw-flex  tw-align-middle tw-justify-center'>
        {/* image header and name */}
        <img
          src={logo}
          alt='Logo'
          className='tw-rounded-full tw-w-16 tw-h-16'
        />
        <h1 className='tw-my-auto tw-ml-4 tw-font-extrabold tw-font-serif '>
          DLL
        </h1>
      </div>
      <div className='tw-grid tw-grid-cols-4  tw-align-middle'>
        <div className='tw-flex tw-col-span-3 hover:tw-cursor-pointer'>
          {headers.map((item, index) => {
            return (
              <div
                className={` tw-my-auto tw-mx-2 ${
                  selectedItem === item && 'tw-text-blue-400'
                }`}
                onClick={() => selectHandler(item)}
                key={index}
              >
                {item}
              </div>
            );
          })}
        </div>

        <p className='tw-rounded-full tw-w-8 tw-h-8 tw-my-auto tw-mx-2 tw-col-span-1 tw-bg-red-300 tw-text-center '>
          TN
        </p>
      </div>
    </div>
  );
}

export { Header };
