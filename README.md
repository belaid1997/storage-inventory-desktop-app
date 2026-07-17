# Storage & Inventory Manager

A standalone desktop application built using a hybrid architecture: a secure **Spring Boot** backend,
an interactive **React** frontend web view, and an embedded **H2 Database**, all wrapped seamlessly inside a native **JavaFX** desktop window.

---

## 🚀 Key Features
* **Native Desktop Shell:** Runs as a standard desktop window via JavaFX `WebView`, bypassing the need for a separate web browser.
* **Embedded Database:** Uses an internal H2 database file engine, requiring zero external database installations.
* **Secure Authentication:** Features custom Spring Security filters and JWT-based authentication.
* **Production Installer:** Pre-configured to build into a standalone Windows `.exe` installer via `jpackage`.

---

## 🛠️ Tech Stack
* **Backend:** Java 21, Spring Boot, Spring Security, H2 Database
* **Frontend:** React, TailwindCSS, Axios
* **Desktop Wrapper:** JavaFX 21 (Controls & Web Engine)
* **Build System:** Maven

---

## 💻 Getting Started (Development Mode)

### Prerequisites
* Java 21 JDK installed
* Maven installed
* Node.js & npm (if running frontend separately during active UI development)

### Running the App from Terminal
To build the complete package and boot up the background server alongside the JavaFX desktop view, run:

```bash
mvn clean package -DskipTests
java -jar .\target\Storage_App.jar
```

## Default Credentials
To log into the system dashboard for the first time, use the default mock administrator account:

Username: admin

Password: admin123

## 📦 Creating the Native Windows Installer (.exe)
The project is fully prepared to compile into a lightweight, standalone Windows installer utilizing JDK 21's native jpackage tool.

1. Requirements
WiX Toolset v3 must be installed and added to your Windows Environment PATH.

2. Packaging Steps
Clean and build the production jar:

Bash
mvn clean package -DskipTests
Copy your compiled Storage_App.jar from the /target directory into a clean staging folder named /installer-input.

Open PowerShell at your project root and execute the jpackage compilation script:

PowerShell
```bash
jpackage `
  --type exe `
  --input ./installer-input `
  --dest ./dist `
  --name "StorageManager" `
  --main-jar Storage_App.jar `
  --main-class com.example.stack.StorageAppApplication `
  --win-dir-chooser `
  --win-shortcut `
  --win-menu `
  --vendor "YourCompany" `
  --description "Inventory and Storage Management System"
```
Find your completed setup file waiting inside the \dist folder as StorageManager.exe.

## 📂 Project Directory Architecture
```text
├── src/main/front/storage-frontend/     # React source code (Axios API services & Zustand state management)
├── src/main/java/.../security/       # Custom Spring Security configuration, CORS, and JWT rules
├── src/main/java/.../controller/     # REST Controllers and authentication endpoints (/api/auth)
├── src/main/java/.../UiApplication.java # JavaFX environment initialization and main window context
└── src/main/resources/static/        # Production-compiled React frontend buil
```
