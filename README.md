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

```bash
npx tsc
```

This will generate the output in the `dist/` folder.

### 4. Run the Project

```bash
node ./dist/index.js
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
