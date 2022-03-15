import { createSlice } from '@reduxjs/toolkit';

import { registerUser, login, loginByToken } from './actions';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        token: localStorage.getItem('token') || null,
        groups: [] as any,
        cards: [] as any,
        loading: false,
        error: null as any,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setGroups: (state, action) => {
            if (typeof action.payload === 'object' && !Array.isArray(action.payload) && action.payload !== null) {
                state.groups.push(action.payload);
            } else {
                state.groups = [...action.payload.reduce((a: any, c: any) => {
                    a.set(c.id, c);
                    return a;
                }, new Map()).values()]; // this shit makes all groups unique
            }
        },
        setCards: (state, action) => {
            state.cards = [...action.payload.reduce((a: any, c: any) => {
                a.set(c.id, c);
                return a;
            }, new Map()).values()]; // this shit makes all cards unique
        },
        removeGroup: (state, action) => {
            state.groups = state.groups.filter((group: any) => group.id !== action.payload);
        },
        removeCard: (state, action) => {
            state.cards = state.cards.filter((card: any) => card.id !== action.payload);
            state.groups.forEach((group: any) => {
                group.linkedCardsIds = group.linkedCardsIds.filter(
                    (id: any) => id !== action.payload
                );
            });
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.groups = [];
            state.cards = [];
            localStorage.clear();
        },
    },
    extraReducers: {
        [registerUser.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [registerUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
        },
        [registerUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [login.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [loginByToken.fulfilled]: (state, action) => {
            state.user = action.payload.user;
        },
    },
});

export default userSlice.reducer;
export const {
    setUser,
    setGroups,
    setCards,
    removeGroup,
    removeCard,
    logout,
} = userSlice.actions;