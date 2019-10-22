# Bookister

### Bookister is a Library System, where the users can borrow and return books, rate them, write a review about a book they have borrowed, read all the reviews about a book and rate the reviews. The page has an administration part and only the admins can create, edit, delete a book and ban user.

### The application is written in TypeScript. The front-end part is done with Angular 7 and Bootstrap. The technologies used for the back-end are NestJS with TypeORM and MariaDB as a relational database. The authentication and authorization are working with JSON Web Token (JWT).

<br />
<br />

### Instructions for running the project:

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
   
   
<br />

<img src="https://user-images.githubusercontent.com/13811965/67276614-c14c8000-f4cd-11e9-8586-df7e7f4f3a0c.png">

<img src="https://user-images.githubusercontent.com/13811965/67276554-9feb9400-f4cd-11e9-9627-8089797e83b6.png" width="">

<img src="https://user-images.githubusercontent.com/13811965/67276716-f35de200-f4cd-11e9-87ce-4b9b54c96748.png">



<br />
<br />



    # Usage Paths

  

## For users:

#### ``POST "/users"`` = Register user.
Request body:

```bash
{
"username": string,
"password": string,
"email": string,
}
```

#### ``POST "/session"`` = Validate (Login) user.
Request body:

```bash
{
"username": string,
"password": string
}
```

#### ``DELETE "/session"`` = Terminate user token (Logout).

  
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



## For reviews:

#### ``POST "/books/:bookId/reviews"`` = create review.
Request body:

```bash
{
"rating": RatingType,
"comment": string
}
```

(RatingType is enum with the following string options: Awful / Bad / Average / Good / Excellent )


#### ``PUT "/books/:bookId/reviews/:reviewId"`` = edit review. (only the author and admin can edit)
Request body:

```bash
{
"rating": RatingType,
"comment": string
}
```

(RatingType is enum with the following string options: Awful / Bad / Average / Good / Excellent )

#### ``DELETE "/books/:bookId/reviews/:reviewId"`` = delete review. (only the author and admin can delete)





