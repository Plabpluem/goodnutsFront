import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { getCookie, setCookie } from "react-use-cookie";

const cartData = getCookie('items')
const cookieData = cartData ? JSON.parse(cartData) : null

const initialState = {
  items: [],
  totalAmount: 0,
  totalItem: 0,
};

const updateInitialState = cookieData ? cookieData : initialState

const initialActive = {
  statusProfile: false,
  statusList: false,
  filterProduct: [
    "Mixednuts",
    "CaramelMixnut",
    "CaramelCoffee", "Pistachio", 'Walnuts', "Macadamia", 'Peacan', 'CaramelMixnut', 'CaramelMacadamia', "CaramelCoffee", "Cookiesingapore", "Cerealcookies", "Apricotdried", "Cranberrydried"
  ],
  filterTitle: 'สินค้าทั้งหมด'
};

const initialHeader = {
  statusCart: null
}

const cartSlice = createSlice({
  name: "cart",
  initialState: updateInitialState,
  reducers: {
    add(state, action) {
      state.totalAmount =
        state.totalAmount + action.payload.amount * action.payload.price;
      state.totalItem += action.payload.amount;
      const select = state.items.find((item) => item.id === action.payload.id);
      if (select) {
        select.amount += action.payload.amount;
      } else {
        state.items = state.items.concat(action.payload);
      }
      setCookie("items", JSON.stringify(state));
    },
    remove(state, action) {
      const select = state.items.find((item) => item.id === action.payload);
      state.totalAmount = state.totalAmount - select.price;
      state.totalItem--;
      if (select.amount === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      } else {
        select.amount--;
      }
      setCookie("items", JSON.stringify(state));
    },
    delete(state, action) {
      const select = state.items.find((item) => item.id === action.payload);
      state.totalAmount -= select.price * select.amount;
      state.totalItem -= select.amount;
      if (select) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
      setCookie("items", JSON.stringify(state));
    },
    change(state, action) {
      const select = state.items.find(item => item.id === action.payload.id)
      const another = state.items.find(item => item.id !== action.payload.id)
      const notSelect = state.items.filter(item => item.id !== action.payload.id)
      const summaryPrice = notSelect.reduce((sum,item)=> sum + +(item.price) * item.amount,0)
      const summaryAmount = notSelect.reduce((sum,item)=> sum + item.amount,0)
      if (!another) {
        state.totalItem = action.payload.amount
        state.totalAmount = action.payload.amount * action.payload.price
      }else if(notSelect.length >= 1 ){
        state.totalAmount = summaryPrice + action.payload.amount * action.payload.price
        state.totalItem = summaryAmount + action.payload.amount
      }

      if (select) {
        select.amount = action.payload.amount
      }
      setCookie("items", JSON.stringify(state));
    },
    reset(state, action) {
      state.totalAmount = 0;
      state.totalItem = 0;
      state.items = [];
      setCookie("items", JSON.stringify(state));
    },
  },
});

const statusSlice = createSlice({
  name: "status",
  initialState: initialActive,
  reducers: {
    updateData(state, action) {
      state.statusProfile = action.payload.profile;
      state.statusList = action.payload.list;
    },
    changeFilter(state, action) {
      state.filterProduct = action.payload.filter
      state.filterTitle = action.payload.title
    }
  },
});

const statusHeader = createSlice({
  name: 'cart',
  initialState: initialHeader,
  reducers: {
    updateCart(state, action) {
      state.statusCart = action.payload
    }
  }
})

const store = configureStore({
  reducer: { cart: cartSlice.reducer, status: statusSlice.reducer, header: statusHeader.reducer },
});

export default store;
export const cartAction = cartSlice.actions; //นำไปใช้ dispatch ใส่ตัวอื่น
export const statusAction = statusSlice.actions;
export const headerAction = statusHeader.actions
