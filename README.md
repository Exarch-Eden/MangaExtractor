# MangaExtractor
electron app that fetches data from certain manga distribution websites via web crawling :L


# Releases
Build notes for release versions.

# Production build and setup instructions
Production build generation and setup instructions for `Windows-based` computers.

<b><span style="color: red;">Warning</span>: Your node modules must be up to date. Do this by executing command: `npm install`.</b>

1. Open command terminal in project root directory
2. Execute command:
   <br>
   `npm run build`
   <br>
   This may take a few minutes
3. Navigate to the **dist** folder generated by the previous command then navigate to the **win-unpacked** folder
4. Inside **win-unpacked** folder, run the executable, **GoodsExtractor.exe**
   <br>
   <br>
   If prompted to give network access to the application, do so. This is a one-time prompt and is needed for the local server to function properly.
   <br>
   <br>
   At this point, the Electron desktop application should be running.


This concludes the production build and setup instructions.

# Other script commands
Custom node script commands with several different functionalities to facilitate development.

## React-related commands
- `npm run react-start`
  - Starts up a local server for the React app on port 3000
  - **Note: Certain content that may be rendered in the app may not appear (namely extracted images) due to Error 403.**
- `npm run react-build`
  - Generates a production build for the React app which can be found in the **build** folder
## Electron-related commands
**Note: The electron app does not update automatically (live) as it relies on the react build folder for updates. In order for the desktop app to reflect these changes, you must execute the command `npm run react-build` on a different terminal.**
<br>
<br>

<b><span style="color: red;">Warning</span>: Server-related changes require a full restart of the electron app via `npm start` or `npm run electron-dev`.</b>

- `npm run electron-start`
  - Starts up the electron app for easy access during development (depends on the command `npm run react-build` for changes to be seen live)
- `npm run electron-build`
  - Generates a production build for the Electron desktop app which can be found in the **dist** folder
- `npm run electron-dev`
  - Executes both `npm run react-build` and `npm run electron-start` to start up the electron app for development with just one command
## General commands
- `npm run build`
  - Makes use of the commands `npm run react-build` and `npm run electron-build` to generate an up-to-date build folder for the React component and the Electron desktop app for it
- `npm start`
  - Runs the command `npm run electron-dev` to open an updated version of the electron app
