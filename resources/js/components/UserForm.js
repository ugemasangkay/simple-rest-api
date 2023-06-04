import React, { useState, useEffect } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import OrderList from './OrderList';

const UserForm = () => {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderTotal, setOrderTotal] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers([...users, data]);
        setName('');
        setSelectedUser(data);
        setShowModal(false);
        setIsLoading(false);
      });
  };

  const handleUserChange = (e) => {
    const selectedUserId = parseInt(e.target.value);
    if (selectedUserId) {
      const selectedUser = users.find((user) => user.id === selectedUserId);
      setSelectedUser(selectedUser);
      setIsLoading(true);
      fetch(`/api/users/${selectedUserId}`)
        .then((response) => response.json())
        .then((data) => {
          setOrders(data.orders);
          setOrderTotal(data.sum_total_value.toFixed(2));
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setOrders([]);
          setIsLoading(false);
        });
    } else {
      setSelectedUser(null);
      setOrders([]);
    }
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleUpdateName = () => {
    setIsLoading(true);
    const updatedUser = { ...selectedUser, name };

    fetch(`/api/users/${selectedUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedUsers = users.map((user) => {
          if (user.id === selectedUser.id) {
            return data;
          }
          return user;
        });
        setUsers(updatedUsers);
        setName('');
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <div className="container mt-3">
      <button className="btn btn-primary mb-3" onClick={handleShowModal}>
        Create User
      </button>

      <Modal show={showModal} onHide={handleShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShowModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <h2>User List</h2>
      <div className="mb-3">
        <label htmlFor="user-select" className="form-label">
          Select User:
        </label>
        <select
          className="form-select"
          id="user-select"
          onChange={handleUserChange}
          value={selectedUser ? selectedUser.id : ''}
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {selectedUser && (
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Update Name:
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleUpdateName}>
              Update
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : selectedUser ? (
        <OrderList orders={orders} orderTotal={orderTotal} userId={selectedUser?.id} />
      ) : (
        <i>To view order(s), select a user first</i>
      )}
    </div>
  );
};

export default UserForm;
