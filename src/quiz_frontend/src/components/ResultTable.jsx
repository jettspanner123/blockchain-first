import React, { useEffect, useState } from 'react';
import { quiz_backend } from "../../../declarations/quiz_backend";

export default function ResultTable(props) {
  const [userd, setUserd] = useState([]);

  const userData = {
    userId: props.userId || '',
    earnPoints: props.earnPoints || 0,
  };

  const saveUserDataToBackend = async (userData) => {
    try {
      await quiz_backend.saveUser(userData.userId, userData.earnPoints);
      console.log('User data saved successfully to the backend.');
    } catch (error) {
      console.error('Failed to save user data to the backend:', error);
    }
  };

  useEffect(() => {
    // Automatically call saveUserDataToBackend when the component is rendered
    saveUserDataToBackend(userData);
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const userList = await quiz_backend.read();
      console.log('User data fetched successfully from the backend:', userList);
      
      console.log('userd', userd);
      setUserd(userList);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  return (
    <div>
      <table>
        <thead className='table-header'>
          <tr className='table-row'>
            <td>Name</td>   
          </tr>
        </thead>
        <tbody class="table-body">
          {userd.map((user, index) => (
            <tr key={index}>
              <td>{user.userId}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
