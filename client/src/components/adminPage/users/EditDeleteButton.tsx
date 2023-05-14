import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { showDeleteUpdateModal } from '../../../store/features/admin/adminSlice';

export function EditDeleteButton() {
    const dispatch: AppDispatch = useDispatch();

    return (
        <Button
            onClick={() => {
                dispatch(showDeleteUpdateModal(true));
            }}
        >
            <FontAwesomeIcon icon={faEdit} />
        </Button>
    );
}
