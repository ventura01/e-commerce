import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/ProductPage.module.css";
import Link from "next/link";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cartSlice";

import { IconContext } from "react-icons";
import {
  BsFacebook,
  BsTwitter,
  BsTwitch,
  BsInstagram,
  BsArrowLeft,
} from "react-icons/bs";
import { MdOutlineAddShoppingCart } from "react-icons/md";

const API_URL = "http://localhost:1337";

const ProductPage = ({ product }) => {
  const [price, setPrice] = useState(product.attributes.price);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("XS");
  const [color, setColor] = useState("BLACK");
  const dispatch = useDispatch();
  const handleAddItemToCart = (product) => {
    dispatch(addItemToCart({ ...product, price, quantity, size, color }));
    console.log(price, quantity, size);
  };
  return (
    <IconContext.Provider value={{ color: "gray", size: "1rem" }}>
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
              {/*<span className={styles.infoText}>
                Choose your Size and Quantity
      </span>*/}
              <div className={styles.add}>
                <div className={styles.selectsContainer}>
                  <div className={styles.contSelect}>
                    <label className={styles.selectLabel} htmlFor="select">
                      Size
                    </label>
                    <select
                      onChange={(e) => setSize(e.target.value)}
                      className={styles.sizeSelect}
                      name="select"
                    >
                      <option value="XS">XS</option>
                      <option defaultValue="S" value="S">
                        S
                      </option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>
                  <div className={styles.contSelect}>
                    <label className={styles.colorLabel} htmlFor="colorSelect">
                      Color
                    </label>
                    <select
                      onChange={(e) => setColor(e.target.value)}
                      className={styles.colorSelect}
                      name="colorSelect"
                    >
                      <option value="BLACK">BLACK</option>
                      <option defaultValue="WHITE" value="WHITE">
                        WHITE
                      </option>
                      <option value="BLUE">BLUE</option>
                      <option value="RED">RED</option>
                      <option value="PINK">PINK</option>
                    </select>
                  </div>
                </div>
                <div className={styles.contInput}>
                  <label className={styles.qtyLabel} htmlFor="qty">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="qty"
                    id="qty"
                    className={styles.qtyInput}
                    defaultValue={1}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.contButton}>
                <button
                  onClick={() => handleAddItemToCart(product)}
                  className={styles.addButton}
                >
                  <MdOutlineAddShoppingCart color="white" size="1.5rem" />
                </button>
              </div>
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
              <Link href="/" passHref>
                <div className={styles.backButton}>
                  <a>
                    <BsArrowLeft /> Add more products
                  </a>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </IconContext.Provider>
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
