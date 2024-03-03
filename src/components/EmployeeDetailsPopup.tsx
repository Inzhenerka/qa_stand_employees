import React from "react";
import {
    Dialog,
    DialogContent,
    Typography,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Button,
    Chip,
    Divider,
} from "@mui/material";
import { Employee } from "../types";

interface EmployeeDetailsPopupProps {
    employee: Employee | null;
    open: boolean;
    onClose: () => void;
}

const EmployeeDetailsPopup: React.FC<EmployeeDetailsPopupProps> = ({
    employee,
    open,
    onClose,
}) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <Card>
                <CardHeader
                    title={
                        employee
                            ? `${employee.firstName} ${employee.lastName}`
                            : "Сотрудник не выбран"
                    }
                    subheader={employee ? `ID: ${employee.id}` : ""}
                    action={
                        employee && (
                            <Chip
                                label={
                                    employee.isActive ? "Активен" : "Неактивен"
                                }
                                color={
                                    employee.isActive ? "success" : "default"
                                }
                                style={{ marginRight: 16 }}
                            />
                        )
                    }
                    titleTypographyProps={{ variant: "h6" }}
                    subheaderTypographyProps={{ variant: "subtitle1" }}
                />
                <Divider />
                <DialogContent>
                    <CardContent>
                        {employee ? (
                            <>
                                <Typography variant="body1" paragraph>
                                    Email: {employee.email}
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Телефон: {employee.phone}
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Дата рождения: {employee.birthdate}
                                </Typography>
                                <Typography variant="body1">
                                    URL:{" "}
                                    <a
                                        href={employee.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {employee.url}
                                    </a>
                                </Typography>
                            </>
                        ) : (
                            <Typography>
                                Информация о сотруднике отсутствует.
                            </Typography>
                        )}
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                        <Button size="small" onClick={onClose}>
                            Закрыть
                        </Button>
                    </CardActions>
                </DialogContent>
            </Card>
        </Dialog>
    );
};

export default EmployeeDetailsPopup;
