import React, { useState } from "react";
import styles from "../styles/OrderDetail.module.css";

// import { useSelector, useDispatch } from "react-redux";
// import { clearCart } from "../redux/cartSlice";
// import axios from "axios";

const OrderDetail = ({ cartTotalAmount, createOrder }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");

  const handleClick = () => {
    createOrder({
      customer,
      email,
      // status: 0,
      address,
      telephone,
      total: cartTotalAmount,
      method: 0,
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>You will pay ${cartTotalAmount} after delivery.</h1>
        <div className={styles.item}>
          <label htmlFor="name" className={styles.lable}>
            Your name
          </label>
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor="email" className={styles.lable}>
            Your email
          </label>
          <input
            type="text"
            id="email"
            placeholder="myemail@email.com"
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor="telephone" className={styles.lable}>
            Telephone number
          </label>
          <input
            type="text"
            id="telephone"
            placeholder="505 1212 1212"
            className={styles.input}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor="address" className={styles.lable}>
            Address
          </label>
          <textarea
            name="address"
            id="address"
            cols="1"
            rows="3"
            className={styles.textarea}
            placeholder="Main st. 123"
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>
        <button className={styles.orderBtn} onClick={handleClick}>
          Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
