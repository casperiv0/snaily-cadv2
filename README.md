![license](https://img.shields.io/badge/license-MIT-green) ![version](https://img.shields.io/badge/version-1.5.3-orange)

# SnailyCAD v2

SnailyCAD is a Free and secure NodeJS CAD/MDT for your community!

## Information

View Screenshots [here](https://github.com/Dev-CasperTheGhost/snaily-cadv2/blob/master/media/SCREENSHOTS.md)

Video: [https://youtu.be/WxNhuUYpVN4](https://youtu.be/WxNhuUYpVN4)

### Demo

demo: [http://demo-cad.caspertheghost.me/](http://demo-cad.caspertheghost.me/)

**username:** demo

**password:** demo

## Requirements

- [Node](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [MySQL](https://www.apachefriends.org/download.html)

## Installation

1. Run `git clone https://github.com/Dev-CasperTheGhost/snaily-cadv2`
2. Run `cd snaily-cadv2`
3. Make a copy of `config-template.js` and rename the copy to `config.js`
4. Modify `config.js` where needed
5. Go to `client/src/config/` and modify `config.js` where needed
6. Run `npm install` to install the first part of the dependencies
7. Run `npm run create`
8. Run `cd client`
9. Run `npm run build` To create a build folder
10. Run `yarn global add serve` to add the serve command
11. Create a new database, name it `snaily-cad`
12. Import `snaily-cad.sql` into that database, [Download xampp Here](https://www.apachefriends.org)
13. Run `npm start` in the root folder (`./snaily-cadv2`)
14. CAD should be running on [http://localhost/](http://localhost/) by default

## Updating CAD

1. Stop the CAD
2. Run `git pull origin master`
3. Run `cd client`
4. Run `npm run build` to create the latest build
5. Run `cd ../`
6. Run `npm start` to run the CAD again

**If you don't understand any of these steps, let me know so I can help you.**

_If you find any problems with these steps, please contact me asap._

## Bugs

You can report bugs [here](https://github.com/Dev-CasperTheGhost/snaily-cadv2/issues/new?assignees=&labels=&template=bug_report.md&title=)

## Main Features

- Administration Dashboard
- Citizen Dashboard
- EMS/FD Dashboard
- LEO Dashboard
- Dispatch Dashboard
- Tow Dashboard
- Trucker Logs
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
  - Transfer a vehicle to a new owner
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
  - Panic button

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

- Trucker Logs

  - See all truck logs you've made
  - Create unlimited truck logs
  - Delete a truck log

- Bleeter

  - Upload screenshots
  - Create Bleets
  - Edit Bleets
  - Pin Bleets (Coming soon)
