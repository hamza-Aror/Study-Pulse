HEAD
# StudyPulse — desktop widget

A small floating, always-on-top study partner that sits in the top-right corner of your screen: today's classes with attendance tracking, and your pending assignments.

This is a real desktop app (built with Electron), not a webpage — it opens as its own borderless window, stays on top of everything else, and can start automatically when your computer boots.

## 1. Install Node.js

You need Node.js installed once. Download the LTS version from https://nodejs.org and install it (Next, Next, Finish — defaults are fine).

Check it worked by opening a terminal (Command Prompt / Terminal / PowerShell) and running:
```
node -v
```
You should see a version number.

## 2. Install the app's dependencies

Open a terminal, navigate into this folder, and run:
```
cd path/to/studypulse-desktop
npm install
```
This downloads Electron (the framework that lets this run as a desktop app). It only needs to happen once, and needs an internet connection.

## 3. Run it

```
npm start
```

StudyPulse should appear floating in the top-right corner of your screen, on top of everything else. Drag the header to move it. Click the gear icon to add your weekly timetable and manage settings, including turning "open at startup" on or off (it's on by default).

Closing the window quits the app; minimizing tucks it out of the way without losing your place.

## 4. Make it a proper installed app (optional but recommended)

Running `npm start` works, but requires opening a terminal every time. To get a real, double-click app you can pin to your taskbar/dock:

```
npm run dist
```

This creates an installer in the `dist` folder:
- **Windows** → an `.exe` installer (NSIS)
- **Mac** → a `.dmg`
- **Linux** → an `.AppImage`

Run that installer like any other app. Once installed, it manages its own startup-at-login setting from the app's own Settings panel — no extra OS-level tools needed.

Note: you build the installer on the same type of operating system you're targeting (build the `.exe` on Windows, the `.dmg` on a Mac, and so on) — cross-building requires extra setup this README doesn't cover.

## Where your data lives

Everything you enter (timetable, attendance history, assignments) is saved locally in a small JSON file on your own computer — nothing is sent anywhere. You can find it at:

- **Windows**: `%APPDATA%\studypulse\studypulse-data.json`
- **Mac**: `~/Library/Application Support/studypulse/studypulse-data.json`
- **Linux**: `~/.config/studypulse/studypulse-data.json`

## Troubleshooting

- **"npm: command not found"** — Node.js isn't installed, or your terminal needs restarting after installing it.
- **Blank or missing window** — make sure `npm install` finished without errors before running `npm start`.
- **Want it in a different corner or size?** — open `main.js` and change the `x`, `y`, `width`, `height` values near the top of `createWindow()`.
=======
# Study-Pulse
855d3d93d3bd186d90fcde384a5199c92c8919ee
