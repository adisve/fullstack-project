import { useEffect, useState } from 'react';
import { Toolbar, Box, Button, Typography, Modal } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

import './GetStartedModal.css';
import '../navbar/NavBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store/store';

export function SuccessModal() {
    const dispatch: AppDispatch = useDispatch();
    const { modal } = useSelector((state: RootState) => state);
    const [open, setOpenSuccess] = useState(false);

    function handleCloseSucess() {
        setOpenSuccess(false);
    }

    useEffect(() => {
        setOpenSuccess(true);
    }, []);

    return (
        <>
            <Modal
                open={open}
                onClose={handleCloseSucess}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box className="modalStyle">
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        <Toolbar className="modalLogo" disableGutters>
                            <h3>ProTracker</h3> {'\u00A0'}
                            <FontAwesomeIcon icon={faDumbbell} />
                        </Toolbar>

                        <div>Gongrats! You're all set up!</div>
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        className="modalDesc"
                        component={'span'}
                    ></Typography>
                </Box>
            </Modal>
        </>
    );
}
