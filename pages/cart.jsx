import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import Image from "next/image";
import styles from "../styles/Cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart } from "../redux/cartSlice";

import { BsFillTrashFill, BsFillBasket2Fill } from "react-icons/bs";
import { MdRemoveShoppingCart } from "react-icons/md";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const handleRemoveFromCart = (product) => {
    dispatch(removeItemFromCart(product));
  };
  const quantity = useSelector((state) => state.cart.cartTotalQuantity);
  console.log(quantity);
  const API_URL = "http://localhost:1337";
  return (
    <Layout>
      {quantity === 0 ? (
        <div className={styles.cartEmpty}>
          <div className={styles.emptyWrapper}>
            <MdRemoveShoppingCart size="4rem" color="grey" title="Empty bag" />
            <p className={styles.text}>Your cart is empty.</p>
            <Link href="/" passHref>
              <a className={styles.addProductsBtn}>Add some product</a>
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <h1 className={styles.headerText}>Shopping cart</h1>
          <div className={styles.sideWrapper}>
            <div className={styles.left}>
              <table className={styles.table}>
                <thead className={styles.thead}>
                  <tr className={styles.trHead}>
                    <th className={styles.thHead}>Product</th>
                    <th className={styles.thHead}>Name</th>
                    <th className={styles.thHead}>Price</th>
                    <th className={styles.thHead}>Quantity</th>
                    <th className={styles.thHead}>Total</th>
                    <th className={styles.thHead}>Actions</th>
                  </tr>
                </thead>
                <tbody className={styles.tbody}>
                  {cart.cartItems.map((product) => (
                    <tr className={styles.trBody} key={product.id}>
                      <td className={styles.tdBody}>
                        <div className={styles.imgContainer}>
                          <Image
                            src={`${API_URL}${product.attributes.img.data[0].attributes.url}`}
                            alt=""
                            layout="fill"
                            objectFit="cover"
                          ></Image>
                        </div>
                      </td>
                      <td className={styles.tdBody}>
                        <div className={styles.tdInfo}>
                          <span className={styles.name}>
                            {product.attributes.title}
                          </span>
                          <div className={styles.sizeColorCont}>
                            <div>
                              Size:{" "}
                              <span className={styles.size}>
                                {product.size}
                              </span>
                            </div>
                            <div>
                              Color:{" "}
                              <span className={styles.color}>
                                {product.color}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className={styles.tdBody}>
                        <span className={styles.price}>
                          U${product.attributes.price}
                        </span>
                      </td>
                      <td className={styles.tdBody}>
                        <div>
                        <button className={styles.qtyButton}>-</button>
                        <span className={styles.qty}>{product.quantity}</span>
                        <button className={styles.qtyButton}>+</button>
                        </div>
                      </td>
                      <td className={styles.tdBody}>
                        <span className={styles.total}>
                          U${product.attributes.price * product.quantity}
                        </span>
                      </td>
                      <td className={styles.tdBody}>
                        <div className={styles.deleteIcon}>
                          <button onClick={() => handleRemoveFromCart(product)}>
                            <BsFillTrashFill size=".9rem" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className={styles.tFooter}>
                  <tr className={styles.trFooter}>
                    <td colSpan="4">
                      <Link href="/">
                        <a>Add more products</a>
                      </Link>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className={styles.right}>
              <div className={styles.wrapper}>
                <h2 className={styles.title}>CART TOTAL</h2>
                <div className={styles.totalText}>
                  <b className={styles.totalTextTitle}>Sub-total:</b>$
                  {cart.cartTotalAmount}
                </div>
                <div className={styles.totalText}>
                  <b className={styles.totalTextTitle}>Discount:</b>$0.00
                </div>
                <div className={styles.totalText}>
                  <b className={styles.totalTextTitle}>Total:</b>$
                  {cart.cartTotalAmount}
                </div>
                <button className={styles.button}>CHECKOUT NOW!</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Cart;
