# gg-final-project

this repo contains the finalterm for Generasi Gigih 3.0.
it's just the frontend code, the backend code is in [this repo](https://github.com/carlesoctav/gg-midterm)

## Project tree

- [postcss.config.js](./postcss.config.js)
- [tailwind.config.js](./tailwind.config.js)
- [package-lock.json](./package-lock.json)
- [package.json](./package.json)
- [vite.config.js](./vite.config.js)
- [generateTree.sh](./generateTree.sh)
- [src](./src)
  - [style.css](./src/style.css)
  - [components](./src/components)
    - [Navbar.jsx](./src/components/Navbar.jsx)
    - [Notification.jsx](./src/components/Notification.jsx)
    - [pages](./src/components/pages)
    - [Details](./src/components/pages/Details)
      - [ProductCard.jsx](./src/components/pages/Details/ProductCard.jsx)
      - [CommentCard.jsx](./src/components/pages/Details/CommentCard.jsx)
      - [Details.jsx](./src/components/pages/Details/Details.jsx)
      - [CommentForm.jsx](./src/components/pages/Details/CommentForm.jsx)
    - [Auth](./src/components/pages/Auth)
      - [Logout.jsx](./src/components/pages/Auth/Logout.jsx)
      - [Login.jsx](./src/components/pages/Auth/Login.jsx)
      - [Signup.jsx](./src/components/pages/Auth/Signup.jsx)
    - [Home](./src/components/pages/Home)
      - [Home.jsx](./src/components/pages/Home/Home.jsx)
    - [Populate](./src/components/pages/Populate)
    - [Populate.jsx](./src/components/pages/Populate/Populate.jsx)
  - [App.jsx](./src/App.jsx)
  - [index.html](./src/index.html)
  - [services](./src/services)
  - [login.jsx](./src/services/login.jsx)
  - [populate.jsx](./src/services/populate.jsx)
  - [video.jsx](./src/services/video.jsx)
- [README.md](./README.md)

## How to run locally

Before running the frontend, you need to run the backend first. You can find the instructions [here](https://github.com/carlesoctav/gg-midterm). If everything is done correctly, the backend will be hosted on port 3001, and we will host the frontend on port 5173.

1. clone this repository

```bash
git clone https://github.com/carlesoctav/gg-finalterm.git
```

2. run `npm install`
3. run `npm run dev` to start the development server
4. open `localhost:5173` in your browser

## Deployment Repository

check [deploy-env branch](https://github.com/carlesoctav/gg-finalterm/tree/deploy-env) for the deployment-ready repository

## Some caveat in deployment

1. Since it's a client-side rendering, you will get a 404 error if you refresh the page. Later, I will add server-side rendering to fix this.

2. The `Populate` feature on the navbar will not work in the deployed version. I don't know why this is the case since I have tested it locally, and it works fine. I will investigate this further.
