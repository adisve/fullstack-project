import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { AppDispatch, RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAllUsers,
    setEditUser,
    setEditUserId,
    setEditUserRole,
} from '../../../store/features/admin/adminSlice';
import { PageStatus } from '../../../enums/pageStatus';
import LoadingSpinner from '../../general/LoadingSpinner';
import { columns } from './GridColumnStructure';
import { EditModal } from './EditModal';
import { User } from '../../../store/interfaces/user';

export function Users() {
    const dispatch: AppDispatch = useDispatch();
    const { admin } = useSelector((state: RootState) => state);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);

    if (admin.adminPageStatus == PageStatus.loading) {
        return <LoadingSpinner />;
    }

    if (admin.deleteUpdateModal === true) {
        return <EditModal />;
    }

    return (
        <div className="grid-data">
            <h3>User Data</h3>
            {admin.adminPageStatus == PageStatus.error && (
                <p className="warning-text">
                    Unable to load user data, please try again later!
                </p>
            )}
            <DataGrid
                rows={admin.users}
                columns={columns}
                getRowId={(users) => users._id}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[10, 50]}
                onRowClick={(row) => {
                    const id = String(row.id);
                    const editUser: User = {
                        name: row.row.name,
                        email: row.row.email,
                    };
                    dispatch(setEditUser(editUser));
                    dispatch(setEditUserId(id));
                    dispatch(setEditUserRole(String(row.row.role)));
                }}
            />
        </div>
    );
}
