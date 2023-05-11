import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { showDeleteEditModal } from '../../../store/features/admin/adminSlice';

export function EditDeleteButton() {
    const dispatch: AppDispatch = useDispatch();
    const { admin } = useSelector((state: RootState) => state);

    return (
        <Button
            onClick={() => {
                dispatch(showDeleteEditModal(true));
            }}
        >
            <FontAwesomeIcon icon={faEdit} />
        </Button>
    );
}
