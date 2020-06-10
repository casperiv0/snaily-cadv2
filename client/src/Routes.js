import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Partials
import Navbar from "./components/Partials/Navbar"
import HomePage from './components/Partials/HomePage';

// Authentication
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PrivateRoute from "./components/Auth/Routes/PrivateRoute"

// Account
import Account from './components/Account/Account';
import AdminEditMember from './components/Admin/Management/Members/AdminEditMember';


// Citizen
import CitizensPage from "./components/Citizen/CitizensPage";
import CreateCitizen from "./components/Citizen/CreateCitizen";
import CitizensDetailPage from "./components/Citizen/CitizenDetail/CitizensDetailPage";
import EditCitizen from './components/Citizen/EditCitizen';
// Company
import ManageEmployment from "./components/Citizen/Company/ManageEmployment"
import CompanyPage from './components/Citizen/Company/CompanyPage/CompanyPage';
import CreateCompanyPost from './components/Citizen/Company/CompanyPage/Posts/CreateCompanyPost';
import ManageCompany from './components/Citizen/Company/CompanyPage/ManageCompany/ManageCompany';
import EditEmployee from './components/Citizen/Company/CompanyPage/ManageCompany/Employees/EditEmployee';



// Medical Records
import AddMedicalRecords from './components/Citizen/Medical/AddMedicalRecords';


// Licenses
import EditLicenses from "./components/Citizen/Licenses/EditLicenses";

// Tow
import TowAuthRoute from './components/Auth/Routes/TowAuthRoute';
import Tow from "./components/Tow/Tow";
import NoAccess from './components/Partials/Messages/NoAccess';


// Bleeter
import Bleeter from "./components/Bleeter/Bleeter"
import Bleet from './components/Bleeter/Bleet/Bleet';
import CreateBleet from './components/Bleeter/CreateBleet';
import EditBleet from './components/Bleeter/Bleet/EditBleet';


// Vehicles
import RegisterVehicle from './components/Citizen/Vehicles/RegisterVehicle';
import TransferVehicle from './components/Citizen/Vehicles/TransferVehicle';

// Weapons
import RegisterWeapon from "./components/Citizen/Weapons/RegisterWeapon"
import EditRegisteredVehicle from './components/Citizen/Vehicles/EditRegisteredVehicle';

// EMS_FD
import PrivateEMSRoute from "./components/Auth/Routes/PrivateEMSRoute"
import EmsFdDashboard from './components/EMS-FD/EmsFdDashboard/EmsFdDashboard';
import MyEmsFdDeputies from './components/EMS-FD/MyEmsFdDeputies/MyEmsFdDeputies';
import CreateEmsFdDeputy from './components/EMS-FD/MyEmsFdDeputies/CreateEmsFdDeputy';

// admin
import AdminRoute from "./components/Auth/Routes/AdminRoute"
import Admin from './components/Admin/Admin';

// values
// departments
import Departments from './components/Admin/Values/Departments/Departments.jsx';
import AddDepartment from './components/Admin/Values/Departments/AddDepartment';
import EditDepartment from './components/Admin/Values/Departments/EditDepartment';
// ethnicities
import Ethnicities from './components/Admin/Values/Ethnicities/Ethnicities';
import AddEthnicity from './components/Admin/Values/Ethnicities/AddEthnicity';
import EditEthnicity from './components/Admin/Values/Ethnicities/EditEthnicty';
// genders
import AddGender from './components/Admin/Values/Genders/AddGender';
import Genders from './components/Admin/Values/Genders/Genders';
import EditGender from './components/Admin/Values/Genders/Editgender';
// legal statuses
import LegalStatuses from './components/Admin/Values/Legal/LegalStatuses';
import AddLegalStatus from './components/Admin/Values/Legal/AddLegalStatus';
import EditLegalStatus from './components/Admin/Values/Legal/EditLegalStatus';
// Vehicles
import AddVehicle from './components/Admin/Values/Vehicles/AddVehicle';
import EditVehicle from './components/Admin/Values/Vehicles/EditVehicle';
import Vehicles from './components/Admin/Values/Vehicles/Vehicles';

// weapons
import Weapons from './components/Admin/Values/Weapons/Weapons';
import AddWeapon from './components/Admin/Values/Weapons/AddWeapon';
import EditWeapon from './components/Admin/Values/Weapons/EditWeapon';

// Management
import AuditLogs from './components/Admin/Management/AuditLogs';

// citizens
import CitizenManagement from './components/Admin/Management/Citizen/CitizenManagement';
import AdminEditCitizen from './components/Admin/Management/Citizen/AdminEditCitizen';

// members
import MemberManagement from './components/Admin/Management/Members/MemberManagement';

// admin company
import CompanyManagement from './components/Admin/Management/CompanyManagement';

// Dispatch
import DispatchRoute from "./components/Auth/Routes/DispatchRoute"
import DispatchDashboard from './components/Dispatch/Dashboard/DispatchDashboard';

// CAD settings
import OwnerRoute from './components/Auth/Routes/OwnerRoute';
import CadSettings from './components/Admin/CadSettings';

// LEO
import LeoRoute from "./components/Auth/Routes/LeoRoute"
import LeoDashboard from './components/Leo/LeoDashboard';
import PenalCodes from "./components/Leo/PenalCodes"
import Codes10 from './components/Leo/Codes10';
import MyOfficers from './components/Leo/MyOfficers/MyOfficers';
import CreateOfficer from './components/Leo/MyOfficers/CreateOfficer';
import TruckerLogs from './components/TruckerLogs/TruckerLogs';
import CreateTruckLog from './components/TruckerLogs/CreateTruckLog';


export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Navbar />

                <Route path="/" exact component={HomePage} />
                <Route path="/403" exact render={() => (
                    <NoAccess message="Sorry! You don't have access to this part of the CAD. Please contact staff member." />
                )} />

                <div className="login-container">
                    <Switch basename="/">
                        {/* Auth Routes */}
                        <Route path="/auth/login" exact component={Login} />
                        <Route path="/auth/register" exact component={Register} />
                    </Switch>
                </div>

                <Switch basename="/">
                    <PrivateRoute exact path="/account" component={Account} />
                </Switch>


                <Switch basename="/">
                    <PrivateRoute exact path="/citizen" component={CitizensPage} />
                    <PrivateRoute exact path="/citizen/create" component={CreateCitizen} />
                    <PrivateRoute exact path="/citizen/:citizenId" component={CitizensDetailPage} />
                    <PrivateRoute exact path="/citizen/:citizenId/edit" component={EditCitizen} />

                    {/* Licenses */}
                    <PrivateRoute exact path="/licenses/edit/:citizenId" component={EditLicenses} />

                    {/* Medical Record */}
                    <PrivateRoute exact path="/medical-records/add/:citizenId-:fullName" component={AddMedicalRecords} />


                    {/* Vehicles */}
                    <PrivateRoute exact path="/vehicles/register" component={RegisterVehicle} />
                    <PrivateRoute exact path="/vehicles/edit/:vehicleId" component={EditRegisteredVehicle} />
                    <PrivateRoute exact path="/vehicles/transfer/:vehicleId" component={TransferVehicle} />

                    {/* Weapons */}
                    <PrivateRoute exact path="/weapons/register" component={RegisterWeapon} />
                </Switch>

                {/* Company */}
                <Switch basename="/">
                    <PrivateRoute exact path="/manage-company-employment" component={ManageEmployment} />

                    <PrivateRoute exact path="/company/:citizenId/:company" component={CompanyPage} />
                    <PrivateRoute exact path="/company/:citizenId/:company/create-post" component={CreateCompanyPost} />
                    <PrivateRoute exact path="/company/:citizenId/:company/manage" component={ManageCompany} />
                    <PrivateRoute exact path="/company/:citizenId/:company/manage/:employeeId/" component={EditEmployee} />
                </Switch>


                <Switch basename="/">
                    <TowAuthRoute exact path="/tow" component={Tow} />
                </Switch>


                {/* Bleeter */}
                <Switch basename="/">
                    <PrivateRoute path="/bleeter" exact component={Bleeter} />
                    <PrivateRoute path="/bleeter/create" exact component={CreateBleet} />
                    <PrivateRoute path="/bleet/:bleetId" exact component={Bleet} />
                    <PrivateRoute path="/bleet/:bleetId/edit" exact component={EditBleet} />
                </Switch>

                {/* EMS-fd */}
                <Switch basename="/">
                    <PrivateEMSRoute exact path="/ems-fd" component={EmsFdDashboard} />
                    <PrivateEMSRoute exact path="/ems-fd/deputies" component={MyEmsFdDeputies} />
                    <PrivateEMSRoute exact path="/ems-fd/deputies/create-deputy" component={CreateEmsFdDeputy} />
                </Switch>

                <Switch basename="/">
                    <OwnerRoute path="/admin/cad-settings" component={CadSettings} />
                </Switch>

                {/* Admin */}
                <div className="container-fluid row">
                    <Switch basename="/admin">
                        <AdminRoute exact path="/admin" component={Admin} />
                        {/* Management */}
                        <AdminRoute exact path="/admin/audit-logs" component={AuditLogs} />

                        {/* Citizens */}
                        <AdminRoute exact path="/admin/manage/citizens" component={CitizenManagement} />
                        <AdminRoute exact path="/admin/manage/citizens/edit/:id" component={AdminEditCitizen} />

                        {/* Members */}
                        <AdminRoute exact path="/admin/manage/members" component={MemberManagement} />
                        <AdminRoute exact path="/admin/manage/members/edit/:id" component={AdminEditMember} />

                        <AdminRoute exact path="/admin/manage/companies" component={CompanyManagement} />


                        {/* Values */}

                        {/* Departments */}
                        <AdminRoute exact path="/admin/departments" component={Departments} />
                        <AdminRoute exact path="/admin/departments/add" component={AddDepartment} />
                        <AdminRoute exact path="/admin/departments/edit/:id" component={EditDepartment} />

                        {/* Ethnicities */}
                        <AdminRoute exact path="/admin/ethnicities" component={Ethnicities} />
                        <AdminRoute exact path="/admin/ethnicities/add" component={AddEthnicity} />
                        <AdminRoute exact path="/admin/ethnicities/edit/:id" component={EditEthnicity} />

                        {/* Genders */}
                        <AdminRoute exact path="/admin/genders" component={Genders} />
                        <AdminRoute exact path="/admin/genders/add" component={AddGender} />
                        <AdminRoute exact path="/admin/genders/edit/:id" component={EditGender} />

                        {/* Legal Statuses */}
                        <AdminRoute exact path="/admin/legal-statuses" component={LegalStatuses} />
                        <AdminRoute exact path="/admin/legal-statuses/add" component={AddLegalStatus} />
                        <AdminRoute exact path="/admin/legal-statuses/edit/:id" component={EditLegalStatus} />

                        {/* Vehicles */}
                        <AdminRoute exact path="/admin/vehicles" component={Vehicles} />
                        <AdminRoute exact path="/admin/vehicles/add" component={AddVehicle} />
                        <AdminRoute exact path="/admin/vehicles/edit/:id" component={EditVehicle} />

                        {/* Weapons */}
                        <AdminRoute exact path="/admin/weapons" component={Weapons} />
                        <AdminRoute exact path="/admin/weapons/add" component={AddWeapon} />
                        <AdminRoute exact path="/admin/weapons/edit/:id" component={EditWeapon} />
                    </Switch>
                </div>

                {/* Dispatch */}
                <Switch basename="/">
                    <DispatchRoute exact path="/dispatch" component={DispatchDashboard} />
                </Switch>

                {/* LEO */}
                <Switch basename="/">
                    <LeoRoute exact path="/leo/dash" component={LeoDashboard} />
                    <LeoRoute exact path="/leo/penal-codes" component={PenalCodes} />
                    <LeoRoute exact path="/leo/10-codes" component={Codes10} />
                    <LeoRoute exact path="/leo/myofficers" component={MyOfficers} />
                    <LeoRoute exact path="/leo/myofficers/create" component={CreateOfficer} />
                </Switch>

                <Switch basename="/">
                    <PrivateRoute path="/truck-logs" component={TruckerLogs} exact />
                    <PrivateRoute path="/truck-logs/create" component={CreateTruckLog} exact />
                </Switch>
            </Router>
        )
    }
}