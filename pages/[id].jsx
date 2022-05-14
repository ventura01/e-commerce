import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/ProductPage.module.css";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartSlice";

const API_URL = "http://localhost:1337";

const ProductPage = ({ product }) => {
  const [price, setPrice] = useState(product.attributes.price);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("XS");
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(addProduct({ ...product, price, quantity, size }));
    console.log(price, quantity, size);
  };
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
          {/*<div className={styles.imgContainer}>
            <Image
              src={`${API_URL}${product.attributes.img.data[1].attributes.url}`}
              alt=""
              // height={250}
              // width={250}
              layout="fill"
              objectFit="contain"
            />
  </div>*/}
        </div>
        <div className={styles.item}>
          <div className={styles.infoProduct}>
            <h1 className={styles.title}>{product.attributes.title}</h1>
            <h3 className={styles.price}>U${price}</h3>
            <p className={styles.desc}>{product.attributes.desc}</p>
            <span className={styles.infoText}>
              Choose your Size and Quantity
            </span>
            <div className={styles.add}>
              <div className={styles.contSelect}>
                <select
                  onChange={(e) => setSize(e.target.value)}
                  className={styles.select}
                  name="select"
                >
                  <option value="xs">XS</option>
                  <option defaultValue="s" value="s">
                    S
                  </option>
                  <option value="m">M</option>
                  <option value="l">L</option>
                  <option value="xl">XL</option>
                </select>
              </div>
              <div className={styles.contInput}>
                <input
                  type="number"
                  name="qty"
                  id="qty"
                  className={styles.quantity}
                  defaultValue={1}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.contButton}>
              <button onClick={handleClick} className={styles.infoButton}>
                <span className="material-symbols-outlined">
                  add_shopping_cart
                </span>
              </button>
            </div>
            <div className={styles.socialMediaCont}>
              <div className={styles.socialMediaIcon}>
                <Image src="/img/meta.svg" alt="" width={20} height={20} />
              </div>
              <div className={styles.socialMediaIcon}>
                <Image src="/img/twitch.svg" alt="" width={20} height={20} />
              </div>
              <div className={styles.socialMediaIcon}>
                <Image src="/img/twitter.svg" alt="" width={20} height={20} />
              </div>
              <div className={styles.socialMediaIcon}>
                <Image src="/img/instagram.svg" alt="" width={20} height={20} />
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
