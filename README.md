# Gympass Node API

**gympass-node-api** is a Node.js API designed to manage users' gym memberships
across multiple gyms. It is built entirely in TypeScript and utilizes SOLID
principles on its implementation.

## Technologies Used

- **Node.js**: Main runtime environment
- **Fastify**: Main framework
- **Prisma**: ORM (Object-Relational Mapping)
- **Vitest**: Unit and E2E testing
- **supertest**: HTTP request testing
- **bcryptjs**: Password hashing
- **dayjs**: Date calculation
- **Zod**: Validation library
- **eslint**: Code linting
- **dotenv**: Environment variable management

## Database

- **PostgreSQL**: Relational database system
- **Docker**: Containerization
- **In-memory database**: For unit testing

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

4. Generate prisma types:

```sh
pnpm generate:types
```

6. Run locally:

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
