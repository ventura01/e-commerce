import React from "react";
import Layout from "../components/Layout";
import Image from "next/image";
import styles from "../styles/Cart.module.css";
import { useSelector, useDispatch } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const API_URL = "http://localhost:1337";
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.headerText}>Shopping cart</h1>
        <div className={styles.sideWrapper}>
          <div className={styles.left}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr className={styles.trHead}>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.products.map((product) => (
                  <tr className={styles.tr} key={product.id}>
                    <td>
                      <div className={styles.imgContainer}>
                        <Image
                          src={`${API_URL}${product.attributes.img.data[0].attributes.url}`}
                          alt=""
                          layout="fill"
                          objectFit="cover"
                        ></Image>
                      </div>
                    </td>
                    <td>
                      <div className={styles.tdInfo}>
                        <span className={styles.name}>
                          {product.attributes.title}
                        </span>
                        <div className={styles.sizeColorCont}>
                          <div>
                            Size:
                            <span className={styles.size}>{product.size}</span>
                          </div>
                          <div>
                            Color:
                            <span className={styles.color}>{product.color}</span>
                          </div>
                        </div>
                        <div className={styles.deleteIcon}>
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={styles.price}>
                        U${product.attributes.price}
                      </span>
                    </td>
                    <td>
                      <span className={styles.qty}>{product.quantity}</span>
                    </td>
                    <td>
                      <span className={styles.total}>
                        U${product.attributes.price * product.quantity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.right}>
            <div className={styles.wrapper}>
              <h2 className={styles.title}>CART TOTAL</h2>
              <div className={styles.totalText}>
                <b className={styles.totalTextTitle}>Sub-total:</b>${cart.total}
              </div>
              <div className={styles.totalText}>
                <b className={styles.totalTextTitle}>Discount:</b>$0.00
              </div>
              <div className={styles.totalText}>
                <b className={styles.totalTextTitle}>Total:</b>${cart.total}
              </div>
              <button className={styles.button}>CHECKOUT NOW!</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
