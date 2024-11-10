import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2'; 

function ViewAnalysis() {
  const [viewData, setViewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/analytics/views')  
      .then(response => response.json())
      .then(data => {
        setViewData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading view analysis...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

 
  const pageViewsData = {
    labels: viewData.pageViews.map(item => item.page),
    datasets: [
      {
        label: 'Page Views',
        data: viewData.pageViews.map(item => item.views),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  const dailyViewsData = {
    labels: viewData.dailyViews.map(item => item.date),
    datasets: [
      {
        label: 'Daily Views',
        data: viewData.dailyViews.map(item => item.views),
        borderColor: 'rgba(153,102,255,1)',
        fill: false,
      },
    ],
  };
        
  return (
    <div>
      <h2>View Analysis</h2>
      <p>Total Views: {viewData.totalViews}</p>
      <p>Unique Visitors: {viewData.uniqueVisitors}</p>

      <h3>Views by Page</h3>
      <Bar data={pageViewsData} />

      <h3>Daily View Trends</h3>
      <Line data={dailyViewsData} />
    </div>
  );
}

export default ViewAnalysis;
