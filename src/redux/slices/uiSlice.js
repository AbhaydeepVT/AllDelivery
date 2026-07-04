import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: 'light',
    sideMenuOpen: false,
    modalOpen: false,
    loading: false,
    lastSection: null,          // 'food' | 'grocery' | null
  },
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setSideMenu(state, action) {
      state.sideMenuOpen = action.payload;
    },
    setModal(state, action) {
      state.modalOpen = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setLastSection(state, action) {
      state.lastSection = action.payload;
    },
  },
});

export const {
  toggleTheme,
  setSideMenu,
  setModal,
  setLoading,
  setLastSection,            // exported
} = uiSlice.actions;
export default uiSlice.reducer;