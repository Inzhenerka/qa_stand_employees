import React from "react";
import {
    Box,
    List,
    ListItemButton,
    ListItemText,
    Typography,
    ListItemIcon,
    IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Company } from "../types";

interface CompaniesProps {
    companies: Company[];
    selectedCompany: number | null;
    onSelectCompany: (id: number) => void;
    onOpenDetails: (company: Company) => void; // Added prop for opening details
}

const Companies: React.FC<CompaniesProps> = ({
    companies,
    selectedCompany,
    onSelectCompany,
    onOpenDetails, // Function to handle opening the details
}) => (
    <>
        <Typography variant="h6" gutterBottom>
            Компании
        </Typography>
        <Box
            sx={{
                maxHeight: "400px",
                overflow: "auto",
                "::-webkit-scrollbar": { width: "10px" },
                "::-webkit-scrollbar-thumb": {
                    backgroundColor: "primary.main",
                    borderRadius: "2px",
                },
            }}
        >
            <List>
                {companies.map((company) => (
                    <ListItemButton
                        key={company.id}
                        onClick={() => onSelectCompany(company.id)}
                        sx={{
                            bgcolor:
                                selectedCompany === company.id
                                    ? "action.selected"
                                    : "inherit",
                        }}
                    >
                        <ListItemText primary={company.name} />
                        <ListItemIcon>
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent ListItemButton action
                                    onOpenDetails(company);
                                }}
                            >
                                <InfoIcon />
                            </IconButton>
                        </ListItemIcon>
                    </ListItemButton>
                ))}
            </List>
        </Box>
    </>
);

export default Companies;
