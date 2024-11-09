import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  is_logged: false,
  user: {
    username: '',
  },
}

const identitySlice = createSlice({
  name: 'identity',
  initialState,
  reducers: {
    setIdentity: (state, action) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { setIdentity } = identitySlice.actions
export default identitySlice.reducer
