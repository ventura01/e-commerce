import React, { useState } from "react";
import Layout from "../../components/Layout";
import Image from "next/image";
import styles from "../../styles/Admin.module.css";
import axios from "axios";

const Index = ({ orders }) => {
  const [orderList, setOrderList] = useState(orders);

  const status = ["Preparing", "On the way", "Delivered"];
  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;
    try {
      const res = await axios.put("http://localhost:3000/api/orders/" + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1 className={styles.title}>Products</h1>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr className={styles.trHead}>
                <th className={styles.thHead}>Image</th>
                <th className={styles.thHead}>ID</th>
                <th className={styles.thHead}>Title</th>
                <th className={styles.thHead}>Price</th>
                <th className={styles.thHead}>Action</th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              <tr className={styles.trBody}>
                <td className={styles.tdBody}>
                  <Image
                    src={"/img/meta.svg"}
                    alt=""
                    width={50}
                    height={50}
                  ></Image>
                </td>
                <td className={styles.tdBody}>Pizza ID</td>
                <td className={styles.tdBody}>Pizza Title</td>
                <td className={styles.tdBody}>U$19</td>
                <td className={styles.tdBody}>
                  <button className={styles.button}>Edit</button>
                  <button className={styles.button}>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.right}>
          <h1 className={styles.title}>Orders</h1>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr className={styles.trHead}>
                <th className={styles.thHead}>Order ID</th>
                <th className={styles.thHead}>Customer</th>
                <th className={styles.thHead}>Total</th>
                <th className={styles.thHead}>Payment</th>
                <th className={styles.thHead}>Status</th>
                <th className={styles.thHead}>Action</th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {orderList.map((order) => (
                <tr className={styles.trBody} key={order._id}>
                  <td className={styles.tdBody}>{order._id.slice(0, 5)}...</td>
                  <td className={styles.tdBody}>{order.customer}</td>
                  <td className={styles.tdBody}>U${order.total}</td>
                  <td className={styles.tdBody}>
                    {order.method === 0 ? (
                      <span>CASH</span>
                    ) : (
                      <span>Paypal</span>
                    )}
                  </td>
                  <td className={styles.tdBody}>{status[order.status]}</td>
                  <td className={styles.tdBody}>
                    <button
                      className={styles.buttonNext}
                      onClick={() => handleStatus(order._id)}
                    >
                      Next stage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const orderRes = await axios.get("http://localhost:3000/api/orders");
  return { props: { orders: orderRes.data } };
};

export default Index;
