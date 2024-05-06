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
import { Company } from "../types";

interface CompanyDetailsPopupProps {
    company: Company;
    open: boolean;
    onSetStatus: (id: number, isActive: boolean) => void;
    onDelete: (id: number) => void;
    onClose: () => void;
}

const CompanyDetailsPopup: React.FC<CompanyDetailsPopupProps> = ({
    company,
    open,
    onSetStatus,
    onDelete,
    onClose,
}) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <Card>
                <CardHeader
                    title={company ? company.name : "Компания не выбрана"}
                    subheader={company && `ID: ${company.id}`}
                    titleTypographyProps={{ variant: "h6" }}
                    subheaderTypographyProps={{ variant: "subtitle1" }}
                    action={
                        company && (
                            <Chip
                                label={
                                    company.isActive ? "Активна" : "Неактивна"
                                }
                                color={company.isActive ? "success" : "default"}
                                style={{ marginRight: 16 }}
                            />
                        )
                    }
                />
                <Divider />
                <DialogContent>
                    <CardContent>
                        {company ? (
                            <>
                                <Typography variant="body1" paragraph>
                                    {company.description}
                                </Typography>
                                {/* Add more company details here as needed */}
                            </>
                        ) : (
                            <Typography>
                                Информация о компании отсутствует.
                            </Typography>
                        )}
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                        <Button size="small" onClick={() => onSetStatus(company.id, !company.isActive)}>
                            {company.isActive ? "Деактивировать" : "Активировать"}
                        </Button>
                        <Button size="small" onClick={() => onDelete(company.id)}>
                            {"Удалить"}
                        </Button>
                        <Button size="small" onClick={onClose}>
                            Закрыть
                        </Button>
                    </CardActions>
                </DialogContent>
            </Card>
        </Dialog>
    );
};

export default CompanyDetailsPopup;
