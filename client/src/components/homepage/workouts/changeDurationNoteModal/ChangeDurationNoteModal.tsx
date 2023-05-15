import {
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    TextField,
    styled,
} from '@mui/material';

const StyledDialog = styled((props: any) => <Dialog {...props} />)(({ _ }) => ({
    // Set border radius to 20px
    '& .MuiDialog-paper': {
        borderRadius: 20,
    },
}));

export function ChangeDurationNoteModal(props: any) {
    const {
        open,
        handleClose,
        setNotes,
        setDuration,
        currentNotes,
        currentDuration,
    } = props;

    return (
        <StyledDialog open={open} onClose={() => handleClose(false)}>
            <DialogContent>
                <DialogTitle sx={{ textAlign: 'center' }}>
                    Change Duration and Notes
                </DialogTitle>
                <TextField
                    label="Notes"
                    variant="outlined"
                    fullWidth
                    defaultValue={currentNotes}
                    onChange={(e) => setNotes(e.target.value)}
                />
                <Divider sx={{ margin: '1em 0' }} />
                <TextField
                    label="Duration"
                    variant="outlined"
                    fullWidth
                    type="number"
                    defaultValue={currentDuration}
                    onChange={(e) => setDuration(e.target.value)}
                />
            </DialogContent>
        </StyledDialog>
    );
}
