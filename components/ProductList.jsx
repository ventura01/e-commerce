import React from "react";
import styles from "../styles/ProductList.module.css";
import ProductCard from "./ProductCard";

const ProductList = ({ productList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>The best donnuts in the world!</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, vel
        obcaecati? Unde dolorem explicabo excepturi, aliquid tempore rerum,
        odio, sed architecto accusamus illum at esse debitis minima sit nam eius
        porro voluptates vel iste voluptas. Numquam!
      </p>
      <div className={styles.wrapper}>
        {productList.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
