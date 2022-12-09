import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMedicaions } from "../../api/medication";

const initialState = {
  medications: [],
  status: "idle",
  error: null,
};

export const fetchMedications = createAsyncThunk(
  "medications/fetchMeds",
  async () => {
    const meds = await getMedicaions();
    return meds;
  }
);

const medsSlice = createSlice({
  name: "medications",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMedications.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMedications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.medications = action.payload;
      })
      .addCase(fetchMedications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default medsSlice.reducer;

export const selectAllMeds = (state) => state.medications.medications;
export const selectMedbyId = (state, medId) =>
  state.medications.medications.find((med) => med._id === medId);
