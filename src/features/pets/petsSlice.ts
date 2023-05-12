// import async thunk and redux toolkit functions
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import the RootState and AppThunk types
import { RootState, AppThunk } from '../../app/store';
// import the fetchAllPets function
import { fetchAllPets } from './petAPI';

// define the Pet interface
export interface Pet {
    id: number;
    name: string;
}

// define the PetsState interface
export interface PetsState {
    pets: Pet[];
    status: 'idle' | 'loading' | 'failed';
}

// define the initial state
const initialState: PetsState = {
    pets: [],
    status: 'idle',
};

// define the fetchAllPetsAsync thunk
export const fetchAllPetsAsync = createAsyncThunk(
    'pets/fetchAllPets',
    async () => {
        const response = await fetchAllPets();
        return response;
    }
);

// define the petsSlice
export const petsSlice = createSlice({
    name: 'pets',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPetsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllPetsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.pets = action.payload;
            })
            .addCase(fetchAllPetsAsync.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

// export the petsReducer as default
export default petsSlice.reducer;
// export selector as selectAllPets
export const selectAllPets = (state: RootState) => state.pets.pets;