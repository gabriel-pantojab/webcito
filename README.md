# Webcito

This project was generated using Angular and Electron.

## Development server

To start a local development server, run:
```bash
npm run dev
```

This will start both Angular and Electron in development mode. The application will automatically reload whenever you modify any of the Angular source files.

## Building

### Electron

To build Electron files in **production mode** (default), run:
```bash
npm run build:electron
```

Alternatively, you can use these dedicated scripts:
```bash
# Development build
npm run dev:build:electron
```

```bash
# Production build
npm run prod:build:electron
```

The compiled files will be stored in the `dist-electron/` directory.

### Angular

To build the Angular application, run:
```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory.

### Full Build

To build the entire project (Angular + Electron) in production mode, run:
```bash
npm run build
```

This script builds both Angular and Electron for production.

## Packaging

To package the application for distribution on Windows, run:
```bash
npm run dist:win
```

This script will:
1. Transpile Electron files in production mode
2. Build the Angular application
3. Create a Windows executable (x64) in the `dist/` directory
