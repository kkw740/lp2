# Ass6 - Admin Login + Dashboard (UI Only)

This assignment creates a simple Admin Login page and an Admin Dashboard layout with Update/Delete options for event records (UI only, no database).

Files:

- `login.html` — Admin login form (demo credentials: admin / admin123)
- `dashboard.html` — Dashboard with KPIs and an Events table
- `styles.css` — Simple admin styling
- `script.js` — UI logic for login, edit-in-table, delete, search, and logout

## How to open

- Open `login.html` in your browser and use:
  - username: `admin`
  - password: `admin123`
- After login, you'll be redirected to `dashboard.html`.

PowerShell (optional):

```powershell
start "c:\Users\sgban\Desktop\LP_2\Ass6 Admin\login.html"
```

## What works (UI only)

- Login: stores a small flag in `localStorage` and navigates to dashboard (no real auth).
- Dashboard table: Edit turns cells into inputs; Save updates the row in the browser; Cancel reverts.
- Delete: asks for confirmation and removes the row from the page.
- Add Event: inserts a new sample event row.
- Search: filters rows by name/location.
- Logout: clears the flag and goes back to Login page.

No backend or persistence is included; actions only change the current page view, which matches the assignment requirement.
