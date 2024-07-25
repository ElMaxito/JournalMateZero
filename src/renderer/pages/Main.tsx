import React from 'react';
import RecordButton from '../components/RecordButton';

const RecentInsights: React.FC = () => (
  <div className="recent-insights">
    <h2>Recent Insights</h2>
    <ul>
      <li>Your most productive day last week was Tuesday.</li>
      <li>You've been mentioning "project X" frequently in your recent recordings.</li>
      <li>Your mood seems more positive when you record in the morning.</li>
    </ul>
  </div>
);

const Main: React.FC = () => (
  <div className="main-content">
    <div className="content-layout">
      <RecentInsights />
      <div className="record-section">
        <RecordButton />
      </div>
    </div>
  </div>
);

export default Main;