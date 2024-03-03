import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Box,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface ErrorDialogProps {
    open: boolean;
    errorMessage: string;
    onClose: () => void;
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({
    open,
    errorMessage,
    onClose,
}) => {
    if (errorMessage === "") errorMessage = "Произошла неизвестная ошибка";
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="error-dialog-title"
            aria-describedby="error-dialog-description"
        >
            <DialogTitle id="error-dialog-title">
                <Box display="flex" alignItems="center" gap="10px">
                    <ErrorOutlineIcon color="error" /> Произошла ошибка
                </Box>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="error-dialog-description">
                    {errorMessage}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ErrorDialog;
