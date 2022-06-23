import Image from "next/image";
import Header from "../components/Header";
import Link from "next/link";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import axios from "axios";
import ProductList from "../components/ProductList";

export default function Home({ productList }) {
  console.log(productList);
  return (
    <Layout title="Home" description="Tienda Github en línea.">
      {/*<Header />*/}
      <div className={styles.container}>
        <ProductList productList={productList} />
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get(`http://localhost:3000/api/products`);
  return { props: { productList: res.data } };
};
