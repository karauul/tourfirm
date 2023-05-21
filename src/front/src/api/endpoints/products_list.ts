import baseApiClient from 'api/common/base_api_client';
import { IProduct } from 'api/types/product';
import apiPaths from 'constants/api_paths';
import QueryString from 'qs';

export const getProductsList = async (filters: any) =>
  baseApiClient.get<IProduct[]>(
    apiPaths.productList + '?' + QueryString.stringify(filters)
  );
