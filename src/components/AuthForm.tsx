import React, { useState, FormEvent } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

interface AuthFormProps {
    onLogin: (username: string, password: string) => void;
    user: string | null;
    onLogout: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin, user, onLogout }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission
        onLogin(username, password);
    };

    return !user ? (
        <form onSubmit={handleSubmit}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "left",
                    "& > :not(style)": { mx: 1 },
                    flexWrap: "wrap",
                }}
            >
                <TextField
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ width: { xs: "100%", sm: "auto" } }}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ width: { xs: "100%", sm: "auto" } }}
                />
                <Button type="submit" variant="contained">
                    Войти
                </Button>
            </Box>
        </form>
    ) : (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "left",
                "& > :not(style)": { m: 1 },
            }}
        >
            <Typography variant="h6">👋 Привет, {user}</Typography>
            <Button variant="contained" onClick={onLogout}>
                Выйти
            </Button>
        </Box>
    );
};

export default AuthForm;
