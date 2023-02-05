import baseApiClient from 'api/baseApi/BaseApiClient';
import { IProduct } from 'api/baseApi/models/product';
import { useState } from 'react';
import { useEffect } from 'react';
import LoadingProduct from './components/LoadingProduct';
import Product from './components/Product';
import './Products.css';

interface IProps {
  handleAddItemToCart: (product: IProduct) => void;
  cartItems: IProduct[];
  handleOpenCart: () => void;
}

const Products: React.FC<IProps> = (props: IProps) => {
  const [products, setProducts] = useState<IProduct[]>();

  useEffect(() => {
    baseApiClient.get('/tours').then(response => {
      if (response.status === 200) {
        setProducts(response.data);
      } else {
        console.log(
          `Request on '${response.config.url}' has failed with status code ${response.status}`
        );
      }
    });
  }, []);

  if (products === undefined) {
    return (
      <div className="loading-wrapper">
        <LoadingProduct />
        <LoadingProduct />
        <LoadingProduct />
        <LoadingProduct />
      </div>
    );
  }

  return (
    <div className="products">
      {products.map(item => (
        <Product
          key={item.id}
          item={item}
          handleAddItemToCart={props.handleAddItemToCart}
          cartItems={props.cartItems}
          handleOpenCart={props.handleOpenCart}
        />
      ))}
    </div>
  );
};

export default Products;
