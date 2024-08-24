/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadImage = createAsyncThunk(
  'chat/uploadImage',
  async (file:File, thunkAPI) => {
    const formData = new FormData();
    formData.append("file",file);
    formData.append("upload_preset", "pbyvho95");

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/du0vvcuiz/image/upload",formData)
      return response.data.secure_url;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    images: [],
    loading: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.images.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loading = false;
        state.images.push(action.payload);
        localStorage.setItem("uploadedImages", JSON.stringify(state.images));
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default chatSlice.reducer;
