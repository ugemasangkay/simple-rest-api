import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

const OrderList = (props) => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ date: '', total_value: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [props.orders, props.orderTotal, props.userId]);

  const fetchOrders = async () => {
    setIsLoading(true);
    setOrders(props.orders);
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/orders', {
        ...newOrder,
        user_id: props.userId,
      });
      setOrders([...orders, response.data]);
      setNewOrder({ date: '', total_value: '' });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-3">
      <h2>Create Order</h2>
      <form onSubmit={handleCreateOrder}>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={newOrder.date}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="total_value" className="form-label">Total Value:</label>
          <input
            type="number"
            id="total_value"
            name="total_value"
            value={newOrder.total_value}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>

      <h2>Order List</h2>
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : orders && orders.length > 0 ? (
        <div>
          <strong>Total Value: </strong> {props.orderTotal}
          <table className="table mb-3">
            <thead>
              <tr>
                <th>Date</th>
                <th>Total Value</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.date}</td>
                  <td>{order.total_value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderList;
