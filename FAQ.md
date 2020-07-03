# FAQ

- am I allowed to translate this CAD?

  - Yes you are.

- I started the CAD but I don't know where to find it!

  - The CAD should run by default at: `http://localhost:80/`

- When I want to register an account, it keeps loading.

  - this might be because your IP-address is not configured correctly in `./client/src/config/config.js`
    - FIX: To update this, look for your router-ip and replace the `http://localhost:3001` with `http://your-ip:3001` (change the 3001 if you selected a different port.) in `./client/src/config/config.js`, Make sure to run `npm run build` in the `./client` folder.

- Help, I got an error when creating a citizen/registering a vehicle/weapon, etc

  - create an issue [here](https://github.com/Dev-CasperTheGhost/snaily-cadv2/issues/new?assignees=&labels=&template=bug_report.md&title=)
  - Or Contact me

- Fun Fact:
  - Did you know SnailyCADv2 has about 58k lines of code!
