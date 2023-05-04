import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { useEffect } from 'react';
import { Toolbar, Box, Typography, Modal } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { SuccessModal } from './SuccessModal';
import { RootState } from '../../store/store';
import { isUserOnBoarded } from '../../store/features/user/modalSlice';
import ChooseWorkout from './chooseWorkout/ChooseWorkout';
import SetGoal from './setGoal/SetGoal';
import UserProfile from './setProfile/UserProfile';

import './GetStartedModal.css';
import '../navbar/NavBar.css';

type AppDispatch = ThunkDispatch<RootState, undefined, any>;

export function GetStartedModal() {
    const dispatch: AppDispatch = useDispatch();
    const { modal } = useSelector((state: RootState) => state);

    useEffect(() => {
        dispatch(isUserOnBoarded());
    }, []);

    function getPage(): React.ReactNode {
        if (modal.currentStep === 1) {
            return <ChooseWorkout />;
        }
        if (modal.currentStep === 2) {
            return <SetGoal />;
        }
        if (modal.currentStep === 3) {
            return <UserProfile />;
        }
    }

    return (
        <>
            {!modal.showModal ? null : (
                <Modal
                    open={modal.showModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
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

                            <div>
                                Welcome to{' '}
                                <span className="brand-name">ProTracker</span>{' '}
                                Community! Set up your workout routine.
                            </div>
                        </Typography>

                        <Typography
                            id="modal-modal-description"
                            className="modalDesc"
                            component={'span'}
                        >
                            {getPage()}

                            <div className="modalNumber">
                                <small>{modal.currentStep}/3</small>
                            </div>
                        </Typography>
                    </Box>
                </Modal>
            )}
            {modal.successModal && <SuccessModal />}
        </>
    );
}
