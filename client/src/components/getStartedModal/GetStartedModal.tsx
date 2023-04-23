import { useEffect, useState } from 'react';
import { Toolbar, Box, Button, Typography, Modal } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

import { ChooseWorkoutToggle } from './ChooseWorkoutToggle';
import { SetGoalDropdown } from './SetGoalDropdown';
import { SetFitnessProfile } from './SetFitnessProfile';

import './GetStartedModal.css';
import '../navbar/NavBar.css';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 700,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

export function GetStartedModal() {
    const [open, setOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setOpen(true);
    }, []);

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
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

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {currentStep === 1 && (
                            <div>
                                <ChooseWorkoutToggle />
                                <div className="buttonGroup">
                                    <Button
                                        className="setUpLater"
                                        variant="outlined"
                                        onClick={handleClose}
                                    >
                                        Set up later
                                    </Button>
                                    <Button
                                        className="nextButton"
                                        variant="contained"
                                        onClick={handleNext}
                                    >
                                        Continue
                                    </Button>
                                </div>
                            </div>
                        )}
                        {currentStep === 2 && (
                            <div>
                                <SetGoalDropdown />
                                <div className="buttonGroup">
                                    <Button
                                        variant="outlined"
                                        onClick={handlePrevious}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                    >
                                        Continue
                                    </Button>
                                </div>
                            </div>
                        )}
                        {currentStep === 3 && (
                            <div>
                                <SetFitnessProfile />
                                <div className="buttonGroup">
                                    <Button
                                        variant="outlined"
                                        onClick={handlePrevious}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleClose}
                                    >
                                        Finish
                                    </Button>
                                </div>
                            </div>
                        )}
                        <div className="modalNumber">
                            <small>{currentStep}/3</small>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
