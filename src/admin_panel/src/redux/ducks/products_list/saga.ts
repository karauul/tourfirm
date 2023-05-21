import { AxiosResponse } from 'axios';
import { takeLatest, put, call, all } from 'redux-saga/effects';
import * as actionCreators from './action_creators';
import { FETCH_PRODUCTS } from './action_types';
import { IProduct } from 'api/types/product';
import { getProductsList } from 'api/endpoints/products';
import locale from 'constants/locale';

type IFetchProductsAction = ReturnType<typeof actionCreators.fetchProducts>;

function* fetchProducts({ payload }: IFetchProductsAction) {
  yield put(actionCreators.setProductsFetching(true, payload));
  try {
    const response = (yield call(getProductsList)) as AxiosResponse<IProduct[]>;
    if (payload) {
      yield put(actionCreators.addProducts(response.data));
    } else {
      yield put(actionCreators.setProducts(response.data));
    }
  } catch {
    yield put(actionCreators.setError(locale.responseErrorMessage));
  }
}

export default function* watch() {
  yield all([takeLatest(FETCH_PRODUCTS, fetchProducts)]);
}
