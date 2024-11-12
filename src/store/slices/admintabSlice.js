import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tab: 'dashboard',
}

const admintabSlice = createSlice({
  name: 'admintab',
  initialState,
  reducers: {
    setAdminTab: (state, action) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { setAdminTab } = admintabSlice.actions
export default admintabSlice.reducer
