import React from "react";
import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Header from "./Header";
import styles from "../styles/Layout.module.css"

const Layout = ({ children, title, description }) => {
  return (
    <div>
      <Head>
        <title>E-shop{title ? ` | ${title}` : ""}</title>
        <meta
          name="description"
          content={description ? description : "Descripción del sitio."}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={styles.container}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
