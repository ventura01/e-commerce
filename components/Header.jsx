import React from "react";
import Image from "next/image";
import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.textCont}>
            <h1 className={styles.title}>Lorem, ipsum dolor.</h1>
            <p className={styles.desc}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
              obcaecati porro laborum, doloribus, magni necessitatibus, et
              impedit eius libero maxime alias quos? Sint ullam possimus,
              mollitia delectus cumque numquam harum veniam, dolore adipisci
              autem aspernatur! Et neque, nemo, alias reprehenderit deleniti
              aliquid tempore quae sint debitis tempora eum omnis nisi magnam
              autem nostrum rem!
            </p>
            <button className={styles.button}>More info...</button>
          </div>
        </div>
        <div className={styles.right}>
          <Image
            src="/img/Small_Octocat.webp"
            alt=""
            layout="fill"
            objectFit="cover"
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default Header;
