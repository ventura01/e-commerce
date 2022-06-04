import React from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/Order.module.css";
import axios from "axios";

import { FaHandHolding } from "react-icons/fa";
import {
  BsBoxSeam,
  BsCashCoin,
  BsTruck,
  BsFillCheckCircleFill,
} from "react-icons/bs";

const Order = ({ order }) => {
  console.log(order);
  const status = order.status;
  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.row}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr className={styles.trHead}>
                  <th className={styles.thHead}>Order ID</th>
                  <th className={styles.thHead}>Customer</th>
                  <th className={styles.thHead}>E-mail</th>
                  <th className={styles.thHead}>Telephone</th>
                  <th className={styles.thHead}>Address</th>
                  <th className={styles.thHead}>Total</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                <tr className={styles.trBody}>
                  <td className={styles.tdBody}>
                    <span className={styles.id}></span>
                    {order._id}
                  </td>
                  <td className={styles.tdBody}>
                    <span className={styles.name}></span>
                    {order.customer}
                  </td>
                  <td className={styles.tdBody}>
                    <span className={styles.email}>{order.email}</span>
                  </td>
                  <td className={styles.tdBody}>
                    <span className={styles.telephone}>{order.telephone}</span>
                  </td>
                  <td className={styles.tdBody}>
                    <span className={styles.address}>{order.address}</span>
                  </td>
                  <td className={styles.tdBody}>
                    <span className={styles.total}>U${order.total}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.row}>
            <div className={statusClass(0)}>
              <div className={styles.statusIcon}>
                <BsCashCoin />
              </div>
              <p className={styles.statusText}>Payment</p>
              <div className={styles.checkedIcon}>
                <BsFillCheckCircleFill color="green" />
              </div>
            </div>
            <div className={statusClass(1)}>
              <div className={styles.statusIcon}>
                <BsBoxSeam />
              </div>
              <p className={styles.statusText}>Preparing</p>
              <div className={styles.checkedIcon}>
                <BsFillCheckCircleFill color="green" />
              </div>
            </div>
            <div className={statusClass(2)}>
              <div className={styles.statusIcon}>
                <BsTruck />
              </div>
              <p className={styles.statusText}>On the way</p>
              <div className={styles.checkedIcon}>
                <BsFillCheckCircleFill color="green" />
              </div>
            </div>
            <div className={statusClass(3)}>
              <div className={styles.statusIcon}>
                <FaHandHolding />
              </div>
              <p className={styles.statusText}>Delivered</p>
              <div className={styles.checkedIcon}>
                <BsFillCheckCircleFill color="green" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.wrapper}>
            <h2 className={styles.title}>CART TOTAL</h2>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Sub-total:</b>${order.total}
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Discount:</b>$0.00
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Total:</b>${order.total}
            </div>
            <button disabled className={styles.button}>
              PAID!
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
  return { props: { order: res.data } };
};

export default Order;
