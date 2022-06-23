import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import Image from "next/image";
import axios from "axios";
import styles from "../styles/Cart.module.css";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItemFromCart,
  decreaseItemFromCart,
  addItemToCart,
  clearCart,
  getTotals,
} from "../redux/cartSlice";

import { BsFillTrashFill, BsArrowLeft } from "react-icons/bs";
import { MdRemoveShoppingCart } from "react-icons/md";
import OrderDetail from "../components/OrderDetail";

const Cart = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  const [cash, setCash] = useState(false);
  const handleRemoveFromCart = (product) => {
    dispatch(removeItemFromCart(product));
  };
  const handleDecreaseItemFromCart = (product) => {
    dispatch(decreaseItemFromCart(product));
  };
  const handleIncreaseItemFromCart = (product) => {
    dispatch(addItemToCart(product));
  };
  const handleClearCartButton = () => {
    dispatch(clearCart());
  };
  const quantity = useSelector((state) => state.cart.cartTotalQuantity);
  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      res.status === 201 && router.push("/orders/" + res.data._id);
      dispatch(clearCart());
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };
  // console.log(quantity);
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
                    <tr className={styles.trBody} key={product._id}>
                      <td className={styles.tdBody}>
                        <div className={styles.imgContainer}>
                          <Image
                            src={product.img}
                            alt=""
                            layout="fill"
                            objectFit="cover"
                          ></Image>
                        </div>
                      </td>
                      <td className={styles.tdBody}>
                        <div className={styles.tdInfo}>
                          <span className={styles.name}>{product.title}</span>
                          {/*<div className={styles.sizeColorCont}>
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
                  </div>*/}
                        </div>
                      </td>
                      <td className={styles.tdBody}>
                        <span className={styles.price}>U${product.price}</span>
                      </td>
                      <td className={styles.tdBody}>
                        <div className={styles.qtyContButton}>
                          <button
                            className={styles.qtyButton}
                            onClick={() => handleDecreaseItemFromCart(product)}
                          >
                            -
                          </button>
                          <span className={styles.qty}>{product.quantity}</span>
                          <button
                            className={styles.qtyButton}
                            onClick={() => handleIncreaseItemFromCart(product)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className={styles.tdBody}>
                        <span className={styles.total}>
                          U${product.price * product.quantity}
                        </span>
                      </td>
                      <td className={styles.tdBody}>
                        <div className={styles.deleteIcon}>
                          <button
                            className={styles.deleteButton}
                            onClick={() => handleRemoveFromCart(product)}
                          >
                            <BsFillTrashFill color="gray" size=".9rem" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={styles.buttonsCont}>
                <Link href="/" passHref>
                  <div className={styles.continueShoppingBtnCont}>
                    <button className={styles.continueShoppingBtn}>
                      <BsArrowLeft /> Continue shopping
                    </button>
                  </div>
                </Link>
                <div className={styles.clearCartButtonCont}>
                  <button
                    className={styles.clearCartButton}
                    onClick={() => handleClearCartButton()}
                  >
                    <BsFillTrashFill size=".8rem" /> Clear cart
                  </button>
                </div>
              </div>
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
                <button className={styles.button} onClick={() => setCash(true)}>
                  CHECKOUT NOW!
                </button>
              </div>
            </div>
            {cash && (
              <OrderDetail
                cartTotalAmount={cart.cartTotalAmount}
                createOrder={createOrder}
              />
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Cart;
