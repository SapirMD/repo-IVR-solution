# repo-IVR-solution
 IVR solution with both Twilio and Commio


# Node.js + TypeScript Project

## 🚀 Getting Started

Follow these steps to run the project:

### 1. Clone the Repository

```bash
git clone https://github.com/SapirMD/repo-IVR-solution.git
cd repo-IVR-solution
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Compile TypeScript
To compile the TypeScript code:
```
npm run build
```
This will:
1. Delete the old dist/ folder using rimraf
2. Compile the TypeScript files into dist/ using tsc

### 4. Run the Project
To build and run the app:
```bash
npm start
```
This will:
1. Clean the dist/ folder
2. Compile the TypeScript code
3. Run the compiled output with Node.js


### 🧹 Clean the Build Output
To manually delete the dist/ folder:
```
npm run clean
```
---

## 📄 Notes

- Make sure you have a valid `tsconfig.json` file in the root directory.
- You can store environment variables in a `.env` file.

---

## 🛠 Example `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "moduleResolution": "bundler",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "types": ["vitest"],
    "baseUrl": ".", 
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src", "tests", "examples"]
}

```
