import {
    Modal,
    Typography,
    Button,
    Box,
    CardActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import {
    deleteUser,
    updateUser,
    showDeleteUpdateModal,
} from '../../../store/features/admin/adminSlice';
import '../../login-register/AuthenticationModal.css';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { PageStatus } from '../../../enums/pageStatus';
import LoadingSpinner from '../../general/LoadingSpinner';

export function EditModal() {
    const dispatch: AppDispatch = useDispatch();
    const { admin } = useSelector((state: RootState) => state);
    const user = admin.editUser;
    const id = admin.editUserId;
    const role = admin.userRole;

    if (!user || !id) {
        return <></>;
    }
    const [newName, setName] = useState(user.name);
    const [newRole, setNewRole] = useState(role);

    const handleChange = (event: SelectChangeEvent) => {
        setNewRole(event.target.value as string);
    };

    if (admin.adminPageStatus == PageStatus.loading) {
        return <LoadingSpinner />;
    }

    return (
        <Modal
            className="modal edit-modal"
            open={admin.deleteUpdateModal}
            onClose={() => dispatch(showDeleteUpdateModal(false))}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="modal-style">
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    className="content-center heading"
                >
                    <FontAwesomeIcon icon={faEdit} /> User Action
                </Typography>
                <Typography
                    className="modal-desc"
                    id="modal-modal-description"
                    component={'span'}
                >
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        className="change-data"
                    >
                        <TextField
                            disabled
                            id="outlined"
                            label="ID"
                            defaultValue={id}
                        />
                        <TextField
                            id="outlined"
                            label="Name"
                            value={newName}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <TextField
                            id="outlined"
                            disabled
                            label="Email"
                            value={user.email}
                        />
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">
                                Role
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={newRole}
                                label="Role"
                                onChange={handleChange}
                            >
                                <MenuItem value={role}>{role}</MenuItem>
                                {role === 'admin' ? (
                                    <MenuItem value="user">user</MenuItem>
                                ) : (
                                    <MenuItem value="admin">admin</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Box>

                    <CardActions>
                        <div className="center">
                            <Button
                                onClick={() =>
                                    dispatch(showDeleteUpdateModal(false))
                                }
                                size="small"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() =>
                                    dispatch(updateUser(id, newName!, newRole))
                                }
                                size="small"
                            >
                                Update
                            </Button>
                            <Button
                                onClick={() => dispatch(deleteUser(id))}
                                size="small"
                            >
                                Delete
                            </Button>
                        </div>
                    </CardActions>
                </Typography>
            </Box>
        </Modal>
    );
}
