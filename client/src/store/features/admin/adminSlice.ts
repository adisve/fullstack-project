import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import instance from '../../../config/axios';
import { PageStatus } from '../../../enums/pageStatus';
import { User } from '../../interfaces/user';

interface AdminState {
    adminPageStatus: PageStatus;
    users: any;
    editDeleteModal: boolean;
    editUser?: User;
    editUserId: string;
    userRole: string;
}

const initialState: AdminState = {
    adminPageStatus: PageStatus.initial,
    users: [],
    editDeleteModal: false,
    editUser: {
        settings: {},
    },
    editUserId: '',
    userRole: '',
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
        showDeleteEditModal(state, action: PayloadAction<boolean>) {
            state.editDeleteModal = action.payload;
        },
        setUserEdit(state, action: PayloadAction<User>) {
            state.editUser = action.payload;
        },
        setEditUserId(state, action: PayloadAction<string>) {
            state.editUserId = action.payload;
        },
        setUserRole(state, action: PayloadAction<string>) {
            state.userRole = action.payload;
        },
    },
});

export const fetchAllUsers = () => async (dispatch: any) => {
    dispatch(setAdminPageStatus(PageStatus.loading));

    try {
        const response = await instance.get('/api/admin/allUsers', {
            headers: { 'Content-Type': 'application/json' },
        });
        const users = await response.data;
        dispatch(getAllUsers(users));
        dispatch(setAdminPageStatus(PageStatus.success));
    } catch (error) {
        dispatch(setAdminPageStatus(PageStatus.error));
    }
};

export const updateUser =
    (id: string, name: string, email: string, role: string) =>
    async (dispatch: any) => {
        dispatch(setAdminPageStatus(PageStatus.loading));

        try {
            const response = await instance.put(
                `/api/admin/userData/${id}`,
                { name, email, role },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            const users = await response.data;
            dispatch(fetchAllUsers());

            dispatch(showDeleteEditModal(false));
            dispatch(getAllUsers(users));
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
        const users = await response.data;
        dispatch(fetchAllUsers());

        dispatch(showDeleteEditModal(false));
        dispatch(getAllUsers(users));
        dispatch(setAdminPageStatus(PageStatus.success));
    } catch (error) {
        dispatch(setAdminPageStatus(PageStatus.error));
    }
};

export const {
    getAllUsers,
    setAdminPageStatus,
    showDeleteEditModal,
    setUserEdit,
    setEditUserId,
    setUserRole,
} = adminSlice.actions;
export default adminSlice.reducer;
