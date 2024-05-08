import React from 'react';
import './Leaderboard.css'; // Import CSS file

const Leaderboard = () => {
  // Example data
  const leaderboardData = [
    { user: 'User 1', course: 'Course A', completion: 'Completed', tokens: 100 },
    { user: 'User 2', course: 'Course B', completion: 'In Progress', tokens: 50 },
    { user: 'User 3', course: 'Course C', completion: 'Not Started', tokens: 0 },
    // Add more data as needed
  ];

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>User</th>
            <th>Course</th>
            <th>Completion</th>
            <th>Tokens</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.user}</td>
              <td>{item.course}</td>
              <td>{item.completion}</td>
              <td>{item.tokens}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
