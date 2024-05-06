import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";

interface NewCompanyPopupProps {
    open: boolean;
    onClose: () => void;
    onAdd: (name: string, description: string) => void;
}

const NewCompanyPopup: React.FC<NewCompanyPopupProps> = ({ open, onClose, onAdd }) => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleAdd = () => {
        onAdd(name, description);
        setName("");
        setDescription("");
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Добавить новую компанию</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Название"
                    fullWidth
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Описание"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button onClick={handleAdd} disabled={name.trim() === ""}>Добавить</Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewCompanyPopup;
