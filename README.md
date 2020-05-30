# SnailyCAD v2

SnailyCAD is a Free and secure NodeJS CAD/MDT for your community!

## Installation

1. Run `git clone https://github.com/Dev-CasperTheGhost/snaily-cadv2`
2. Run `cd snaily-cadv2`
3. Run `npm install` to install the first part of the dependencies
4. Run `cd server && npm install` to install the second part of the dependencies
5. Run `cd ../` to go back
6. Run `cd client && npm install` to install the last dependencies (Might take a little bit)
7. Run `npm run build` To create a build folder
8. Run `yarn global add serve` to add the serve command
9. Make a copy of `config-template.js` and rename the copy to `config.js`
10. Modify `config.js` where needed
11. Go to `client/src/config/` and modify `config.js` where needed
12. Create a new database, name it `snaily-cad`
13. Import `snaily-cad.sql` into that database, [Download xampp Here](https://www.apachefriends.org)
14. Run `npm start` in the root folder (`./snaily-cadv2`)
15. CAD should be running on [http://localhost:5000](http://localhost:5000)

## Updating CAD

1. Run `git pull origin master`

**If you don't understand any of these steps, let me know so I can help you.**

_If you find any problems with these steps, please contact me asap._

## Screenshots

View Screenshots [here](https://)

## Main Features

- Administration Dashboard
- Citizen Dashboard
- EMS/FD Dashboard
- LEO Dashboard
- Dispatch Dashboard
- Tow Dashboard
- Bleeter

- Administration

  - Manage user permissions
  - Manage all companies
  - Manage all citizens
  - Ban users
  - Audit Logs
  - CAD Settings
  - Assign your own values for departments, ethnicities, genders and more

- Citizen

  - Create medical records
  - upload a picture of your citizen
  - Register vehicles and weapons
  - Call emergency services and tow truckers from the citizen dashboard
  - Drivers, pilot, firearms license and CCW
  - Report vehicles as stolen
  - Companies
    - Company Blog posts
    - Create posts
    - Manage Employees
    - Join a company
    - Start your own company

- EMS/FD

  - Create EMS/FD Deputies
  - Search medical records
  - See active 911 calls

- LEO

  - Create unlimited officers per account
  - Name Search
  - Plate Search
  - Weapon Search
  - Create Written warnings
  - Create Tickets
  - Create Arrest reports
  - Create bolos
  - Penal Codes
  - 10-codes
  - Manage Status (10-8, 10-7, 10-6, 10-5, ...)
  - Create Warrants
  - See active 911 calls
  - See active bolos

- Dispatch

  - Name Search
  - Plate Search
  - Weapon Search
  - Address Search
  - Update officers status
  - Update emergency calls
  - Update AOP
  - See Active officers and EMS/FD deputies
  - See active 911 calls
  - See active bolos

- Tow

  - See all active tow calls
  - in game call tow truckers command

- Bleeter

  - Upload screenshots
  - Create Bleets
  - Edit Bleets
  - Pin Bleets (Coming soon)
