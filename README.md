# Bookister

Bookister is a Library System, where the users can borrow and return books, rate them, write a review about a book they have borrowed, read all the reviews about a book and rate the reviews.

## Instructions for running the project:

* Create two files in api/src
    * .env

    ```
    PORT=3000
    JWT_SECRET=VerySecr3t!
    JWT_EXPIRE=3600
    DB_TYPE=mysql
    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=root
    DB_PASSWORD=root
    DB_DATABASE_NAME=bookister
    ```
    
    * ormconfig.json

    ```
    {
        "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": "root",
        "password": "root",
        "database": "bookister",
        "entities": ["./src/**/*.entity{.ts,.js}"],
        "synchronize": true,
        "migrationsTableName": "custom_migration_table",
        "migrations": [
            "src/data/migration/**/*.ts"
        ],
        "cli": {
            "entitiesDir": "src/data/entities",
            "migrationsDir": "src/data/migration"
        }
    }

    ```
    
    # Usage Paths

  

## For users:

#### ``POST "/users"`` = Login / Register user.
Request body:

```bash
{
"username": string,
"password": string,
"email": string,
}
```

#### ``POST "/session"`` = Validate user.
Request body:

```bash
{
"username": string,
"password": string
}
```

#### ``DELETE "/session"`` = Terminate user token.

  
## For books:

#### ``GET "/books"`` = get all books.

#### ``POST "/books"`` = create a book. (only admins are authorized!)
Request body:

```bash
{
"title": string,
"author": string,
"topic": string,
"language": string,
"averageRating": string,
}
```

(averageRating will be deleted from here later)


#### ``PUT "/books/:bookId"`` = edit a book. (only admins are authorized!)
Request body:

```bash
{
"title": string,
"author": string,
"topic": string,
"language": string,
"averageRating": string,
}
```

(averageRating will be deleted from here later)


#### ``DELETE "/books/:bookId"`` = delete a book. (only admins are authorized!)

