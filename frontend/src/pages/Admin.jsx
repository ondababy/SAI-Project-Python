import React, { useEffect, useState } from 'react';
import { fetchTotalNotes, fetchTotalUsers, fetchNotesAllMonths, fetchUsersAllMonths } from '../api';
import { BarChart } from '@mui/x-charts'; // Import the BarChart from Material UI Charts
import '../styles/admin.css';

// Google Docs colors
const googleDocsColors = {
  blue: '#1a73e8',
  green: '#34a853',
  yellow: '#fbbc05',
  red: '#ea4335',
};

function AdminDashboard() {
  const [totalNotes, setTotalNotes] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [notesAllMonths, setNotesAllMonths] = useState([]);
  const [usersAllMonths, setUsersAllMonths] = useState([]);

  // Fetch Total Notes, Total Users, Notes per Month, and Users per Month on component mount
  useEffect(() => {
    fetchTotalNotes()
      .then(response => setTotalNotes(response.total_notes)) 
      .catch(error => console.error('Error fetching total notes:', error));

    fetchTotalUsers()
      .then(response => setTotalUsers(response.total_users)) 
      .catch(error => console.error('Error fetching total users:', error));

    fetchNotesAllMonths()
      .then(response => {
        console.log('Fetched Notes:', response);
        setNotesAllMonths(response || []);  // Default to an empty array if undefined
      })
      .catch(error => console.error('Error fetching notes data for all months:', error));

    fetchUsersAllMonths()
      .then(response => {
        console.log('Fetched Users:', response);
        setUsersAllMonths(response || []);  // Default to an empty array if undefined
      })
      .catch(error => console.error('Error fetching users data for all months:', error));
  }, []);

  // Prepare data for charts
  const notesChartData = notesAllMonths && notesAllMonths.length > 0 ? {
    xAxis: [{ scaleType: 'band', data: notesAllMonths.map(month => `Month ${month.month}`) }],
    series: [{
      data: notesAllMonths.map(month => month.count),
      color: googleDocsColors.blue,  // Use blue color for Total Notes
    }],
  } : { xAxis: [], series: [] };

  const usersChartData = usersAllMonths && usersAllMonths.length > 0 ? {
    xAxis: [{ scaleType: 'band', data: usersAllMonths.map(month => `Month ${month.month}`) }],
    series: [{
      data: usersAllMonths.map(month => month.count),
      color: googleDocsColors.green,  // Use green color for Total Users
    }],
  } : { xAxis: [], series: [] };

  // Stats data with dynamic values from API
  const stats = [
    { title: 'Total Notes', value: totalNotes || 'Loading...' },
    { title: 'Total Users', value: totalUsers || 'Loading...' },
  ];

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <nav>
          <div className="nav-item">Dashboard</div>
          <div className="nav-item">Users Management</div>
          <div className="nav-item">Analytics</div>
          <div className="nav-item">Reports</div>
          <div className="nav-item">Settings</div>
        </nav>
      </aside>
      <main className="main-content">
        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.title} className="stat-card">
              <div className="stat-title">{stat.title}</div>
              <div className="stat-value">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="content-card">
          <div className="card-header">
            <div className="card-title"><center>Charts & Analytics</center></div>
          </div>
          <div className="card-content">
            <div className="chart-container">
              <div className="chart-placeholder">
                <div className="chart">
                  <div className="chart-title">Total Notes Chart</div>
                  <BarChart
                    xAxis={notesChartData.xAxis}
                    series={notesChartData.series}
                    height={290}
                    width={500}
                  />
                </div>
              </div>
              <div className="chart-placeholder">
                <div className="chart">
                  <div className="chart-title">Total Users Chart</div>
                  <BarChart
                    xAxis={usersChartData.xAxis}
                    series={usersChartData.series}
                    height={290}
                    width={500}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
