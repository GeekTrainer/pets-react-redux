// create pets slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchPets } from './petsAPI';
import { Pet } from '../../types';

export interface PetsState {
    pets: Pet[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: PetsState = {
    pets: [],
    status: 'idle',
};

export const fetchPetsAsync = createAsyncThunk(
    'pets/fetchPets',
    async () => {
        const response = await fetchPets();
        return response;
    }
);

export const petsSlice = createSlice({
    name: 'pets',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPetsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPetsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.pets = action.payload;
            });
    }
});

export const selectPets = (state: RootState) => state.pets;

export default petsSlice.reducer;