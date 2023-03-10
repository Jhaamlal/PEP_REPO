import { useGetLevers } from 'api';
import { Header } from 'components';
import React, { memo } from 'react';

function Home() {
  const { data: leversData } = useGetLevers();
  return (
    <div className=' '>
      <Header />
      <h1 className=' tw-font-serif tw-font-bold'>
        Explore Levers #{leversData?.length}
      </h1>
    </div>
  );
}
Home = memo(Home);
export { Home };
