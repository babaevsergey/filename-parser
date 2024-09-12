import { createSlice } from '@reduxjs/toolkit';

const initialMaterialsState = []

const materialsSlice = createSlice({
    name: 'materials',
    initialState: initialMaterialsState,
    reducers: {
        setMaterials: (state, action) => {
            return { ...state, ...action.payload };
        }
    },
});

export const { setMaterials } = materialsSlice.actions;
export default materialsSlice.reducer;