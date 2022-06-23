import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";

import { MdShoppingCart } from "react-icons/md";

const Navbar = () => {
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  console.log(cartTotalQuantity);
  return (
    <nav className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <Link href="/" passHref>
            <a>
              <h3 className={styles.logo}>
                <span className={styles.logoText}>Donnuts</span>shop
              </h3>
            </a>
          </Link>
        </div>
        <div className={styles.item}>
          <div className={styles.menuLinks}>
            <Link href="/">
              <a className={styles.menuItemLink}>Home</a>
            </Link>
            <Link href="/contact">
              <a className={styles.menuItemLink}>Contact</a>
            </Link>
            <Link href="/faq">
              <a className={styles.menuItemLink}>FAQ</a>
            </Link>
          </div>
        </div>
        <div className={styles.item}>
          <Link passHref href="/cart">
            <div className={styles.cart}>
              {cartTotalQuantity >= 1 ? (
                <div>
                  <MdShoppingCart color="#b83400" size="1.25rem" />
                  <div className={styles.cartCounter}>{cartTotalQuantity}</div>
                </div>
              ) : (
                <MdShoppingCart color="#b83400" size="1.25rem" />
              )}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
