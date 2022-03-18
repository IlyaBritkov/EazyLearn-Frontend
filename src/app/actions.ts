import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import qs from 'qs';

import { toast } from 'react-toastify';
import { BASE_URL } from '../config.js';
import checkResponse from '../utils/checkResponse';
import {
    setGroups, setCards, removeCard, removeGroup, setUser
} from './userSlice';

const authHeader = (token: string) => ({ headers: { Authorization: `Bearer ${token}` } });
const urlHeader = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };

export const registerUser: any = createAsyncThunk(
    'user/register',
    async (user: any, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/users`, user);
            if (checkResponse(response.status)) {
                const token = await axios.post(`${BASE_URL}/auth/login`, qs.stringify({
                    email: user.email,
                    password: user.password,
                }), urlHeader);
                toast.success('Успешная регистрация!');
                return {
                    user: response.data,
                    token: token.data.access_token,
                };
            }
            toast.error('Произошла непредвиденная ошибка');
            return rejectWithValue(response.data);
        } catch (error: any) {
            toast.error('Введите корректные данные');
            return rejectWithValue(error.response.data);
        }
    }
);

export const login: any = createAsyncThunk(
    'user/login',
    async (user: any, { rejectWithValue }) => {
        try {
            const tokenData = await axios.post(`${BASE_URL}/auth/login`, qs.stringify({
                email: user.email,
                password: user.password,
            }), urlHeader);
            const { userId }: any = jwt_decode(tokenData.data.access_token);
            const userData = await axios.get(`${BASE_URL}/users/${userId}`, authHeader(tokenData.data.access_token));
            toast.success('Вход выполнен успешно');
            return {
                user: userData.data,
                token: tokenData.data.access_token,
            };
        } catch (error: any) {
            toast.error('Данные введены неверно');
            return rejectWithValue(error.response.data);
        }
    }
);

export const loginByToken: any = createAsyncThunk(
    'user/loginByToken',
    async (token: any, { rejectWithValue }) => {
        try {
            const { userId }: any = jwt_decode(token);
            const userData = await axios.get(`${BASE_URL}/users/${userId}`, authHeader(token));
            return {
                user: userData.data,
            };
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAllUsers: any = createAsyncThunk(
    'user/getAll',
    async (_: any, { rejectWithValue, getState }: any) => {
        try {
            const { user }: any = getState();
            const response = await axios.get(`${BASE_URL}/users`, authHeader(user.token));
            return rejectWithValue(response.data);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const loadCards: any = createAsyncThunk(
    'user/loadCards',
    async (_: any, { rejectWithValue, getState, dispatch }: any) => {
        try {
            const { user }: any = getState();
            const response = await axios.get(`${BASE_URL}/cards`, authHeader(user.token));
            dispatch(setCards(response.data));
            return response.data;
        } catch (error: any) {
            toast.error('Не удалось загрузить карточки');
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAllUniqueCards: any = createAsyncThunk(
    'user/getAllUniqueCards',
    async (_: any, { rejectWithValue, getState }: any) => {
        try {
            const { user }: any = getState();
            const response = await axios.get(`${BASE_URL}/cards`, authHeader(user.token));
            const unique = response.data.filter((card: any) => card.linkedCardSetsIds.length === 0);
            return unique;
        } catch (error: any) {
            toast.error('Не удалось загрузить карточки');
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAllCards: any = createAsyncThunk(
    'user/getAllCards',
    async (_: any, { rejectWithValue, getState }: any) => {
        try {
            const { user }: any = getState();
            const response = await axios.get(`${BASE_URL}/cards`, authHeader(user.token));
            return response.data;
        } catch (error: any) {
            toast.error('Не удалось загрузить карточки');
            return rejectWithValue(error.response.data);
        }
    }
);

export const getCardById: any = createAsyncThunk(
    'user/getCardById',
    async (id: any, { rejectWithValue, getState }: any) => {
        try {
            const { user }: any = getState();
            const response = await axios.get(`${BASE_URL}/cards/${id}`, authHeader(user.token));
            return response.data;
        } catch (error: any) {
            toast.error('Не удалось загрузить карточку');
            return rejectWithValue(error.response.data);
        }
    }
);

export const getCardsByGroupId: any = createAsyncThunk(
    'user/getCardsByGroupId',
    async (groupId: string, { rejectWithValue, getState }: any) => {
        try {
            const { user }: any = getState();
            const response = await axios.get(`${BASE_URL}/cards`, {
                ...authHeader(user.token),
                params: {
                    cardSetId: groupId,
                },
            });
            return response.data;
        } catch (error: any) {
            toast.error('Произошла ошибка');
            return rejectWithValue(error.response.data);
        }
    }
);

export const addNewCard: any = createAsyncThunk(
    'user/addCard',
    async (card: any, { rejectWithValue, getState, dispatch }: any) => {
        try {
            const { user }: any = getState();
            const response = await axios.post(`${BASE_URL}/cards`, [card], authHeader(user.token));
            dispatch(setCards([...user.cards, ...response.data]));
            toast.success('Карточка успешно добавлена');
            return response.data;
        } catch (error: any) {
            toast.error('Произошла ошибка');
            return rejectWithValue(error.response.data);
        }
    }
);

export const addCardToGroups: any = createAsyncThunk(
    'user/addCardToGroups',
    async (data: any, { rejectWithValue, getState, dispatch }: any) => {
        try {
            const { user }: any = getState();
            data.groups.forEach(async (group: any) => {
                const res = await axios.patch(`${BASE_URL}/cardSets/${data.id}`, {
                    linkedCardsIds: [...group.linkedCardsIds, data.id],
                }, authHeader(user.token));
                dispatch(setGroups(
                    user.groups.map((existingGroup: any) => {
                        if (existingGroup.id === res.data.id) {
                            return res.data;
                        }
                        return existingGroup;
                    })
                ));
            });

            return '';
        } catch (error: any) {
            toast.error('Произошла ошибка');
            return rejectWithValue(error.response.data);
        }
    }
);

export const removeCardById: any = createAsyncThunk(
    'user/removeCardById',
    async (cardId: any, { rejectWithValue, getState, dispatch }: any) => {
        try {
            const { user }: any = getState();
            const response = await axios.delete(`${BASE_URL}/cards/${cardId}`, authHeader(user.token));
            dispatch(removeCard(cardId));
            toast.success('Карточка успешно удалена');
            return response.data;
        } catch (error: any) {
            toast.error('Произошла ошибка');
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateCardById: any = createAsyncThunk(
    'user/updateCardById',
    async (card: any, { rejectWithValue, getState, dispatch }: any) => {
        try {
            const { user }: any = getState();
            const newCard = {
                cardId: card.cardId,
                definition: card.definition,
                isFavorite: card.isFavorite,
                linkedCardSetsIds: card.linkedCardSetsIds,
                term: card.term,
            };
            const response = await axios.patch(`${BASE_URL}/cards/${card.cardId}`, newCard, authHeader(user.token));
            dispatch(setCards([...user.cards, response.data]));
            return response.data;
        } catch (error: any) {
            toast.error('Произошла ошибка');
            return rejectWithValue(error.response.data);
        }
    }
);

export const changeCardStatus: any = createAsyncThunk(
    'user/changeCardStatus',
    async (data: any, { rejectWithValue, getState, dispatch }: any) => {
        try {
            const { user }: any = getState();
            const response = await axios.patch(`${BASE_URL}/cards/${data.card.id}`, { isFavourite: data.isFavourite }, authHeader(user.token));
            dispatch(setCards([...user.cards, response.data]));
            return response.data;
        } catch (error: any) {
            toast.error('Произошла ошибка');
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateUserById: any = createAsyncThunk(
    'user/updateUserById',
    async (data: any, { rejectWithValue, getState, dispatch }: any) => {
        try {
            const { user }: any = getState();
            const response = await axios.patch(
                `${BASE_URL}/users/${data.userId}`,
                {
                    username: data.username,
                    email: data.email,
                    password: data.password,
                },
                authHeader(user.token)
            );
            dispatch(setUser([...user.groups, response.data]));
            toast.success('Данные успешно обновлены');
            return response.data;
        } catch (error: any) {
            toast.error('Произошла ошибка');
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateGroupById: any = createAsyncThunk(
    'user/updateGroupById',
    async (data: any, { rejectWithValue, getState, dispatch }: any) => {
        try {
            const { user }: any = getState();
            const response = await axios.patch(`${BASE_URL}/cardSets/${data.group.id}`, { isFavourite: data.isFavourite }, authHeader(user.token));
            dispatch(setGroups([...user.groups, response.data]));
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateFullDataGroupById: any = createAsyncThunk(
    'user/updateFullDataGroupById',
    async (group: any, { rejectWithValue, getState, dispatch }: any) => {
        try {
            const { user }: any = getState();
            const response = await axios.patch(
                `${BASE_URL}/cardSets/${group.groupId}`,
                {
                    isFavourite: group.isFavourite,
                    linkedCardsIds: group.linkedCardsIds,
                    linkedNewCards: [],
                    name: group.name,
                    proficiencyLevel: group.proficiencyLevel,
                },
                authHeader(user.token)
            );
            dispatch(setGroups([...user.groups, response.data]));
            toast.success('Группа успешно обновлена');
            return response.data;
        } catch (error: any) {
            toast.error('Произошла ошибка');
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateCardsByGroupId: any = createAsyncThunk(
    'user/updateCardsByGroupId',
    async (data: any, { rejectWithValue, dispatch }: any) => {
        try {
            data.cards.forEach((card: any) => {
                dispatch(getCardById(card)).then(({ payload }: any) => dispatch(updateCardById({
                    cardId: payload.id,
                    definition: payload.definition,
                    isFavorite: payload.isFavorite,
                    linkedCardSetsIds: [...payload.linkedCardSetsIds, data.id],
                    term: payload.term,
                })));
            });
            return '';
        } catch (error: any) {
            toast.error('Произошла ошибка');
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateCardById: any = createAsyncThunk(
    'user/updateCardById',
    async (card: any, { rejectWithValue, getState, dispatch }: any) => {
        try {
            const { user }: any = getState();
            const newCard = {
                cardId: card.cardId,
                definition: card.definition,
                isFavorite: card.isFavorite,
                linkedCardSetsIds: card.linkedCardSetsIds,
                term: card.term,
                proficiencyLevel: card.proficiencyLevel,
            };
            const response = await axios.patch(`${BASE_URL}/cards/${card.cardId}`, newCard, authHeader(user.token));
            dispatch(setCards([...user.cards, response.data]));
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const updateUserById: any = createAsyncThunk(
    'user/updateUserById',
    async (data: any, { rejectWithValue, getState, dispatch }: any) => {
        try {
            console.log(data);
            const { user }: any = getState();
            const response = await axios.patch(
                `${BASE_URL}/users/${data.userId}`,
                {
                    username: data.username,
                    email: data.email,
                    password: data.password,
                },
                authHeader(user.token)
            );
            console.log('GROUP FAV', response.data);
            dispatch(setUser([...user.groups, response.data]));
            console.log(user.groups);
            return response.data;
        } catch (error: any) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const changeCardStatus: any = createAsyncThunk(
    'user/changeCardStatus',
    async (data: any, { rejectWithValue, getState, dispatch }: any) => {
        try {
            const { user }: any = getState();
            const response = await axios.patch(`${BASE_URL}/cards/${data.card.id}`, { isFavourite: data.isFavourite }, authHeader(user.token));
            console.log(response.data);
            dispatch(setCards([...user.cards, response.data]));
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const updateGroupById: any = createAsyncThunk(
    'user/updateGroupById',
    async (group: any, { rejectWithValue, getState, dispatch }: any) => {
        try {
            console.log(group);
            const { user }: any = getState();
            const response = await axios.patch(`${BASE_URL}/groups/${group.groupId}`, group, authHeader(user.token));
            dispatch(setCards([...user.cards, ...response.data]));
            console.log(response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);
//! GROUPS

export const loadGroups: any = createAsyncThunk(
    'user/loadGroups',
    async (_: any, { rejectWithValue, getState, dispatch }: any) => {
        try {
            const { user }: any = getState();
            const response = await axios.get(`${BASE_URL}/cardSets`, authHeader(user.token));
            dispatch(setGroups(response.data));
            return response.data;
        } catch (error: any) {
            toast.error('Не удалось загрузить группы');
            return rejectWithValue(error.response.data);
        }
    }
);

export const addNewGroup: any = createAsyncThunk(
    'user/addGroup',
    async (group: any, { rejectWithValue, getState, dispatch }: any) => {
        try {
            const { user }: any = getState();
            const response = await axios.post(`${BASE_URL}/cardSets`, group, authHeader(user.token));
            dispatch(setGroups(response.data));
            toast.success('Группа успешно добавлена');
            return response.data;
        } catch (error: any) {
            toast.error('Не удалось добавить группу');
            return rejectWithValue(error.response.data);
        }
    }
);

export const getGroupById: any = createAsyncThunk(
    'user/getGroupById',
    async (groupId: any, { rejectWithValue, getState }: any) => {
        try {
            const { user }: any = getState();
            const response = await axios.get(`${BASE_URL}/cardSets/${groupId}`, authHeader(user.token));
            return response.data;
        } catch (error: any) {
            toast.error('Произошла ошибка');
            return rejectWithValue(error.response.data);
        }
    }
);

export const changeGroupStatus: any = createAsyncThunk(
    'user/changeGroupStatus',
    async (data: any, { rejectWithValue, getState, dispatch }: any) => {
        try {
            const { user }: any = getState();
            const response = await axios.patch(`${BASE_URL}/cardSets/${data.group.id}`, { isFavourite: data.isFavourite }, authHeader(user.token));
            dispatch(setGroups([...user.groups, response.data]));
            return response.data;
        } catch (error: any) {
            toast.error('Произошла ошибка');
            return rejectWithValue(error.response.data);
        }
    }
);

export const changeGroupStatus: any = createAsyncThunk(
    'user/changeGroupStatus',
    async (data: any, { rejectWithValue, getState, dispatch }: any) => {
        try {
            const { user }: any = getState();
            const response = await axios.patch(`${BASE_URL}/cardSets/${data.group.id}`, { isFavourite: data.isFavourite }, authHeader(user.token));
            dispatch(setGroups([...user.groups, response.data]));
            return response.data;
        } catch (error: any) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const removeGroupById: any = createAsyncThunk(
    'user/removeGroupById',
    async (groupInfo: any, { rejectWithValue, getState, dispatch }: any) => {
        try {
            const { user }: any = getState();
            const response = await axios.delete(`${BASE_URL}/cardSets/${groupInfo.id}`, {
                ...authHeader(user.token),
                params: {
                    isDeleteAllCardsInCategory: groupInfo.withCards,
                },
            });
            dispatch(removeGroup(groupInfo.id));
            if (groupInfo.withCards) dispatch(loadCards());
            toast.success('Группа успешно удалена');
            return response.data;
        } catch (error: any) {
            toast.error('Произошла ошибка');
            return rejectWithValue(error.response.data);
        }
    }
);