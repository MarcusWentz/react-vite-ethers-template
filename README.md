# react-vite-ethers-template 

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Generate Vite React Project Template

```shell
npm create vite@latest
```

## Install npm packages

```shell
npm i
```

## Run website locally for testing

```shell
npm run dev
```

## GitHub Pages React Vite Guide

https://github.com/ErickKS/vite-deploy

🔴 Warning 🔴

In package.json the build command was modified from:

```json
"build": "tsc -b && vite build",
```

to:
```json
"build": "vite build",
```

in order to ignore Typescript errors at build time for GitHub pages.

Test build locally with:

```shell
npm run build
```

🔴 Warning 🔴

If you get the error:

```shell
Push the commit or tag
  /usr/bin/git push origin gh-pages
  remote: Permission to REPO denied to github-actions[bot].
  fatal: unable to access 'REPO': The requested URL returned error: 403
  Error: Action failed with "The process '/usr/bin/git' failed with exit code 128"
```

Try this to fix the issue:

You have to configure your repository:
```
Settings -> Action -> General -> Workflow 
```
permissions and choose 
`read and write permissions`

https://stackoverflow.com/a/75175628