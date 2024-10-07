# 🌟 **Monorepo** 🌟

### Version 1.0.0

Welcome to the **freelance app** project, built using **Next.js** (⚛️ React for Web) and **Expo** (📱 React Native for Mobile). This monorepo helps manage both the web and mobile applications, providing a unified workflow for development. 🚀

---

## 📥 **Installation**

Before you get started, ensure that all dependencies are installed! Follow the steps below:

### 1️⃣ Install all dependencies for both web and mobile apps:

```bash
npm run install:all
```

💡 **What it does**:

-   🔥 Cleans up the `node_modules` folders (root, web, and mobile).
-   📦 Installs dependencies for both applications.

### 2️⃣ Install dependencies for specific applications:

-   🌐 **Web app** only:

```bash
npm run install:web
```

-   📱 **Mobile app** only:

```bash
npm run install:mobile
```

---

## 🛠️ **Development**

Let's start building! You can run either the web or mobile app in development mode:

-   **Run mobile app** in Expo development mode:

```bash
npm run dev:mobile
```

➡️ Expo will launch, and you can run your app on a simulator or real device.

-   **Run web app** in Next.js development mode:

```bash
npm run dev:web
```

➡️ The web app will be available at `http://localhost:3000`.

---

## 🧹 **Cleaning Dependencies**

Want to start fresh? You can clean up all `node_modules` by running:

```bash
npm run clean
```

This will:

-   🧽 Remove `node_modules` from the root project.
-   🧽 Remove `node_modules` from `apps/web` and `apps/mobile`.

---

Enjoy building your freelance app! 💼✨

---
