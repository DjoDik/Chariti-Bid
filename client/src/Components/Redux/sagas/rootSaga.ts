import { all } from 'redux-saga/effects';
import friendsSaga from './friendsSagas';

export default function* rootSaga(): Generator {
  yield all([friendsSaga()]);
}
