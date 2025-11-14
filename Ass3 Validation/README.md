# Ass3 - Event Registration (JavaScript Validation)

This assignment adds client-side validation for Name, Email, and Mobile Number.

Files:

- `index.html` — Simple form with three fields
- `styles.css` — Basic styling and error/success states
- `script.js` — JavaScript validation logic

## Validation rules

- Name: required, letters and spaces only, at least 2 characters
- Email: required, must look like name@example.com
- Mobile: required, exactly 10 digits (non-digits are ignored during check)

## How to open

- Double-click `index.html` to open in your browser, or run:

```powershell
start "c:\Users\sgban\Desktop\LP_2\Ass3 Validation\index.html"
```

## How it behaves

- Errors show just below inputs; fields turn red until corrected.
- On success, the form shows a green success message and resets.
- This is a demo only; no data is sent anywhere.
