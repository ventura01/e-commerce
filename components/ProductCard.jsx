import React from "react";
import styles from "../styles/ProductCard.module.css";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className={styles.container}>
      <Link passHref href={`/${product._id}`}>
        <a>
          <div className={styles.imgContainer}>
            <Image
              src={product.img}
              alt={product.title}
              //   layout="fill"
              //   objectFit="contain"
              width={180}
              height={180}
            />
          </div>
        </a>
      </Link>
      <div className={styles.cardTexts}>
        <h3 className={styles.cardTitle}>{product.title}</h3>
        <h2 className={styles.cardPrice}>U${product.price}</h2>
      </div>
    </div>
  );
};

export default ProductCard;
