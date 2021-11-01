import { PayloadAction } from "@reduxjs/toolkit";

export type ReorderGameListAction = PayloadAction<{ indexFrom: number, indexTo: number }>;