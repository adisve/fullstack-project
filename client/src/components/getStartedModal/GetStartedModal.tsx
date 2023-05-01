import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Toolbar, Box, Button, Typography, Modal } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

import { ChooseWorkoutToggle } from './ChooseWorkoutToggle';
import { SetGoalDropdown } from './SetGoalDropdown';
import { SetFitnessProfile } from './SetFitnessProfile';
import { SuccessModal } from './SuccessModal';

import { RootState } from '../../store/store';
import { updateUserSeenModal } from '../../store/features/user/userSlice';

import './GetStartedModal.css';
import '../navbar/NavBar.css';

export function GetStartedModal() {
    /*
        TODO: needs to be uncommented, when updateUserSeenModal and createUserFitnessProfile are working
        here I check if the user is logged in
    */
    // const isLoggedIn = useSelector((state: RootState) => state.auth.token);
    // if (!isLoggedIn) {
    //     return <></>;
    // }

    const dispatch = useDispatch();
    let userHasSeenModal = useSelector(
        (state: RootState) => state.user.user?.seen_greeting_modal
    );

    const [open, setOpen] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const [exercise, setExercise] = useState<string[]>([]);
    const [goal, setGoal] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [fitnessLevel, setFitnessLevel] = useState<string>('');

    function handleClose() {
        // dispatch(updateUserSeenModal());
        setOpen(false);
    }

    async function handleSubmitData() {
        const numAge = parseInt(age);
        const numWeight = parseInt(weight);
        const numHeight = parseInt(height);
        const userData = {
            exercise,
            goal,
            numAge,
            gender,
            numWeight,
            numHeight,
            fitnessLevel,
        };

        /*
            TODO: Need to be uncommented
            createUserFitnessProfile: need to send to back end
        */
        // dispatch(createUserFitnessProfile(userData));
        // dispatch(updateUserSeenModal());
        setOpen(false);
        setSuccessModal(true);
        // }
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
            {!!userHasSeenModal ? null : (
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
                            component={'span'}
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
                                            disabled={exercise.length === 0}
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
                                            disabled={goal === ''}
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
                                            disabled={
                                                age === '' ||
                                                gender === '' ||
                                                weight === '' ||
                                                height === '' ||
                                                fitnessLevel === '' ||
                                                isNaN(parseInt(age)) ||
                                                isNaN(parseInt(weight)) ||
                                                isNaN(parseInt(height)) ||
                                                parseInt(age) < 1 ||
                                                parseInt(height) < 1 ||
                                                parseInt(weight) < 1
                                            }
                                            variant="contained"
                                            onClick={handleSubmitData}
                                        >
                                            Submit
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
            )}
            {successModal && <SuccessModal />}
        </>
    );
}
