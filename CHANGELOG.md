# Changelog

## 1.5.9

- Fixed delete companies in admin panel

## 1.5.8

- Fixed typo (Thanks to [tomasalves8](https://github.com/Dev-CasperTheGhost/snaily-cadv2/pull/25) ♥
- description is not required anymore for `/call911` and `/calltow`

## 1.5.7

- Fixed 2/4 licenses not showing in client detail

## 1.5.6

- Small bug fixes
- Improvements
- Updated installation guide in README.md

## 1.5.5

- When getting a new 911 call, a sounds will be played to notify you
- Fixed alert message showing on other pages
- Fixed ems-fd status buttons not disabled when no deputies are found
- Small improvements
- Fixed small bugs

## 1.5.4

- Refactored some code
- Updated `snaily-cad.sql`, You do not need to re-import this file if you already have the CAD setup.
- Panic button alert now shows on dispatch page

## 1.5.3

- Fixed weapons not showing in admin dashboard
- Fixed weapons not adding in admin dashboard

## 1.5.2

- Fixed EMS/FD status update in dispatch
- Fixed dispatch create call refresh
- When updating AOp in CAD settings page, now syncs across all clients
- AOP now updates on citizen page
- Moved cancel button from update911Call to left for ease

## 1.5.1

- Officer statuses are now synced across dispatch and officer
- EMS/FD statuses are now synced across dispatch EMS/FD
- Fixed `911calls` not synced (now works)

## 1.5.0

- Fixed some officers won't go off-duty in dispatch
- Added panic button (only for officers, ems/fd to come)
- AOP now updates without refreshing
- Calls now update without refreshing
- `AOP`, `911 calls`, `tow calls` and `bolos` now are synced across all connected clients on the CAD (more coming.)

## 1.4.0

- Fixed few bugs in CAD settings
- Now page doesn't reload after selecting an officer, changing status, deleting/creating bolos, updating AOP. More coming soon!
- Fixed few other small bugs

## 1.3.4

- Preparing for default weapons
- Adding React-Redux for no reload, already implemented for bolos
  - You will need to install these by running `yarn add redux react-redux react-thunk` in the client folder.

## 1.3.3

- Small authentication improvements

## 1.3.2

- Fixed `'This citizen doesn't belong to you'` when it did.

## 1.3.1

- Fixed `"likes" doesn't have a default value`

## 1.3.0

- Added trucking logs (Hopefully more coming to this soon!)
  - Create truck logs
  - Delete Truck logs
- Fixed more minor bugs

## 1.2.2

- You can now rename your company
- Bug fixes

## 1.2.1

- When updating a 911 call and not selecting any officer, it will now show `none` instead of nothing
- Added a CAD setting to set `Create company` only for moderators and above (Not citizens)

## 1.2.0

- Fixed notepad icon not showing in Dispatch page
- In bleeter now only shows `...` if the bleet is longer than 120 characters
- Fixed blank page on citizen page when not logged in (didn't happen all the time)
- Cleaned up 10-codes page a little bit
- Now shows if there was an error when creating a bleet
- Added a "Go back" button in bleeter

## 1.1.2

- Fixed `'stringifyd_name' doesn't have a default value`
- Fixed `'pinned' doesn't have a default value`
- Fixed when not logged in, it now shows `home` instead of nothing
- Fixed CreateArrestReport `target name: undefined`, now shows the target name

## 1.1.1

- Fixed `'business_address' doesn't have a default value`

## 1.1.0

- Added Account Dropdown in navbar
- Added Delete Account, You can find this in your account page.
- Added transfer vehicle, you can now transfer vehicles to a new owner
- Added Fire employees from company
- Added update warrant
- Added time to LEO dashboard too
- Rewrote getting penal codes for leo dashboard, Only runes once instead of 3 times.
- Made a few improvements to selecting an officer to go on-duty
- Fixed Update 911 call `description` field empty
- Updated navbar, now shows your CAD name instead of `snaily-cad`
- Created a `FAQ` document, view it [here](./FAQ.md)

## 1.0.1

- Fixed auto logout after closing window on home page
- Made it a little more clear to know when registering a vehicle to a company
- Added company addresses, you can set an address for your company.
- Fixed `"dispatch_status" does not have a default value`

## 1.0.0

Initial Release
