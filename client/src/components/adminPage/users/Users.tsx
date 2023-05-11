import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { AppDispatch, RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAllUsers,
    setEditUserId,
    setUserEdit,
    setUserRole,
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

    if (admin.editDeleteModal === true) {
        return <EditModal />;
    }

    return (
        <>
            <h3>User Data</h3>
            <div
                className="grid-data"
                style={{
                    height: 550,
                    width: '100%',
                }}
            >
                {admin.adminPageStatus == PageStatus.error && (
                    <p style={{ color: 'red' }}>
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
                            settings: {
                                interests: row.row.settings?.interests || [],
                                goal: '',
                                dob: new Date(row.row.settings?.dob),
                                gender: row.row.settings?.gender || '',
                                weight: row.row.settings?.weight || 0,
                                height: row.row.settings?.height || 0,
                                fitnessLevel:
                                    row.row.settings?.fitnessLevel || '',
                            },
                        };
                        dispatch(setUserEdit(editUser));
                        dispatch(setEditUserId(id));
                        dispatch(setUserRole(String(row.row.role)));
                    }}
                />
            </div>
        </>
    );
}
