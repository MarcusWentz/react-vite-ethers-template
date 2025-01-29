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

In package.json the build command was modified from 

```json
"build": "tsc -b && vite build",
```

to:
```json
"build": "vite build",
```

in order to ignore Typescript errors at build time for GitHub pages.
