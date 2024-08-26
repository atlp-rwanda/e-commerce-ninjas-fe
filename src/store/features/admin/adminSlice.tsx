/* eslint-disable */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import adminService from "./adminService";
import { getErrorMessage } from "../../../utils/axios/axiosInstance";
import {
  AdminReponse,
  IAdminInitialResponse,
} from "../../../utils/types/store";
import { toast } from "react-toastify";

const initialState: IAdminInitialResponse = {
  message: "",
  users: null,
  requests: null,
  request: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  passwordExpiration: null,
  terms: null,
  term: null,
};

export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (_, thunkApi) => {
    try {
      const response = await adminService.getAllUsers();
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const getUserById = createAsyncThunk(
  "admin/getUserById",
  async (userId: string, thunkApi) => {
    try {
      const response = await adminService.getUserById(userId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateUserRole = createAsyncThunk(
  "admin/updateUser",
  async ({ userId, role }: { userId: string; role: string }, thunkApi) => {
    try {
      const response = await adminService.updateUserRole(userId, role);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  "admin/updateUserStatus",
  async ({ userId, status }: { userId: string; status: string }, thunkApi) => {
    try {
      const response = await adminService.updateUserStatus(userId, status);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);
export const getOrderHistory = createAsyncThunk(
  "admin/getOrderHistory",
  async (_, thunkApi) => {
    try {
      const response = await adminService.getOrderHistory();
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);
export const getAllShops = createAsyncThunk(
  "admin/admin-get-shops",
  async (_, thunkApi) => {
    try {
      const response = await adminService.getAllShops();
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const getAllRequests = createAsyncThunk(
  "admin/admin-get-requests",
  async (_, thunkApi) => {
    try {
      const response = await adminService.getAllRequests();
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const deleteUserRequest = createAsyncThunk(
  "admin/admin-delete-request",
  async (
    { userRequestId, requestId }: { userRequestId: string; requestId: string },
    thunkApi
  ) => {
    try {
      const response = await adminService.deleteUserRequest(
        userRequestId,
        requestId
      );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const getRequest = createAsyncThunk(
  "admin/admin-get-request",
  async (userRequestId: string, thunkApi) => {
    try {
      const response = await adminService.getRequest(userRequestId);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const acceptOrRejectRequest = createAsyncThunk(
  "admin/admin-accept-or-reject-request",
  async (
    {
      userRequestId,
      requestStatus,
    }: { userRequestId: string; requestStatus: string },
    thunkApi
  ) => {
    try {
      const response = await adminService.acceptOrRejectRequest(
        userRequestId,
        requestStatus
      );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateUserPasswordExpiration = createAsyncThunk(
  "admin/updateUserPasswordExpiration",
  async ({ minutes }: { minutes: number }, thunkApi) => {
    try {
      const response = await adminService.updatePasswordExpiration(minutes);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchPasswordExpiration = createAsyncThunk(
  "admin/fetchPasswordExpiration",
  async (_, thunkApi) => {
    try {
      const response = await adminService.getPasswordExpiration();
      return response.minutes;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);
export const getAllTerms = createAsyncThunk(
  "admin/getAllTerms",
  async (_, thunkApi) => {
    try {
      const response = await adminService.getTerms();
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const setTerms = createAsyncThunk(
  "admin/setTerms",
  async (
    { termType, termContent }: { termType: string; termContent: string },
    thunkApi
  ) => {
    try {
      const response = await adminService.setTerms(termType, termContent);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const setTermsWithPdf = createAsyncThunk("admin/setTermsWithPdf", async(formData:any,thunkApi) => {
  try {
    const response = await adminService.setTermsWithPdf(formData);
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
})

export const getTerm = createAsyncThunk(
  "admin/get-single-term",
  async (id: string, thunkApi) => {
    try {
      const response = await adminService.getTerm(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);
export const updateTerm = createAsyncThunk(
  "admin/update-term",
  async (
    payload:
    | { formData: any; id: string }
    | { id: string; content: string; },
    thunkApi
  ) => {
    try {
     let response;
     if("formData" in payload) {
       response = await adminService.updateTerm(payload.id,payload.formData);
     }
    else{
      const { id, content} = payload;
       response = await adminService.updateTerm(id, {content});
    }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);



export const deleteTerm = createAsyncThunk(
  "admin/delete-term",
  async (id: string, thunkApi) => {
    try {
      const response = await adminService.deleteTerm(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/delete-user",
  async (id: string, thunkApi) => {
    try {
      const response = await adminService.deleteUser(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(
        getAllUsers.fulfilled,
        (state, action: PayloadAction<AdminReponse>) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.users = action.payload.data.user;
          state.message = action.payload.message;
        }
      )
      .addCase(getAllUsers.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || action.payload.message;
      })
      .addCase(updateUserRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateUserRole.fulfilled,
        (state, action: PayloadAction<AdminReponse>) => {
          const { id, role } = action.payload.data.user;
          const user = state.users.find((user) => user.id === id);
          if (user) {
            user.role = role;
          }
          state.isSuccess = true;
          state.isLoading = false;
          state.message = action.payload.message;
          toast.success(state.message);
        }
      )
      .addCase(
        updateUserRole.rejected,
        (state, action: PayloadAction<AdminReponse>) => {
          state.isLoading = false;
          state.message = action.payload.message;
          toast.error(state.message);
        }
      )
      .addCase(updateUserStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateUserStatus.fulfilled,
        (state, action: PayloadAction<AdminReponse>) => {
          const { id, status } = action.payload.data.user;
          const user = state.users.find((user) => user.id === id);
          if (user) {
            user.status = status;
          }
          state.isSuccess = true;
          state.isLoading = false;
          state.message = action.payload.message;
          toast.success(state.message);
        }
      )
      .addCase(
        updateUserStatus.rejected,
        (state, action: PayloadAction<AdminReponse>) => {
          state.isLoading = false;
          state.message = action.payload.message;
          toast.error(state.message);
        }
      )
      .addCase(getOrderHistory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(
        getOrderHistory.fulfilled,
        (state, action: PayloadAction<AdminReponse>) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.users = action.payload.data.user;
          state.message = action.payload.message;
        }
      )
      .addCase(
        getOrderHistory.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload || action.payload.message;
        }
      )
      .addCase(getAllShops.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(
        getAllShops.fulfilled,
        (state, action: PayloadAction<AdminReponse>) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.users = action.payload.data.user;
          state.message = action.payload.message;
        }
      )
      .addCase(getAllShops.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || action.payload.message;
      })
      .addCase(getAllRequests.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(
        getAllRequests.fulfilled,
        (state, action: PayloadAction<AdminReponse>) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.requests = action.payload.data.sellerProfiles;
          state.message = action.payload.message;
          toast.success(state.message);
        }
      )
      .addCase(getAllRequests.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(deleteUserRequest.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(
        deleteUserRequest.fulfilled,
        (state, action: PayloadAction<AdminReponse>) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.message = action.payload.message;
          toast.success(state.message);
        }
      )
      .addCase(
        deleteUserRequest.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      )
      .addCase(getRequest.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(
        getRequest.fulfilled,
        (state, action: PayloadAction<AdminReponse>) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.request = action.payload.data.sellerRequest;
          state.message = action.payload.message;
          toast.success(state.message);
        }
      )
      .addCase(getRequest.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(acceptOrRejectRequest.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(
        acceptOrRejectRequest.fulfilled,
        (state, action: PayloadAction<AdminReponse>) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.request = action.payload.data.sellerRequest;
          state.message = action.payload.message;
          toast.success(state.message);
        }
      )
      .addCase(
        acceptOrRejectRequest.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(state.message);
        }
      )
      .addCase(updateUserPasswordExpiration.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateUserPasswordExpiration.fulfilled,
        (state, action: PayloadAction<AdminReponse>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.message = action.payload.message;
          toast.success(state.message);
        }
      )
      .addCase(
        updateUserPasswordExpiration.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload || action.payload.message;
          toast.error(state.message);
        }
      )
      .addCase(fetchPasswordExpiration.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchPasswordExpiration.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.passwordExpiration = action.payload;
        }
      )

      .addCase(
        fetchPasswordExpiration.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(state.message);
        }
      )
      .addCase(getAllTerms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTerms.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.terms = action.payload.data.termsAndCondition;
        state.isError = false;
        toast(state.message);
      })

      .addCase(getAllTerms.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(setTerms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setTerms.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.terms = action.payload.data.termsAndCondition;
        state.isError = false;
        toast.success(state.message);
      })

      .addCase(setTerms.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })

      .addCase(setTermsWithPdf.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setTermsWithPdf.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.terms = action.payload.data.termsAndCondition;
        state.isError = false;
        toast.success(state.message);
      })

      .addCase(setTermsWithPdf.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(getTerm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTerm.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.term = action.payload.data.termsAndCondition;
        state.isError = false;
        toast(state.message);
      })

      .addCase(getTerm.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(updateTerm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTerm.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.term = action.payload.data.termsAndCondition;
        state.isError = false;
        toast.success(state.message);
      })

      .addCase(updateTerm.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(deleteTerm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTerm.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.isError = false;
        toast.success(state.message);
      })

      .addCase(deleteTerm.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.isError = false;
        toast.success(state.message);
      })

      .addCase(deleteUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      });
  },
});

export default adminSlice.reducer;
