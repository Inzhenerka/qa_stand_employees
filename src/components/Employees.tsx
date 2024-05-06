import React from "react";
import {
    Box,
    List,
    ListItemButton,
    ListItemText,
    Typography,
    IconButton,
    ListItemSecondaryAction,
    Grid,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import { Employee } from "../types";

interface EmployeesProps {
    employees: Employee[];
    onOpenDetails: (employee: Employee) => void; // Handler for opening employee details
    onOpenNewEmployeePopup: () => void;
}
const Employees: React.FC<EmployeesProps> = ({
    employees,
    onOpenDetails,
    onOpenNewEmployeePopup,
}) => (
    <>
        <Grid container alignItems="center" spacing={2}>
            <Grid item>
                <Typography variant="h6" gutterBottom>
                    Сотрудники
                </Typography>
            </Grid>
            <Grid item>
                <IconButton onClick={onOpenNewEmployeePopup}>
                    <AddIcon />
                </IconButton>
            </Grid>
        </Grid>
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
                {employees.map((employee) => (
                    <ListItemButton
                        key={employee.id}
                        onClick={() => onOpenDetails(employee)} // Attaching callback to the ListItemButton for selecting an employee
                    >
                        <ListItemText
                            primary={`${employee.firstName} ${employee.lastName}`}
                        />
                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                aria-label="details"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onOpenDetails(employee);
                                }}
                            >
                                <InfoIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItemButton>
                ))}
            </List>
        </Box>
    </>
);

export default Employees;
