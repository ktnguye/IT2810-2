# Project 2 - IT2810

### Setup & Startup

1. **Prerequisites**:

   - Install Node.js v19.6+ and npm v9.4+.
   - Ensure Vite 4.4+ and MongoDB 7.0 is set up.
   - Follow the instructions [here](https://www.mongodb.com/docs/manual/installation/) to install and set up MongoDB on your machine.

2. **Installation**:

   - Clone the repository: `https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-30/project-2.git`
   - Navigate to the project directory: `cd ../project-2/prosjekt2/`
   - Install dependencies: `npm run setup`

3. **Starting the project**:

These commands should run from the prosjekt2 directory:
   - Run server: `npm run server`
   - Run client`npm run dev`

4. **Testing**:

   - Run tests: `npm run test` (Tests not implemented yet)

5. **Code formatting**:

   Run these commands from the prosjekt2 directory:
   - Run linting: `npm run lint`
     - You will get three warnings that we decided was necessary for a better user experience
   - Run prettier: `npm run prettier`

6. **Set up backend on VM**

   - Delete node_modules
   - Run `scp -r backend jonawo@it2810-30.idi.ntnu.no:/tmp` in terminal
   - Check if node version 20 or later is installed if not follow these steps - Run `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash` in VM - Run `export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "$ {XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm` - Check node version. Should be 20 or later
   - Check if nohup is installed
     - If not install nohup
   - Run `cd /tmp/backend` in VM
   - Run `npm install`
   - Run `nohup npm run dev &`
   - Reinstall frontend

   ### NB! If backend is not running contact Jonas Wolla for help

### Detailed documentation:

[Here](https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-30/project-2/-/wikis/Documentation-for-Project-2)
