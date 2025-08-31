# Promoin - Project

![Promoin Banner](./docs/promoin-banner.png)

A modern frontend application for **Promoin**, built with **Next.js**, **TailwindCSS**, **HeroUI**, **Ant Design**, and **Zod** for form validation. This app consumes the Promoin REST API to manage users, promotions, and authentication.

# Promoin

![Node.js version](https://img.shields.io/badge/node-22.18.0-blue?style=flat-square&logo=node.js)
![React version](https://img.shields.io/badge/react-19.1.0-61dafb?style=flat-square&logo=react)
![Next.js version](https://img.shields.io/badge/next.js-15.5.2-black?style=flat-square&logo=next.js)
![TailwindCSS version](https://img.shields.io/badge/tailwindcss-4-blue?style=flat-square&logo=tailwind-css)
![Ant Design](https://img.shields.io/badge/AntDesign-5.10-purple?logo=ant-design)
![Zod](https://img.shields.io/badge/Zod-3.24-yellow)
![License](https://img.shields.io/badge/license-private-lightgrey?style=flat-square)

---

## 🎯 Project Overview

Promoin Frontend is designed to provide a **user-friendly web interface** for interacting with the Promoin backend. Users can:

- Authenticate using email & password
- Complete onboarding flow
- Register and manage their profile
- Experience a responsive, modern UI

### ✨ Key Features

- **🖥️ Responsive UI**: Built with TailwindCSS and HeroUI components
- **⚡ Fast Performance**: Next.js server-side rendering & optimized builds
- **🛠️ Component Library**: Ant Design for forms, tables, modals, and more
- **🧩 Form Validation**: Zod schemas for reliable input validation
- **🔄 API Integration**: Connects seamlessly with Promoin REST API
- **🎨 Dark & Light Theme**: Toggleable theme support

---

## 📁 Project Structure

```
public/                     # Static assets
src/
├── app/
│   ├── login/              # Login page and components
│   ├── onboarding/         # Onboarding flow pages
│   ├── register/           # Registration page and components
│   ├── favicon.ico
│   ├── globals.css         # Global Tailwind and custom CSS
│   ├── hero.ts             # HeroUI theme/config
│   ├── layout.tsx          # Main layout
│   ├── page.tsx            # Home page
│   └── providers.tsx       # App providers and context
├── components/             # Shared UI components (buttons, cards, modals, forms)
├── .gitignore
├── README.md
├── next.config.ts
└── package-lock.json
```

---

## 🚀 Installation

### Prerequisites

- Node.js 20+
- npm or yarn

### Local Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/royhairul/JD_024-RoyHairul-Promoin.git
   cd JD_024-RoyHairul-Promoin
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment configuration**
   Copy `.env.example` to `.env.local` and update values:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

4. **Run development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**

   ```
   http://localhost:3000
   ```

---

## 🔑 Key Pages & Features

### Authentication

- `/login` → Login with email & password
- `/register` → Register new user
- `/onboarding` → Complete onboarding flow
- Protected routes redirect to login if unauthenticated

### Shared Components

- Buttons, modals, forms, cards (in `components/`) for reusability
- Integrated with Ant Design and HeroUI

---

## 🧩 Form Validation with Zod

All forms use **Zod** schemas for validation:

```ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
```

Forms are integrated with **React Hook Form** for seamless validation and error display.

---

## 🔧 Configuration

| Variable              | Description                | Required | Default |
| --------------------- | -------------------------- | -------- | ------- |
| `NEXT_PUBLIC_API_URL` | Base URL for backend API   | Yes      | -       |
| `NEXT_PUBLIC_THEME`   | Light or dark mode default | No       | light   |

---

## 📦 Deployment

### Production Build

```bash
npm run build
npm run start
```

The app will be served on `http://localhost:3000` (or configured PORT).

---

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using [Next.js](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/), [HeroUI](https://heroui.dev/), [Ant Design](https://ant.design/), and [Zod](https://zod.dev/).
