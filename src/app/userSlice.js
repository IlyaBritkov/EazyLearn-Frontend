import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        groups: JSON.parse(localStorage.getItem('groups')) || [],
        cards: JSON.parse(localStorage.getItem('cards')) || [],
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        addGroup: (state, action) => {
            state.groups.push(action.payload);
            localStorage.setItem('groups', JSON.stringify(state.groups));
        },
        addCard: (state, action) => {
            state.cards.push(action.payload);
            localStorage.setItem('cards', JSON.stringify(state.cards));
        },
        removeGroup: (state, action) => {
            state.groups = state.groups.filter(group => group.id !== action.payload);
            localStorage.setItem('groups', JSON.stringify(state.groups));
        },
        removeCard: (state, action) => {
            state.cards = state.cards.filter(card => card.id !== action.payload);
            state.groups.forEach(group => {
                group.cards = group.cards.filter(card => card.id !== action.payload);
            });
            localStorage.setItem('cards', JSON.stringify(state.cards));
            localStorage.setItem('groups', JSON.stringify(state.groups));
        },
        logout: (state) => {
            state.user = null;
            state.groups = [];
            state.cards = [];
            localStorage.removeItem('user');
            localStorage.removeItem('groups');
            localStorage.removeItem('cards');
        },
    }
});

export default userSlice.reducer;
export const {
    setUser,
    addGroup,
    addCard,
    removeGroup,
    removeCard,
    logout
} = userSlice.actions;