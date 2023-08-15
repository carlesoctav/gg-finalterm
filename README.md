# gg-final-project

this repo contains the finalterm for Generasi Gigih 3.0.
it's just the frontend code, the backend code is in [this repo](https://github.com/carlesoctav/gg-midterm)

## Deplyoment

To deploy the frontend, simply add the URL of your deployed backend to the `.env` file as `VITE_backend`. For example, if you deploy your backend on Heroku, you can add `https://your-app-name.herokuapp.com` to the `.env` file. After that, run `npm run build` and deploy the `dist` folder to your favorite static hosting.

## Some caveat in deployment

1. Since it's a client-side rendering, you will get a 404 error if you refresh the page. Later, I will add server-side rendering to fix this.

2. The `Populate` feature on the navbar will not work in the deployed version. I don't know why this is the case since I have tested it locally, and it works fine. I will investigate this further.
