### Simple Todo

Built with :

- Next.js
- Apollo (graphQL)
- Prisma
- Styles Component

https://simple-todo-pink.vercel.app/

### Run Simple Todo locally

Create a local mysql database.

Create a `.env` file at the project root.

```bash
touch .env
```

Copy the following in the `.env` file and replace the mysql connection string with your database configuration :

```text
NEXT_PUBLIC_APP_URL=https://simple-todo-pink.vercel.app/
PRISMA_MYSQL_URL=mysql://USER:PASSWORD@HOST:PORT/DATABASE
```

Initialize the database :

```bash
npx prisma migrate dev --name init
```

Then run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
