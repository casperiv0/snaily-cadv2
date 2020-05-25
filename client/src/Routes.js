import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Partials
import Navbar from "./components/Partials/Navbar"
import HomePage from './components/Partials/HomePage';

// Authentication
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PrivateRoute from "./components/Auth/PrivateRoute"


// Citizen
import CitizensPage from "./components/Citizen/CitizensPage";
import CreateCitizen from "./components/Citizen/CreateCitizen";
import CitizensDetailPage from "./components/Citizen/CitizenDetail/CitizensDetailPage";
import EditCitizen from './components/Citizen/EditCitizen';

// Medical Records
import AddMedicalRecords from './components/Citizen/Medical/AddMedicalRecords';


// Licenses
import EditLicenses from "./components/Citizen/Licenses/EditLicenses";

// Tow
import TowAuthRoute from './components/Auth/TowAuthRoute';
import Tow from "./components/Tow/Tow";
import NoAccess from './components/Partials/Messages/NoAccess';


// Bleeter
import Bleeter from "./components/Bleeter/Bleeter"

// Vehicles
import RegisterVehicle from './components/Citizen/Vehicles/RegisterVehicle';

// Weapons
import RegisterWeapon from "./components/Citizen/Weapons/RegisterWeapon"
import EditRegisteredVehicle from './components/Citizen/Vehicles/EditRegisteredVehicle';

// EMS_FD
import PrivateEMSRoute from "./components/Auth/PrivateEMSRoute"
import EmsFdDashboard from './components/EMS-FD/EmsFdDashboard/EmsFdDashboard';
import MyEmsFdDeputies from './components/EMS-FD/MyEmsFdDeputies/MyEmsFdDeputies';
import CreateEmsFdDeputy from './components/EMS-FD/MyEmsFdDeputies/CreateEmsFdDeputy';

// admin
import AdminRoute from "./components/Auth/AdminRoute"
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
import ActionLogs from './components/Admin/Management/ActionLogs';

// citizens
import CitizenManagement from './components/Admin/Management/Citizen/CitizenManagement';
import AdminEditCitizen from './components/Admin/Management/Citizen/AdminEditCitizen';

// members
import MemberManagement from './components/Admin/Management/Members/MemberManagement';
import Account from './components/Account/Account';
import AdminEditMember from './components/Admin/Management/Members/AdminEditMember';

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

                    {/* Weapons */}
                    <PrivateRoute exact path="/weapons/register" component={RegisterWeapon} />
                </Switch>


                <Switch basename="/">
                    <TowAuthRoute exact path="/tow" component={Tow} />
                </Switch>


                <Switch basename="/">
                    <Route path="/bleeter" exact component={Bleeter} />
                </Switch>


                <Switch basename="/">
                    <PrivateEMSRoute exact path="/ems-fd" component={EmsFdDashboard} />
                    <PrivateEMSRoute exact path="/ems-fd/deputies" component={MyEmsFdDeputies} />
                    <PrivateEMSRoute exact path="/ems-fd/deputies/create-deputy" component={CreateEmsFdDeputy} />
                </Switch>

                <div className="container-fluid row">
                    <Switch basename="/admin">
                        <AdminRoute exact path="/admin" component={Admin} />
                        {/* Management */}
                        <AdminRoute exact path="/admin/action-logs" component={ActionLogs} />

                        {/* Citizens */}
                        <AdminRoute exact path="/admin/manage/citizens" component={CitizenManagement} />
                        <AdminRoute exact path="/admin/manage/citizens/edit/:id" component={AdminEditCitizen} />

                        {/* Members */}
                        <AdminRoute exact path="/admin/manage/members" component={MemberManagement} />
                        <AdminRoute exact path="/admin/manage/members/edit/:id" component={AdminEditMember} />

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

            </Router>
        )
    }
}