import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <h3 className={styles.logo}>
            <span className={styles.logoText}>GitHub</span>shop
          </h3>
        </div>
        <div className={styles.item}>
          <div className={styles.menuLinks}>
            <Link href="/">
              <a className={styles.menuItemLink}>Home</a>
            </Link>
            <Link href="/services">
              <a className={styles.menuItemLink}>Services</a>
            </Link>
            <Link href="/faq">
              <a className={styles.menuItemLink}>FAQ</a>
            </Link>
            <Link href="/contact">
              <a className={styles.menuItemLink}>Contact</a>
            </Link>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.cart}>
            <span className="material-symbols-outlined">shopping_bag</span>
            <div className={styles.cartCounter}>4</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
