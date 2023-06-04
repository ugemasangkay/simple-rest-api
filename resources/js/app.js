import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import UserForm from './components/UserForm';

import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleUserSelected = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <div>
      <UserForm />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
