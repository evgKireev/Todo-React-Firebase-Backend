import { createSlice } from '@reduxjs/toolkit';
export const todoSlise = createSlice({
  name: 'todo',
  initialState: {
    isOpenModal: false,
    isOpenModalShow: false,
    modalCard: undefined,
    editCardTitle: false,
    editCardText: false,
    editCardData: false,
    text: '',
    textArea: '',
    valueData: '',
    valueInputFile: 'Файл не выбран',
  },
  reducers: {
    setIsOpenModal: (state, actions) => {
      state.isOpenModal = actions.payload;
    },
    setIsOpenModalShow: (state, actions) => {
      state.isOpenModalShow = actions.payload;
    },
    setModalCard: (state, actions) => {
      state.modalCard = actions.payload;
    },
    setEditCardTitle: (state, actions) => {
      state.editCardTitle = actions.payload;
    },
    setEditCardText: (state, actions) => {
      state.editCardText = actions.payload;
    },
    setEditCardData: (state, actions) => {
      state.editCardData = actions.payload;
    },
    setText: (state, actions) => {
      state.text = actions.payload;
    },
    setTextArea: (state, actions) => {
      state.textArea = actions.payload;
    },
    setValueData: (state, actions) => {
      state.valueData = actions.payload;
    },
    setValueInputFile: (state, actions) => {
      state.valueInputFile = actions.payload;
    },
  },
});

export const {
  setIsOpenModal,
  setModalCard,
  setEditCardTitle,
  setEditCardText,
  setText,
  setTextArea,
  setValueData,
  setValueInputFile,
  setEditCardData,
  setIsOpenModalShow,
} = todoSlise.actions;

export default todoSlise.reducer;
