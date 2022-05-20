import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <nav className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <Link href="/" passHref>
            <a>
              <h3 className={styles.logo}>
                <span className={styles.logoText}>GitHub</span>shop
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
              <span className="material-symbols-outlined">shopping_bag</span>
              <div className={styles.cartCounter}>{quantity}</div>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
