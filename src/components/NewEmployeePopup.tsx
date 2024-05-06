import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
} from "@mui/material";

interface NewEmployeePopupProps {
    open: boolean;
    onClose: () => void;
    onAdd: (firstName: string, lastName: string, email: string, phone: string) => void;
}

const NewEmployeePopup: React.FC<NewEmployeePopupProps> = ({
    open,
    onClose,
    onAdd,
}) => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    const handleAdd = () => {
        onAdd(firstName, lastName, email, phone);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Добавить нового сотрудника</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Имя"
                    fullWidth
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Фамилия"
                    fullWidth
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Email"
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Телефон"
                    fullWidth
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button
                    onClick={handleAdd}
                    disabled={
                        firstName.trim() === "" ||
                        lastName.trim() === "" ||
                        email.trim() === "" ||
                        phone.trim() === ""
                    }
                >
                    Добавить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewEmployeePopup;
