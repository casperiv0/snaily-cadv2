const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const app = express();
const { port } = require("../config.js");
const { connectToDatabase } = require("./utils/db");
const checkForUpdates = require("./utils/checkForUpdates")
const updateDatabase = require("./utils/updateDatabase")
const helmet = require('helmet');


// Run app on port
let server = app.listen(port);
let io = require('socket.io')(server);

// Require Routes
// ADMIN ROUTERS
const adminRouter = require("./routes/admin/admin");
const citizenManagementRouter = require("./routes/admin/citizenManagement");
const memberManagementRouter = require("./routes/admin/memberManagement");
const companyManagementRouter = require("./routes/admin/companyManagement");
const editCadRouter = require("./routes/admin/editCad");
// admin values
const departmentsRouter = require("./routes/admin/values/departments");
const ethnicitiesRouter = require("./routes/admin/values/ethnicities");
const gendersRouter = require("./routes/admin/values/genders");
const legalStatusRouter = require("./routes/admin/values/legal");
const vehiclesRouter = require("./routes/admin/values/vehicles");
const weaponsRouter = require("./routes/admin/values/weapons");

// Edit Account
const editAccountRouter = require("./routes/editAccountRouter");

// Auth Routers
const authRouter = require("./routes/authentication/auth");

//global Router
const globalRouter = require("./routes/global/global")(io)

// Dispatch Router
const dispatchRouter = require('./routes/dispatch/dispatch')(io)

// officers Router
const officersRouter = require("./routes/officers/officers");

// Citizen Routers
const citizenRouter = require("./routes/citizen/citizen");
const companyRouter = require("./routes/citizen/company");
const medicalRecordRoute = require("./routes/citizen/medicalRecords");
const licensesRouter = require("./routes/citizen/licenses");
const citizenWeaponsRouter = require("./routes/citizen/weapons");
const citizenVehiclesRouter = require("./routes/citizen/vehicles");

// Bleeter
const bleeterRouter = require("./routes/bleeter/bleeter");

// truck logs
const truckLogsRouter = require("./routes/trucklogs/trucklogs");

// EMS_FD
const ems_fdRouter = require("./routes/ems-fd/ems-fd");


// Middleware
app.use(cors());
app.use(helmet());
app.use(fileUpload());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

// Auth Routers
app.use("/auth", authRouter);

app.use("/account", editAccountRouter);

// Admin Routers
app.use("/admin", adminRouter);
app.use("/admin/citizens", citizenManagementRouter);
app.use("/admin/members", memberManagementRouter);
app.use("/admin/companies", companyManagementRouter);
app.use("/admin/edit-cad", editCadRouter);
app.use("/admin/departments", departmentsRouter);
app.use("/admin/ethnicities", ethnicitiesRouter);
app.use("/admin/genders", gendersRouter);
app.use("/admin/legal-statuses", legalStatusRouter);
app.use("/admin/vehicles", vehiclesRouter);
app.use("/admin/weapons", weaponsRouter);

// Dispatch
app.use("/dispatch", dispatchRouter);

// Officers
app.use("/officers", officersRouter);

app.use("/global", globalRouter);

app.use("/ems-fd", ems_fdRouter);

app.use("/citizen", citizenRouter);

app.use("/company", companyRouter)

app.use("/medical", medicalRecordRoute)

app.use("/licenses", licensesRouter);

app.use("/c/weapons", citizenWeaponsRouter);

app.use("/c/vehicles", citizenVehiclesRouter);

app.use("/truck-logs", truckLogsRouter);

app.use("/bleeter/", bleeterRouter);

checkForUpdates();
updateDatabase();
// Run connectToDB
connectToDatabase().then(() => {
    console.log("Connected to Database");
}).catch(err => console.log(err))