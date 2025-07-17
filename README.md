# Booking & Accommodations App (Frontend)

> Developed by [BORISM4](https://github.com/BORISM4) and [Jimieee](https://github.com/Jimieee)

This is a test web application that connects to a public API for managing **accommodations and bookings**, available here:  
👉 [API Documentation](https://apibookingsaccomodations-production.up.railway.app/api/documentation)

The project uses **Atomic Design** principles for building the UI and follows a modular, domain-based folder structure for organization and scalability.

---

## ✨ Features

- 🔐 User authentication (login)
- 🏘️ Property listing and management
- 📅 Booking/reservation management with a calendar
- ⚙️ Organized modular architecture using `features/` and shared logic
- 💅 Reusable components: buttons, inputs, dialogs, modals, etc.

---

## 🧱 Project Structure

```
src/
├── components/         # Atomic Design: atoms, molecules, organisms, templates
├── features/           # Domain modules: auth, reservations, properties
├── routing/            # Routes and guards (auth, guest)
├── providers/          # Context and layout providers
├── lib/                # Axios setup and helpers
├── assets/             # Static files
└── ui/                 # UI primitives using Tailwind CSS
```

Each `feature/` folder includes:
- `components/`: Local reusable components
- `hooks/`: Custom hooks for logic or data fetching
- `services/`: API interaction functions
- `types/`: TypeScript interfaces and types

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/booking-app.git
cd booking-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Go to [http://localhost:5173](http://localhost:5173) to see it running.

---

## ⚙️ Tech Stack

- React + Vite + TypeScript
- React Hook Form
- Tailwind CSS
- Zod
- Axios

---

## 📄 Pages Overview

- `/login` – Authentication page
- `/dashboard` – Main dashboard 
- `/properties` – Manage properties
- `/reservations` – View and manage bookings

---

## 🧠 Design Principles

This project follows **Atomic Design** methodology:

- **Atoms:** Small elements (Button, Input, Icon)
- **Molecules:** Groups of atoms (FormField, PropertyCard)
- **Organisms:** Larger components (LoginForm, Sidebar, Calendar)
- **Templates:** Layout wrappers for entire pages
