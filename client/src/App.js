import React, { useEffect, useState } from 'react';
import LayoutOne from './pages/LayoutOne';
import LayoutTwo from './pages/LayoutTwo';
import LayoutThree from './pages/LayoutThree';

function App() {
  const [page, setPage] = useState(null);

  useEffect(() => {
    const fetchPageLayout = async () => {
      try {
        const response = await fetch('http://localhost:3001/layout', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch layout');
        }

        const { layout } = await response.json();
        setPage(layout);
      } catch (error) {
        console.error('Error fetching layout:', error);
      }
    };

    fetchPageLayout();
  }, []);

  const renderLayout = () => {
    switch (page) {
      case 'layout1':
        return <LayoutOne />;
      case 'layout2':
        return <LayoutTwo />;
      case 'layout3':
        return <LayoutThree />;
      default:
        return null;
    }
  };

  return <div className="App">{renderLayout()}</div>;
}

export default App;