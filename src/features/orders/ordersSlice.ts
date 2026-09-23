// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// // import { getDb } from '../../lib/firebase'
// import { selectBasketItems, selectBill } from '../basket/selectors'
// import { RootState } from '../../store/store'

// type Status = 'idle' | 'saving' | 'saved' | 'failed'

// interface OrdersState {
//   status: Status
//   lastOrderId: string | null
//   error: string | null
// }

// const initialState: OrdersState = {
//   status: 'idle',
//   lastOrderId: null,
//   error: null,
// }

// export const saveOrder = createAsyncThunk<string, void, { state: RootState }>(
//   'orders/save',
//   async (_, { getState, dispatch }) => {
//     const state = getState()
//     const bill = selectBill(state)

//     const db = await getDb()
//     const { addDoc, collection, serverTimestamp } = await import('firebase/firestore')

//     const ref = await addDoc(collection(db, 'orders'), {
//       items: selectBasketItems(state),
//       subTotal: bill.subTotal,
//       savings: bill.totalSavings,
//       total: bill.total,
//       createdAt: serverTimestamp(),
//     })

//     dispatch(clearBasket())
//     return ref.id
//   },
// )

// const ordersSlice = createSlice({
//   name: 'orders',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(saveOrder.pending, (state) => {
//         state.status = 'saving'
//         state.error = null
//       })
//       .addCase(saveOrder.fulfilled, (state, action) => {
//         state.status = 'saved'
//         state.lastOrderId = action.payload
//       })
//       .addCase(saveOrder.rejected, (state, action) => {
//         state.status = 'failed'
//         state.error = action.error.message ?? 'Could not save the order'
//       })
//       // once they start a new basket the "saved" message is stale
//       .addCase(addItem, (state) => {
//         if (state.status === 'saved') state.status = 'idle'
//       })
//   },
// })

// export default ordersSlice.reducer

import React from 'react'

const ordersSlice = () => {
  }

export default ordersSlice