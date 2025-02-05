import React, { useState, useEffect } from 'react';
import './Users.css';

const getRandomAvatar = () => {
  return `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`;
};

const coursesList = [
  "Content Writing",
  "UI / UX Design",
  "Coding and Development",
  "Photography",
  "Content Marketing 201",
  "Learn a Language",
  "Financial Planning",
  "Health Wellness"
];

const generateUsers = (role, count) => {
  const cities = ["New York", "London", "Berlin", "Paris", "Tokyo", "Moscow", "Sydney"];
  const names = ["John Doe", "Jane Smith", "Alex Johnson", "Chris Lee", "Morgan Brown", "Taylor White", "Jamie Black"];

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: names[Math.floor(Math.random() * names.length)],
    city: cities[Math.floor(Math.random() * cities.length)],
    avatar: getRandomAvatar(),
    courses: [
      coursesList[Math.floor(Math.random() * coursesList.length)],
      coursesList[Math.floor(Math.random() * coursesList.length)],
    ],
    payments: Math.floor(Math.random() * 5000 + 1000),
    role: role,
  }));
};

const Users = () => {
  const [userType, setUserType] = useState('students');
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', city: '' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const students = generateUsers('student', 20);
    const teachers = generateUsers('teacher', 15);
    setUsers(userType === 'students' ? students : teachers);
  }, [userType]);

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEditUser = (user) => {
    setEditingUser({ ...user });
  };

  const handleSaveChanges = () => {
    setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)));
    setEditingUser(null);
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.city) {
      alert('Please enter a name and city.');
      return;
    }

    const addedUser = {
      id: users.length + 1,
      name: newUser.name,
      city: newUser.city,
      avatar: getRandomAvatar(),
      courses: [coursesList[Math.floor(Math.random() * coursesList.length)]],
      payments: Math.floor(Math.random() * 5000 + 1000),
      role: userType === 'students' ? 'student' : 'teacher',
    };

    setUsers([...users, addedUser]);
    setNewUser({ name: '', city: '' });
  };

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>{userType === 'students' ? 'Students' : 'Teachers'}</h2>
      </div>

      <div className="user-tabs">
        <button className={userType === 'students' ? 'active' : ''} onClick={() => setUserType('students')}>
          Students
        </button>
        <button className={userType === 'teachers' ? 'active' : ''} onClick={() => setUserType('teachers')}>
          Teachers
        </button>
      </div>

      <div className="add-user-form">
        <input
          type="text"
          placeholder="Enter Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Enter City"
          value={newUser.city}
          onChange={(e) => setNewUser({ ...newUser, city: e.target.value })}
        />
        <button className="btn btn-success" onClick={handleAddUser}>
          Save Changes
        </button>
      </div>

      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>✖</button>
            <img src={user.avatar} alt={user.name} />
            {editingUser && editingUser.id === user.id ? (
              <div className="edit-user-form">
                <input
                  type="text"
                  className="input-field"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                />
                <input
                  type="text"
                  className="input-field"
                  value={editingUser.city}
                  onChange={(e) => setEditingUser({ ...editingUser, city: e.target.value })}
                />
                <button className="btn btn-success btn-save" onClick={handleSaveChanges}>
                  Save
                </button>
              </div>
            ) : (
              <>
                <h3>{user.name}</h3>
                <p>📍 {user.city}</p>
                <p><strong>Courses:</strong> {user.courses.join(', ')}</p>
                <button className="btn btn-secondary edit-btn" onClick={() => handleEditUser(user)}>
                  Change
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
