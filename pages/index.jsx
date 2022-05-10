import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

export default function Home({ products }) {
  // console.log(products);
  const API_URL = "http://localhost:1337";
  return (
    <Layout title="Home" description="Tienda Github en línea.">
      <div className={styles.container}>
        {products.data.map((product) => (
          <div className={styles.card} key={product.id}>
            <Link passHref href={`/${product.id}`}>
              <a>
                <Image
                  src={`${API_URL}${product.attributes.img.data[0].attributes.url}`}
                  alt=""
                  height={250}
                  width={250}
                />
              </a>
            </Link>

            <div className={styles.cardTexts}>
              <h3 className={styles.cardTitle}>{product.attributes.title}</h3>
              <h4 className={styles.cardCat}>
                {product.attributes.categories.data.attributes.name}
              </h4>
              <h2 className={styles.cardPrice}>U${product.attributes.price}</h2>
            </div>
            {/*<p className={styles.productDesc}>{product.attributes.desc}</p>*/}
            <button className={styles.cardButton}>
              <span className="material-symbols-outlined">
                add_shopping_cart
              </span>
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}
export async function getStaticProps() {
  const res = await fetch("http://localhost:1337/api/products?populate=*");
  const products = await res.json();
  return { props: { products } };
}
