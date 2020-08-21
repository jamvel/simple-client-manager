# Firebase-Next.js-SimpleClientManager

A simple client manager built with Next.js, Redux, Firebase Cloud Functions and Firestore

## Firebase API

The firebase API code is located in the functions folder.\
**A service-account.json file is required to be placed in the root of the function directory, so that it connects to Firestore Services**

To serve the firebase API locally run :
```bash
npm run serve
```

## App
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Enivronment
Environment variables are located inside next.config.js (which contains all configuration, including aliases).The next.config file imports another file called **endpoints.js** which contains all the endpoint urls to the Firebase API

### Dev
To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

Firstly, run the build script to generate the build files

```bash
npm run build
```

### Serve

Serve the build files via:

```bash
npm run start
```
