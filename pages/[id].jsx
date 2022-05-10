import React from "react";
import Image from "next/image";
import styles from "../styles/ProductPage.module.css";
import Layout from "../components/Layout";

const API_URL = "http://localhost:1337";

const ProductPage = ({ product }) => {
  // console.log(product);
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.item}>
          <div className={styles.imgContainer}>
            <Image
              src={`${API_URL}${product.attributes.img.data[0].attributes.url}`}
              alt=""
              // height={250}
              // width={250}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.infoProduct}>
            <h1 className={styles.title}>{product.attributes.title}</h1>
            <h3 className={styles.price}>U${product.attributes.price}</h3>
            <p className={styles.desc}>{product.attributes.desc}</p>
            <button className={styles.infoButton}>
              <span className="material-symbols-outlined">
                add_shopping_cart
              </span>
            </button>
            <div className={styles.socialMediaCont}>
              <div className={styles.socialMediaIcon}>
                <Image src="/img/meta.svg" alt="" width={25} height={25} />
              </div>
              <div className={styles.socialMediaIcon}>
                <Image src="/img/twitch.svg" alt="" width={25} height={25} />
              </div>
              <div className={styles.socialMediaIcon}>
                <Image src="/img/twitter.svg" alt="" width={25} height={25} />
              </div>
              <div className={styles.socialMediaIcon}>
                <Image src="/img/instagram.svg" alt="" width={25} height={25} />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
export async function getStaticPaths() {
  const res = await fetch("http://localhost:1337/api/products?populate=*");
  const product = await res.json();
  const paths = product.data.map(({ id }) => ({ params: { id: `${id}` } }));
  // console.log(paths);
  return { paths, fallback: false };
}
export async function getStaticProps({ params }) {
  const { id } = params;
  const res = await fetch(
    `http://localhost:1337/api/products?populate=*/${id}`
  );
  const datos = await res.json();
  const product = datos.data[id - 1];
  return { props: { product } };
}
