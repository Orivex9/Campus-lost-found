# Campus Lost & Found — FoCP CSE-1003

A small campus lost-and-found board. The core item validation and item storage are written in **C** (`main.c`). GitHub Actions compiles the C program to WebAssembly using Emscripten; the HTML/CSS/JavaScript provide the browser interface. Reports are saved in the visitor's browser using localStorage.

## Before submitting
1. Edit `index.html` and replace `YOUR NAME` and `YOUR SCHOLAR NUMBER`.
2. Create a GitHub account if you do not already have one.
3. Create a **public** repository named `campus-lost-found`.
4. Upload all project files and folders to the repository. Keep `.github/workflows/deploy.yml`.
5. In repository **Settings → Pages**, set the build source to **GitHub Actions**.
6. Open the **Actions** tab. Wait for “Build and deploy Campus Lost and Found” to finish with a green check.
7. Open **Settings → Pages** to find the live website URL.
8. Open the URL in a private/incognito window and test adding a Lost report, a Found report, searching, and filtering.

## Important
- This is a classroom demonstration, not a secure production service.
- Reports are stored in each visitor's own browser, not shared between different students/devices. A shared campus board would need a hosted database and access controls.
- Use test contact details in screenshots/demos. Do not publish private phone numbers or sensitive information.
