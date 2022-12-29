import { Header } from 'components';
import React, { useEffect, useState } from 'react';
import leversdata from 'services/lever';

function Home() {
  const [totalLevers, setTotalLevers] = useState();
  useEffect(() => {
    leversdata.getAllLever().then((data) => setTotalLevers(data.length));
  }, []);

  return (
    <div className=' '>
      <Header />
      <h1 className=' tw-font-serif tw-font-bold'>
        Explore Levers #{totalLevers}
      </h1>
    </div>
  );
}

export { Home };
