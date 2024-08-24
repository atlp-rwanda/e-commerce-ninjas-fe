/* eslint-disable */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import productService from "./productService";
import {
  ISingleProductInitialResponse,
  ISingleProductResponse,
} from "../../../utils/types/store";
import { getErrorMessage } from "../../../utils/axios/axiosInstance";

const initialState: ISingleProductInitialResponse = {
  product: null,
  isLoading: false,
  isError: null,
  isSuccess: false,
  message: "",
  isUpdate: false,
  newProduct: null,
  isUpdateSuccess: false,
  isDeletedSuccess: false,
};

interface UpdateProductParams {
  id: string;
  newProductData: FormData;
}

interface UpdateProductStatusParams {
  id: string;
  newStatus: string;
}

export const fetchSingleSellerProduct = createAsyncThunk<
  ISingleProductResponse,
  string
>("products/fetchSingleSellerProducts", async (id, { rejectWithValue }) => {
  try {
    const response = await productService.fetchSellerSingleProduct(id);
    return response;
  } catch (error) {
    return rejectWithValue("Failed to fetch product.");
  }
});

export const updateSellerProduct = createAsyncThunk<
  ISingleProductResponse,
  UpdateProductParams,
  { rejectValue: string }
>(
  "products/updateSellerProduct",
  async ({ id, newProductData }, { rejectWithValue }) => {
    try {
      const response = await productService.updateSellerProduct(
        id,
        newProductData
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateSellerProductStatus = createAsyncThunk<
  ISingleProductResponse,
  UpdateProductStatusParams,
  { rejectValue: string }
>(
  "products/updateSellerProductStatus",
  async ({ id, newStatus }, { rejectWithValue }) => {
    try {
      const response = await productService.updateSellerProductStatus(
        id,
        newStatus
      );
      return response;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const addSellerProduct = createAsyncThunk<
  ISingleProductResponse,
  FormData,
  { rejectValue: string }
>("products/addSellerProduct", async (newProductData, { rejectWithValue }) => {
  try {
    const response = await productService.addSellerProduct(newProductData);
    return response;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const DeleteProduct = createAsyncThunk("products/delete-Seller-Product", async (productId:string, thunkApi) => {
    try {
      const response = await productService.deleteProduct(productId);
      return response
    } catch (error) {
      return thunkApi.rejectWithValue( getErrorMessage(error) )};
    });

const singleSellerProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {
    resetUpdateState: (state) => {
      state.updateError = null;
      state.isUpdate = false;
      state.isUpdateSuccess = false;
      state.isDeletedSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleSellerProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.isSuccess = false;
      })
      .addCase(
        fetchSingleSellerProduct.fulfilled,
        (state, action: PayloadAction<ISingleProductResponse>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.product = action.payload.data?.product[0] || null;
        }
      )
      .addCase(
        fetchSingleSellerProduct.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.payload.message || null;
        }
      )

      .addCase(updateSellerProduct.pending, (state) => {
        state.isUpdate = true;
        state.isUpdateSuccess = false;
        state.isLoading = true;
      })
      .addCase(
        updateSellerProduct.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isUpdate = true;
          state.isUpdateSuccess = true;
          state.isLoading = false;
          state.newProduct = action.payload.data?.product[1][0] || null;
        }
      )
      .addCase(
        updateSellerProduct.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.updateError = action.payload.message || null;
          state.isUpdate = true;
          state.isUpdateSuccess = false;
        }
      )

      .addCase(updateSellerProductStatus.pending, (state) => {
        state.isUpdate = true;
        state.isUpdateSuccess = false;
      })
      .addCase(
        updateSellerProductStatus.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isUpdate = true;
          state.isUpdateSuccess = true;
          state.isLoading = false;
          state.message =
            action.payload.message || "Status Updated successfully";
        }
      )
      .addCase(
        updateSellerProductStatus.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.updateError = action.payload.error || null;
          state.isUpdate = true;
          state.isUpdateSuccess = false;
        }
      )

      .addCase(addSellerProduct.pending, (state) => {
        state.isUpdate = true;
        state.isUpdateSuccess = false;
      })
      .addCase(
        addSellerProduct.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isUpdate = true;
          state.isUpdateSuccess = true;
          state.isLoading = false;
          state.newAddedProduct = action.payload.data?.product || null;
        }
      )
      .addCase(
        addSellerProduct.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.updateError = action.payload.message || null;
          state.isUpdate = true;
          state.isUpdateSuccess = false;
        }
      )
      .addCase(DeleteProduct.pending, (state) => {
        state.isLoading = true;
        state.isUpdateSuccess = false;
      })
      .addCase(
        DeleteProduct.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isDeletedSuccess = true;
          state.isError = false;
          state.message =
            action.payload.message || "Product deleted successfully";
        }
      )
      .addCase(
        DeleteProduct.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.updateError = action.payload.message || null;
          state.isError = true;
          state.isUpdateSuccess = false;
        }
      );
  },
});

export const { resetUpdateState } = singleSellerProductSlice.actions;

export default singleSellerProductSlice.reducer;
