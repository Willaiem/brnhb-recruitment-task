# brnhb-recruitment-task
 

## System Requirements
- git v2.13 or greater
- Node.js v.16.16 is recommended for Cypress support
- npm v6 or greater
- PostgreSQL v14 or greater

All of these must be available in your PATH. To verify things are set up properly, you can run this:

```
git --version
node --version
npm --version
postgres --version
```

If you have trouble with any of these, learn more about the PATH environment variable and how to fix it here for [windows](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/) or [mac/linux](http://stackoverflow.com/a/24322978/971592).

## Before installing
**IMPORTANT - this is required in order to run this project.**

### Setup the database:
Recommended tutorial: https://blog.logrocket.com/getting-started-with-postgres-in-your-react-app/

The database schema looks like this:
```sql
id  PRIMARY KEY,
name TEXT,
surname TEXT,
email TEXT,
eventdate DATE
```

### Setup the environment variables (needed for Prisma):
1. Replace the following placeholders:
- ``{my_user}`` - with the username for the admin
- ``{root}`` - with the password
- ``{5432}`` - with the default port for the database
- ``{my_database}`` - with the name of the database to connect
4. Save the configuration and proceed to the Installation step.

## Installation
1. In the root directory, run the following command:
```
pnpm i
```

This will also automatically generate the Prisma schema, needed to connect to the database.

2. Run the project by running the following command:
```
pnpm start
```
- Only backend: ```pnpm backend```
- Only frontend: ```pnpm frontend```


3. (optional) Run the tests by running the following command:
```
pnpm test
```
- Only backend: ```pnpm test:backend```
- Only frontend: ```pnpm test:frontend```
  - Cypress tests: ```pnpm test:cypress```
