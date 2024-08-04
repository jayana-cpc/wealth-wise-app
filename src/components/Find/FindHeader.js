import React from 'react';

const FindHeader = ({ activeTab, setActiveTab }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', backgroundColor: '#333', color: '#fff' }}>
      <div 
        style={{ margin: '0 20px', cursor: 'pointer', borderBottom: activeTab === 'priceTracker' ? '2px solid #fff' : 'none' }}
        onClick={() => setActiveTab('priceTracker')}
      >
        Price Tracker
      </div>
      <div 
        style={{ margin: '0 20px', cursor: 'pointer', borderBottom: activeTab === 'portfolioVisualizations' ? '2px solid #fff' : 'none' }}
        onClick={() => setActiveTab('portfolioVisualizations')}
      >
        Portfolio Visualizations
      </div>
      <div 
        style={{ margin: '0 20px', cursor: 'pointer', borderBottom: activeTab === 'portfolioTracker' ? '2px solid #fff' : 'none' }}
        onClick={() => setActiveTab('portfolioTracker')}
      >
        Portfolio Tracker
      </div>
    </div>
  );
};

export default FindHeader;
