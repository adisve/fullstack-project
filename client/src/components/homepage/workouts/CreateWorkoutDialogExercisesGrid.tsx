import { DataGrid } from '@mui/x-data-grid';

interface ExercisesGridProps {
    rows: any[];
    selectedRows: any[];
    setSelectedRows(selectedRows: any[]): void;
}

const columns = [
    {
        field: 'name',
        headerName: 'Exercise name',
        width: 130,
    },
    {
        field: 'sets',
        headerName: 'Sets',
        width: 70,
    },
    {
        field: 'reps',
        headerName: 'Reps',
        width: 70,
    },
    {
        field: 'weight',
        headerName: 'Weight (kg)',
        type: 'number',
        default: 0,
        width: 130,
    },
];

export default function CreateWorkoutDialogExercisesGrid({
    rows,
    selectedRows,
    setSelectedRows,
}: ExercisesGridProps) {
    const handleSelectionModelChange = (selectionModel: any) => {
        const selectedObjects = selectionModel.map((id: string) =>
            rows.find((row) => row._id === id)
        );
        setSelectedRows(selectedObjects);
    };

    return (
        <div className="exercises-grid">
            <DataGrid
                sx={{ margin: '1rem' }}
                getRowId={(row) => row._id}
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[3, 8]}
                checkboxSelection
                onRowSelectionModelChange={handleSelectionModelChange}
                rowSelectionModel={selectedRows.map((row) => row._id)}
            />
        </div>
    );
}
