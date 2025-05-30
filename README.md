## Nextjs PostgreSQL CRUD

![Banner](./banner.png)

This is a web application CRUD using Nextjs, Typescript and Pg (npm module) driver for PostgreSQL, and for style the interface this project is using semantic-ui-react.

### Requeriments

In order to execute this project you must have:

* Nodejs installed
* **Postgresql**, You need postgresql running, you can see the sql table, in `/database/db.sql`

### Installation for local development

```
git clone https://github.com/FaztWeb/nextjs-postgres-crud-typescript
cd nextjs-postgres-crud-typescript
npm install
npm run dev
```

### Installation for production
```
git clone https://github.com/FaztWeb/nextjs-postgres-crud-typescript
cd nextjs-postgres-crud-typescript
npm install
npm run build
npm start
```

> you need to add the following environment variables to your `.env` file:

```
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgres
```

### PostgreSQL with Docker

In my case I'm using postgresql and PgAdmin trough docker-compose. You use it with this command:

```
docker-compose app
```

and then you can visit: http://localhost:80 to see the interface

Read the docker-compose file to know more.