import { useEffect, useState } from 'react';
import { Toolbar, Box, Button, Typography, Modal } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

import { ChooseWorkoutToggle } from './ChooseWorkoutToggle';
import { SetGoalDropdown } from './SetGoalDropdown';
import { SetFitnessProfile } from './SetFitnessProfile';

import './GetStartedModal.css';
import '../navbar/NavBar.css';

export function GetStartedModal() {
    const [open, setOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const [exercise, setExercise] = useState<undefined | string[]>();
    const [goal, setGoal] = useState<undefined | string>();
    const [age, setAge] = useState<undefined | string>('');
    const [gender, setGender] = useState<undefined | string>('');
    const [weight, setWeight] = useState<undefined | string>('');
    const [height, setHeight] = useState<undefined | string>('');
    const [fitnessLevel, setFitnessLevel] = useState<undefined | string>('');

    // TODO: post to backend if the user has seen the modal
    function handleClose() {
        setOpen(false);
    }
    function handleSubmitData() {
        setOpen(false);
    }

    function handleNext() {
        setCurrentStep(currentStep + 1);
    }

    function handlePrevious() {
        setCurrentStep(currentStep - 1);
    }

    useEffect(() => {
        setOpen(true);
    }, []);

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
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
                    >
                        {currentStep === 1 && (
                            <div>
                                <ChooseWorkoutToggle
                                    exercise={exercise}
                                    setExercise={setExercise}
                                />
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
                                <SetGoalDropdown
                                    goal={goal}
                                    setGoal={setGoal}
                                />
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
                                <SetFitnessProfile
                                    age={age}
                                    setAge={setAge}
                                    gender={gender}
                                    setGender={setGender}
                                    weight={weight}
                                    setWeight={setWeight}
                                    height={height}
                                    setHeight={setHeight}
                                    fitnessLevel={fitnessLevel}
                                    setFitnessLevel={setFitnessLevel}
                                />
                                <div className="buttonGroup">
                                    <Button
                                        variant="outlined"
                                        onClick={handlePrevious}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleSubmitData}
                                    >
                                        Set your routine
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
        </>
    );
}
