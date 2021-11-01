import { put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getGameList,
  reorderGameList,
  editGameStatus,
  actionSuccess,
  actionFail
} from "./slices/dashboardSlice";
import { MockDataset } from "./mockDataset";
import { EditGameStatusAction } from "../types/editGameStatusAction";
import { ReorderGameListAction } from "../types/reorderGameListAction";

let savedGameList = MockDataset;

function* getGameListCall() {
  try {
    yield put({ type: actionSuccess.type, payload: savedGameList });
  }
  catch (e: any) {
    yield put({ type: actionFail.type, payload: e.message });
  }
};

function* reorderGameListCall(action: ReorderGameListAction) {
  try {
    // mock backend task
    if (action.payload.indexFrom > -1 && action.payload.indexTo > -1) {
      const items = [...savedGameList].sort((a, b) => { return a.orderIndex - b.orderIndex; });
      items.splice(action.payload.indexTo, 0, items.splice(action.payload.indexFrom, 1)[0]);
      savedGameList = items.map((item, orderIndex) => ({ ...item, orderIndex }));
      yield put({ type: actionSuccess.type, payload: savedGameList });
    }
  }
  catch (e: any) {
    yield put({ type: actionFail.type, payload: e.message });
  }
};

function* editGameStatusCall(action: EditGameStatusAction) {
  try {
    // mock backend task
    const indx = savedGameList.findIndex(g => g.id === action.payload.gameId);
    if (indx > -1) {
      const items = [...savedGameList];
      const item = { ...items[indx] };
      item.enabled = !item.enabled;
      items[indx] = item;
      savedGameList = items;
      yield put({ type: actionSuccess.type, payload: savedGameList });
    }
    else
      yield put({ type: actionFail.type, payload: "Game not found" });
  }
  catch (e: any) {
    yield put({ type: actionFail.type, payload: e.message });
  }
}

function* saga() {
  yield takeLatest(getGameList.type, getGameListCall);
  yield takeEvery(reorderGameList.type, reorderGameListCall);
  yield takeEvery(editGameStatus.type, editGameStatusCall);
}

export default saga;