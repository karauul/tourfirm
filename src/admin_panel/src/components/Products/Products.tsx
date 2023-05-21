import baseApiClient from 'api/common/base_api_client';
import { IProduct } from 'api/types/product';
import { useState } from 'react';
import { useEffect } from 'react';
import LoadingProduct from './components/LoadingProduct';
import Product from './components/Product';
import './Products.scss';
import { Button, Empty } from 'antd';
import locale from 'constants/locale';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { fetchProducts } from 'redux/ducks/products_list';

interface IProps {
  handleOpenCart: () => void;
}

const Products: React.FC<IProps> = (props: IProps) => {
  const productsListState = useSelector(
    (state: RootState) => state.productsList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(false));
  }, []);

  const handleResetButtonClick = () => {
    dispatch(fetchProducts(false));
  };

  const handleLoadMoreButtonClick = () => {
    dispatch(fetchProducts(true));
  };

  if (productsListState.error) {
    return (
      <>
        <div>{productsListState.error}</div>
        <button onClick={handleResetButtonClick}>Повторить запрос</button>
      </>
    );
  }

  if (productsListState.isLoading && !productsListState.isLoadingMore) {
    return (
      <div className="loading-wrapper">
        <LoadingProduct />
        <LoadingProduct />
        <LoadingProduct />
        <LoadingProduct />
      </div>
    );
  }

  if (productsListState.items.length === 0) {
    return (
      <div className="empty-products-wrapper">
        <Empty description={locale.noDataMessage} />
      </div>
    );
  }

  return (
    <>
      <div className="products">
        {productsListState.items.map(item => (
          <Product
            key={item.id}
            item={item}
            handleOpenCart={props.handleOpenCart}
          />
        ))}
      </div>
      {productsListState.isLoadingMore && (
        <div className="loading-wrapper">
          <LoadingProduct />
          <LoadingProduct />
          <LoadingProduct />
          <LoadingProduct />
        </div>
      )}
      {!productsListState.isLoading && (
        <Button onClick={handleLoadMoreButtonClick}>Загрузить ещё</Button>
      )}
    </>
  );
};

export default Products;
