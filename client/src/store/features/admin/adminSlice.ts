import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import instance from '../../../config/axios';
import { PageStatus } from '../../../enums/pageStatus';
import { User } from '../../interfaces/user';
import { AppDispatch } from '../../store';

interface AdminState {
    adminPageStatus: PageStatus;
    users: User[];
    allUsers: User[];
    deleteUpdateModal: boolean;
    editUser?: User;
    editUserId: string;
    userRole: string;
}

const initialState: AdminState = {
    adminPageStatus: PageStatus.initial,
    users: [],
    deleteUpdateModal: false,
    editUser: {
        settings: {},
    },
    editUserId: '',
    userRole: '',
    allUsers: [],
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdminPageStatus(state, action: PayloadAction<PageStatus>) {
            state.adminPageStatus = action.payload;
        },
        getAllUsers(state, action: PayloadAction<[]>) {
            state.users = action.payload;
        },
        showDeleteUpdateModal(state, action: PayloadAction<boolean>) {
            state.deleteUpdateModal = action.payload;
        },
        setEditUser(state, action: PayloadAction<User>) {
            state.editUser = action.payload;
        },
        setEditUserId(state, action: PayloadAction<string>) {
            state.editUserId = action.payload;
        },
        setEditUserRole(state, action: PayloadAction<string>) {
            state.userRole = action.payload;
        },
        updateUserDetails(
            state,
            action: PayloadAction<{ id: string; name: string; role: string }>
        ) {
            const { id, name, role } = action.payload;
            state.users = state.users.map((user: User) =>
                user._id === id ? { ...user, name, role } : user
            );
        },
        removeUser(state, action: PayloadAction<string>) {
            state.users = state.users.filter(
                (user: User) => user._id !== action.payload
            );
        },
    },
});

export const fetchAllUsers =
    () => async (dispatch: AppDispatch, getState: any) => {
        const { auth } = getState();
        const session = auth.sessionId;

        dispatch(setAdminPageStatus(PageStatus.loading));
        try {
            const response = await instance.get('/api/admin/allUsers', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session}`,
                },
            });
            const users = await response.data;
            dispatch(getAllUsers(users));
            dispatch(setAdminPageStatus(PageStatus.success));
        } catch (error) {
            dispatch(setAdminPageStatus(PageStatus.error));
        }
    };

export const updateUser =
    (id: string, name: string, role: string) => async (dispatch: any) => {
        dispatch(setAdminPageStatus(PageStatus.loading));
        try {
            const response = await instance.put(
                `/api/admin/userData/${id}`,
                { name, role },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            await response.data;
            dispatch(updateUserDetails({ id, name, role }));
            dispatch(showDeleteUpdateModal(false));
            dispatch(setAdminPageStatus(PageStatus.success));
        } catch (error) {
            dispatch(setAdminPageStatus(PageStatus.error));
        }
    };

export const deleteUser = (id: string) => async (dispatch: any) => {
    dispatch(setAdminPageStatus(PageStatus.loading));
    try {
        const response = await instance.delete(`/api/admin/deleteUser/${id}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        await response.data;
        dispatch(removeUser(id));
        dispatch(showDeleteUpdateModal(false));
        dispatch(setAdminPageStatus(PageStatus.success));
    } catch (error) {
        dispatch(setAdminPageStatus(PageStatus.error));
    }
};

export const {
    getAllUsers,
    setAdminPageStatus,
    showDeleteUpdateModal,
    setEditUser,
    setEditUserId,
    setEditUserRole,
    updateUserDetails,
    removeUser,
} = adminSlice.actions;
export default adminSlice.reducer;
