import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { EditDeleteButton } from './EditDeleteButton';

export const columns: GridColDef[] = [
    {
        field: 'Action',
        sortable: false,
        editable: false,
        filterable: false,
        renderCell: (cellValues) => {
            return <EditDeleteButton />;
        },
    },
    {
        field: '_id',
        headerName: 'ID',
        width: 230,
    },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 230 },
    { field: 'role', headerName: 'Role', width: 100 },
    {
        field: 'created_at',
        headerName: 'Joined',
        width: 150,
        valueGetter: (params: GridValueGetterParams) => {
            const signedUp = new Date(params.row.created_at);
            const dateNumber = signedUp.getDate();
            const month = signedUp.toLocaleString('default', {
                month: 'short',
            });
            const year = signedUp.getFullYear();
            return `${dateNumber} ${month} ${year}`;
        },
    },
    {
        field: 'interests',
        headerName: 'Interests',
        width: 260,
        sortable: false,
        valueGetter: (params: GridValueGetterParams) =>
            params.row.settings.interests,
    },
    {
        field: 'goal',
        headerName: 'Goal',
        width: 250,
        sortable: false,
        valueGetter: (params: GridValueGetterParams) =>
            params.row.settings.goal,
    },
    {
        field: 'dob',
        headerName: 'DOB',
        width: 100,
        valueGetter: (params: GridValueGetterParams) => {
            const dob = new Date(params.row.settings.dob);
            const ageDiffMs = Date.now() - dob.getTime();
            const ageDate = new Date(ageDiffMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        },
    },
    {
        field: 'gender',
        headerName: 'Gender',
        width: 130,
        valueGetter: (params: GridValueGetterParams) =>
            params.row.settings.gender,
    },
    {
        field: 'weight',
        headerName: 'Weight',
        type: 'number',
        width: 70,
        valueGetter: (params: GridValueGetterParams) =>
            params.row.settings.weight,
    },
    {
        field: 'height',
        headerName: 'Height',
        type: 'number',
        width: 70,
        valueGetter: (params: GridValueGetterParams) =>
            params.row.settings.height,
    },
    {
        field: 'fitnessLevel',
        headerName: 'Level',
        width: 110,
        sortable: false,
        valueGetter: (params: GridValueGetterParams) =>
            params.row.settings.fitnessLevel,
    },
];
