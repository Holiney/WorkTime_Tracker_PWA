# 🕒 WorkTime Tracker

> A clean and intuitive time tracking app for freelancers, workers, and anyone who wants to log hours and calculate earnings 💸

---

## 🚀 What’s New in Version 2.0.0

- ✅ Fully redesigned UI using **Tailwind CSS**
- 💾 Persistent data with `localStorage` (user & work items)
- 🔐 Protected routing: `/dashboard` only accessible when logged in
- 📊 Track total hours and income (Paid / Unpaid)
- 📅 Switch between **weekly** and **monthly** grouping
- 🧍‍♂️ Profile editing with avatar selection
- 🧼 Modular architecture using Layouts, Context API, Reducer

---

## ⚙️ Tech Stack

- **React 18** + **Vite**
- **React Router v6 (Data Router)**
- **Tailwind CSS** for styling
- **Context API** with `useReducer` for state management
- `localStorage` for persistent state

---

## 🛠 How to Run Locally

```bash
# Clone the repo
git clone https://github.com/yourusername/WorkTime_Tracker.git
cd WorkTime_Tracker

# Install dependencies
npm install

# Start the development server
npm run dev
