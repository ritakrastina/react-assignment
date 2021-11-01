import { createSlice } from "@reduxjs/toolkit";
import { DashboardState } from "../../types/dashboardState";
import { EditGameStatusAction } from "../../types/editGameStatusAction";
import { ReorderGameListAction } from "../../types/reorderGameListAction";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    loading: false,
    gameList: [],
    error: ""
  },
  reducers: {
    getGameList: (state: DashboardState) => {
      state.loading = true;
      state.error = "";
    },
    reorderGameList: (state: DashboardState, action: ReorderGameListAction) => {
      state.loading = true;
      state.error = "";
    },
    editGameStatus: (state: DashboardState, action: EditGameStatusAction) => {
      state.loading = true;
      state.error = "";
    },
    actionSuccess: (state: DashboardState, action) => {
      state.gameList = action.payload;
      state.loading = false;
      state.error = "";
    },
    actionFail: (state: DashboardState, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  getGameList,
  reorderGameList,
  editGameStatus,
  actionSuccess,
  actionFail
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
