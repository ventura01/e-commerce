import React from "react";
import Image from "next/image";
import styles from "../styles/Footer.module.css";

import { IconContext } from "react-icons";
import { BsFacebook, BsTwitter, BsTwitch, BsInstagram, BsGithub } from "react-icons/bs";


const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const year = new Date().getFullYear();
const month = new Date().getMonth();
const Footer = () => {
  return (
    <IconContext.Provider value={{color:"gray", size:"1.25rem"}}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <div className={styles.brandCont}>
              <BsGithub color="gray" size="3rem"/>
            </div>
          </div>
          <div className={styles.center}>
            <p>
              All rights reserved &copy; {months[month]}, {year}
            </p>
            {/*<ul className={styles.itemsList}>
              <li className={styles.listItem}>{year}</li>
              <li className={styles.listItem}>Stickers</li>
              <li className={styles.listItem}>Hoodies</li>
              <li className={styles.listItem}>Collectibles</li>
              <li className={styles.listItem}>Housewares</li>
              <li className={styles.listItem}>Headwear</li>
        </ul>*/}
          </div>
          <div className={styles.right}>
          <div className={styles.socialMediaCont}>
          <div className={styles.socialMediaIcon}>
            <BsFacebook />
          </div>
          <div className={styles.socialMediaIcon}>
            <BsTwitter />
          </div>
          <div className={styles.socialMediaIcon}>
            <BsTwitch />
          </div>
          <div className={styles.socialMediaIcon}>
            <BsInstagram />
          </div>
        </div>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default Footer;
