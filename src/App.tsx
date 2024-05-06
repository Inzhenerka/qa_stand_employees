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
import NewCompanyPopup from "./components/NewCompanyPopup";
import NewEmployeePopup from "./components/NewEmployeePopup";
import ErrorDialog from "./components/ErrorDialog";
import {
    login,
    fetchCompanies,
    fetchEmployees,
    setCompanyStatus,
    deleteCompany,
    addCompany,
    addEmployee,
} from "./services/api";

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

    const [isNewCompanyPopupOpen, setIsNewCompanyPopupOpen] =
        useState<boolean>(false);
    const [isNewEmployeePopupOpen, setIsNewEmployeePopupOpen] =
        useState<boolean>(false);

    const loadCompanies = async () => {
        try {
            const data = await fetchCompanies();
            setCompanies(data);
            return data;
        } catch (error: any) {
            console.error(error);
            setErrorMessage(error.message || "");
            setIsErrorDialogOpen(true);
        }
    };

    const loadEmployees = async (companyId: number) => {
        try {
            const data = await fetchEmployees(companyId);
            setEmployees(data);
        } catch (error: any) {
            console.error(error);
            setErrorMessage(error.message || "");
            setIsErrorDialogOpen(true);
        }
    };

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

    const handleSetCompanyStatus = async (id: number, isActive: boolean) => {
        if (authToken) {
            console.log("Setting company status", id, isActive);
            await setCompanyStatus(id, isActive, authToken);
            const updatedCompanies = await loadCompanies();
            if (!updatedCompanies) {
                console.error("Failed to update companies list");
                return;
            }
            // Find the updated company details
            const updatedCompany = updatedCompanies.find(
                (company) => company.id === id
            );
            if (updatedCompany) {
                setCompanyForDetails(updatedCompany);
            } else {
                console.error("Company not found in the list");
            }
        } else {
            console.error("User is not authenticated");
        }
    };

    const handleAddNewCompany = async (name: string, description: string) => {
        if (authToken) {
            console.log("Adding new company", name, description);
            await addCompany(name, description, authToken);
            setIsNewCompanyPopupOpen(false);
            const updatedCompanies = await loadCompanies();
        } else {
            console.error("User is not authenticated");
        }
    };

    const handleDeleteCompany = async (id: number) => {
        if (authToken) {
            console.log("Deleting company", id);
            await deleteCompany(id, authToken);
            const updatedCompanies = await loadCompanies();
            setIsDetailsPopupOpen(false);
        } else {
            console.error("User is not authenticated");
        }
    };

    const handleAddNewEmployee = async (
        firstName: string,
        lastName: string,
        email: string,
        phone: string
    ) => {
        if (authToken && selectedCompany) {
            console.log("Adding new employee", firstName, lastName);
            await addEmployee(selectedCompany, firstName, lastName, email, phone, authToken);
            await loadEmployees(selectedCompany);
            setIsNewEmployeePopupOpen(false);
        } else {
            console.error("User is not authenticated or company not selected");
        }
    };

    useEffect(() => {
        loadCompanies();
    }, []);

    useEffect(() => {
        if (!selectedCompany) return;
        loadEmployees(selectedCompany);
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
                            onOpenNewCompanyPopup={() =>
                                setIsNewCompanyPopupOpen(true)
                            }
                            onOpenDetails={(company: Company) => {
                                setCompanyForDetails(company);
                                setIsDetailsPopupOpen(true);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Employees
                            employees={employees}
                            onOpenNewEmployeePopup={() =>
                                setIsNewEmployeePopupOpen(true)
                            }
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
                        onSetStatus={handleSetCompanyStatus}
                        onDelete={handleDeleteCompany}
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
                <NewCompanyPopup
                    open={isNewCompanyPopupOpen}
                    onClose={() => setIsNewCompanyPopupOpen(false)}
                    onAdd={handleAddNewCompany}
                />
                <NewEmployeePopup
                    open={isNewEmployeePopupOpen}
                    onClose={() => setIsNewEmployeePopupOpen(false)}
                    onAdd={handleAddNewEmployee}
                />
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
