import type {GetServerSideProps, NextPage} from 'next';
import Head from 'next/head';
import Link from 'next/link';

interface ProductProps {
  product: {
    entityId: number;
    name: string;
    plainTextDescription: string;
  };
}

const Home: NextPage<ProductProps> = props => {
  return (
    <div className="container py-4">
      <Head>
        <title>BigCommerce + Next.js</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="pb-3 mb-4 border-bottom">
        <Link href="/" passHref>
          <a className="d-flex align-items-center text-dark">
            <span className="fs-5 fw-bolder">Home</span>
          </a>
        </Link>
      </header>

      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">BigCommerce + Next.js</h1>
          <p className="col-md-8 fs-4">
            This is a server-side rendered example of Next.js using BigCommerce to provide
            e-commerce functionality.
          </p>
          <Link href="/" passHref>
            <a className="btn btn-dark btn-lg" type="button">
              View Products
            </a>
          </Link>
        </div>
      </div>

      <div className="row align-items-md-stretch">
        <div className="col-md-6">
          <div className="h-100 p-5 text-white bg-dark rounded-3">
            <h2>Don&apos;t Buy Things!</h2>
            <p>
              This is just an example website for testing. Do not buy anything you see on this
              website.
            </p>
            <Link href="/" passHref>
              <a className="btn btn-light" type="button">
                View Products
              </a>
            </Link>
          </div>
        </div>
        <div className="col-md-6">
          <div className="h-100 p-5 bg-light rounded-3">
            <h2>Don&apos;t Buy Things!</h2>
            <p>
              AGAIN, this is just an example website for testing. Do not buy anything you see on
              this website.
            </p>
            <Link href="/" passHref>
              <a className="btn btn-dark" type="button">
                View Products
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div>
          <p>
            <strong>Product Name: </strong>
            {props.product.name}
          </p>
          <p>
            <strong>Product ID: </strong>
            {props.product.entityId}
          </p>
          <p>
            <strong>Product Description: </strong>
            {props.product.plainTextDescription}
          </p>
        </div>
      </div>

      <footer className="pt-3 mt-4 text-muted d-flex justify-content-between border-top">
        <div>
          Created by{' '}
          <a
            className="text-muted"
            href="https://github.com/matthewvolk"
            rel="noreferrer"
            target="_blank"
          >
            Matthew Volk
          </a>
        </div>
        <div>&copy; 2021</div>
      </footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const res = await fetch('https://store-unzvctoo8r-776474.mybigcommerce.com/graphql', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BIGCOMMERCE_STOREFRONT_API_TOKEN}`,
    },
    body: JSON.stringify({
      query: `{
      site {
        product(entityId: 111) {
          id
          entityId
          name
          plainTextDescription
        }
      }
    }
    `,
    }),
  });
  const data = await res.json();
  const product = data.data.site.product;
  console.log(product);
  return {
    props: {
      product,
    },
  };
};

export default Home;
