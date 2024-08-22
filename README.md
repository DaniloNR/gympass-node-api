# Gympass Node API

<!-- BADGES_START -->
${BADGES_CONTENT}
<!-- BADGES_END -->

<!-- 
[![Node.js](https://img.shields.io/badge/Node.js-20.11.24-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Fastify](https://img.shields.io/badge/Fastify-4.26.2-blue?style=flat-square&logo=fastify)](https://www.fastify.io/)
[![Prisma](https://img.shields.io/badge/Prisma-5.10.2-orange?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Vitest](https://img.shields.io/badge/Vitest-1.3.1-red?style=flat-square)](https://github.com/vitejs/vitest)
[![supertest](https://img.shields.io/badge/supertest-6.3.4-orange?style=flat-square)](https://github.com/visionmedia/supertest)
[![bcryptjs](https://img.shields.io/badge/bcryptjs-2.4.3-blue?style=flat-square)](https://github.com/dcodeIO/bcrypt.js)
[![dayjs](https://img.shields.io/badge/dayjs-1.11.10-yellow?style=flat-square)](https://github.com/iamkun/dayjs)
[![Zod](https://img.shields.io/badge/Zod-3.22.4-green?style=flat-square)](https://github.com/colinhacks/zod)
[![eslint](https://img.shields.io/badge/eslint-8.57.0-blue?style=flat-square&logo=eslint)](https://eslint.org/)
[![dotenv](https://img.shields.io/badge/dotenv-16.4.5-yellow?style=flat-square)](https://github.com/motdotla/dotenv)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-5.10.2-blue?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-25.0.3-blue?style=flat-square&logo=docker)](https://www.docker.com/)
[![pnpm](https://img.shields.io/badge/pnpm-8.9.2-blue?style=flat-square&logo=pnpm)](https://pnpm.io/)
-->
**gympass-node-api** is a Node.js API designed to manage users' gym memberships
across multiple gyms. It is built entirely in TypeScript and utilizes SOLID
principles on its implementation.

## Getting Started

1. Clone this repo:

```sh
$ git clone https://github.com/DaniloNR/gympass-node-api.git
```

2. Then go to the project's folder:

```sh
cd gympass-node-api
```

3. Before running anything, make sure you are using node v20

```sh
nvm use 20
```

4. Install all dependencies:

```sh
pnpm install
```

5. Start the docker container for the database:

```sh
docker compose up -d
```

Note: -d refers to "detach" so the process will keep running even if the terminal is closed.

If you want to stop the container just run:

```sh
docker compose stop
```

6. Run migrations:

```sh
pnpm migrate
```

7. Generate prisma types:

```sh
pnpm generate:types
```

8. Run locally:

```sh
pnpm start:dev
```

## Workflows

There are two workflows configured on this repository for running tests

- **E2E Testing:** `.github/workflows/e2e-testing.yml` triggers on any `pull_request`
- **Unit Testing:** `.github/workflows/unit-testing.yml` triggers on any `push`

## Dependabot

There is a additional workflow configured on this repository, the dependabot.

A .npmrc is setup containing a rule to prevent any package from being updated
when running a `> pnpm install`, instead, the updates are performed by dependabot
on GitHub through pull requests weekly. If the tests pipelines pass, you can merge
to update the dependencies.

## SOLID Principles

The project is built using the SOLID principles, which are:

- Single Responsibility Principle
- Open/Closed Principle
- Liskov Substitution Principle
- Interface Segregation Principle
- Dependency Inversion Principle

## Testing

All you need to test the application is to run the scrips on `package.json`

Unit tests:

```sh
pnpm test
```

E2E tests:

```sh
pnpm test:e2e
```

if you want to run on watch mode, just add `:watch` on the script and run.

### Vitest-environments

Vitest-environments is utilized for handling end-to-end tests by creating a
new schema on PostgreSQL before the test runs and destroying it after.

The environment configuration can be found on `vitest-environments/prisma.ts`

## Functional Requirements

- User registration must be possible;
- User authentication must be possible;
- It must be possible to retrieve the profile of a logged-in user;
- It must be possible to retrieve the number of check-ins performed by the logged-in user;
- It must be possible for the user to retrieve their check-in history;
- It must be possible for the user to search for nearby gyms up to 10km;
- It must be possible for the user to search for gyms by name;
- It must be possible for the user to check-in at a gym;
- User check-in must be validated;
- It must be possible to register a gym;

## Business Rules

- The user must not be able to register with a duplicate email;
- The user cannot make 2 check-ins on the same day;
- The user cannot check-in if not near (100m) the gym;
- Check-in can only be validated up to 20 minutes after it is created;
- Check-in can only be validated by administrators;
- The gym can only be registered by administrators;

## Non-functional Requirements

- User password needs to be encrypted;
- Application data needs to be persisted in a PostgreSQL database;
- All data lists need to be paginated with 20 items per page;
- User must be identified by a JWT (JSON Web Token);

## License

[MIT License](http://zenorocha.mit-license.org/) © Danilo Nogueira

## Open Source

Feel free to clone this repo and use the way you want it!
