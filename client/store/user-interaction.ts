import { buttonReducer } from 'components/Widgets/Button/button-slice';
import showSearchReducer from 'components/Searchbox/search-slice';
import changeInfoReducer from 'components/Widgets/Modals/Modify/Field/info-slice';
import { loadingReducers } from 'components/Loading/loading-slice';

import { churchInfoApi } from 'lib/church-info-fetcher';

export const userInteractionReducers = {
  buttonReducer,
  showSearchReducer,
  changeInfoReducer,
  loadingReducers,
  churchInfoApi,
};
