import baseApiClient from 'api/common/base_api_client';
import { IProduct } from 'api/types/product';
import apiPaths from 'constants/api_paths';

export const getProductsList = async () =>
  baseApiClient.get<IProduct[]>(apiPaths.products);

export const updateProduct = async (product: IProduct) =>
  baseApiClient.put<boolean>(apiPaths.products, product);
