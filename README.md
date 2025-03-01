# Introduction

This is app for maintain all libraries and user can maintain and also do some transaction in it. Also, it's mono repo, the repo contains:

- Back-End (`server`)
- Front-End (`client`)

## How To Install

Get [Bun](https://bun.sh/). After installing, follow this steps:

Install deps for root dir, run:

```shell
bun install
```

Install deps for server dir, run:

```shell
cd ./server && bun install
```

## Migrate data

Go to root dir, run:

```shell
bun run seed:all
```

## How to run the app

Go to root dir, run:

```shell
bun run dev
```

If you want to directly running the server (not-recommended)

```shell
cd ./server && bun run dev
```
