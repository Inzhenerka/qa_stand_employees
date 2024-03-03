import React from "react";
import { Box, Typography, Link, IconButton, Tooltip } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import DescriptionIcon from "@mui/icons-material/Description"; // Assuming you use this for Swagger
import { API_DOCS_URL, REPO_URL } from "../config"

const PageHeader: React.FC = () => (
    <Box
        sx={{
            width: "100%",
            padding: "20px",
            marginBottom: "20px",
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        }}
    >
        <Typography variant="h4" gutterBottom>
            Стенд курса «Playwright для инженера по тестированию» от
            <Link
                href="https://inzhenerka.tech"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ ml: 1 }} // Use MUI's sx prop for margin left instead of inline styles
            >
                inzhenerka.tech
            </Link>
        </Typography>
        <Box>
            <Tooltip title="Исходный код">
                <IconButton
                    href={REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                >
                    <GitHubIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Документация API (Swagger)">
                <IconButton
                    href={API_DOCS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                >
                    <DescriptionIcon />
                </IconButton>
            </Tooltip>
        </Box>
    </Box>
);

export default PageHeader;
