import React, { useState, useEffect } from 'react';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!token) {
          throw new Error('Auth token is missing. Please log in.');
        }

        const response = await fetch(`${backendURL}/admin/reports`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch reports. Status: ${response.status}`);
        }

        const data = await response.json();
        setReports(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [backendURL, token]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Reports</h1>

      {loading && <p style={styles.message}>Loading reports...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {!loading && !error && reports.length > 0 && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Generated On</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.title}</td>
                <td>{report.description}</td>
                <td>{new Date(report.generatedOn).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && !error && reports.length === 0 && (
        <p style={styles.message}>No reports available.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  message: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#555',
  },
  error: {
    textAlign: 'center',
    fontSize: '16px',
    color: 'red',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  tableRow: {
    textAlign: 'left',
    padding: '8px',
    borderBottom: '1px solid #ddd',
  },
};

export default Reports;
