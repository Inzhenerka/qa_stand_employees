// App.tsx
import React, { useState, useEffect } from "react";
import {
    CssBaseline,
    Container,
    Grid,
    ThemeProvider,
    Box,
} from "@mui/material";
import theme from "./theme";
import { Company, Employee } from "./types";
import PageHeader from "./components/PageHeader";
import AuthForm from "./components/AuthForm";
import Companies from "./components/Companies";
import Employees from "./components/Employees";
import CompanyDetailsPopup from "./components/CompanyDetailsPopup";
import EmployeeDetailsPopup from "./components/EmployeeDetailsPopup";
import ErrorDialog from "./components/ErrorDialog";
import { login, fetchCompanies, fetchEmployees } from "./services/api";

const App: React.FC = () => {
    const [isErrorDialogOpen, setIsErrorDialogOpen] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [user, setUser] = useState<string | null>(null);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isDetailsPopupOpen, setIsDetailsPopupOpen] =
        useState<boolean>(false);
    const [companyForDetails, setCompanyForDetails] = useState<Company | null>(
        null
    );
    const [isEmployeeDetailsPopupOpen, setIsEmployeeDetailsPopupOpen] =
        useState<boolean>(false);
    const [employeeForDetails, setEmployeeForDetails] =
        useState<Employee | null>(null);

    const handleLogin = async (username: string, password: string) => {
        try {
            const data = await login({ username, password });
            setAuthToken(data.userToken);
            setUser(data.displayName);
        } catch (error: any) {
            setErrorMessage(error.message || "");
            setIsErrorDialogOpen(true);
            console.error(error);
        }
    };

    const handleLogout = () => {
        setAuthToken(null);
        setUser(null);
    };

    // TODO: Implement protected API calls
    console.log('Auth token', authToken);

    useEffect(() => {
        const loadCompanies = async () => {
            try {
                const data = await fetchCompanies();
                setCompanies(data);
            } catch (error: any) {
                console.error(error);
                setErrorMessage(error.message || "");
                setIsErrorDialogOpen(true);
            }
        };

        loadCompanies();
    }, []);

    useEffect(() => {
        if (!selectedCompany) return;
        const loadEmployees = async () => {
            try {
                const data = await fetchEmployees(selectedCompany);
                setEmployees(data);
            } catch (error: any) {
                console.error(error);
                setErrorMessage(error.message || "");
                setIsErrorDialogOpen(true);
            }
        };

        loadEmployees();
    }, [selectedCompany]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container>
                <PageHeader />
                <Box sx={{ marginBottom: "20px" }}>
                    <AuthForm
                        onLogin={handleLogin}
                        user={user}
                        onLogout={handleLogout}
                    />
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Companies
                            companies={companies}
                            selectedCompany={selectedCompany}
                            onSelectCompany={setSelectedCompany}
                            onOpenDetails={(company: Company) => {
                                setCompanyForDetails(company);
                                setIsDetailsPopupOpen(true);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Employees
                            employees={employees}
                            onOpenDetails={(employee: Employee) => {
                                setEmployeeForDetails(employee);
                                setIsEmployeeDetailsPopupOpen(true);
                            }}
                        />
                    </Grid>
                </Grid>
                {companyForDetails && (
                    <CompanyDetailsPopup
                        company={companyForDetails}
                        open={isDetailsPopupOpen}
                        onClose={() => setIsDetailsPopupOpen(false)}
                    />
                )}
                {employeeForDetails && (
                    <EmployeeDetailsPopup
                        employee={employeeForDetails}
                        open={isEmployeeDetailsPopupOpen}
                        onClose={() => setIsEmployeeDetailsPopupOpen(false)}
                    />
                )}
                <ErrorDialog
                    open={isErrorDialogOpen}
                    errorMessage={errorMessage}
                    onClose={() => setIsErrorDialogOpen(false)}
                />
            </Container>
        </ThemeProvider>
    );
};

export default App;
