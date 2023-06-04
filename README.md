# Simple Rest API - Masangkay

This is a simple web application built with Laravel and ReactJS. The application allows users to create users, orders, and display a list of orders with order count.

## Tech Requirements

To run this application locally, you need to have the following software installed:

- PHP (version 7.4 or higher)
- Composer
- Node.js (version 14 or higher)
- npm (Node Package Manager)

## Installation

Follow these steps to install and run the application:

1. Clone the repository:
```
git clone https://github.com/ugemasangkay/simple-rest-api.git
```

2. Navigate to the project directory:
```
cd simple-rest-api/
```

3. Install PHP dependencies:
```
composer install
```

4. Install JavaScript dependencies:
```
npm install
```

5. Create a copy of the .env.example file and rename it to .env. Update the necessary environment variables such as database credentials.

Env variable value used:
```
APP_NAME="Simple Rest API"
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

6. Generate an application key:
```
php artisan key:generate
```

7. Run the database migrations and seed the database:
```
php artisan migrate --seed
```

8. Compile the assets:
```
npm run dev
```

9. Start the local development server:
```
php artisan serve
```

10. Open your browser and visit http://localhost:8000 to access the application.


## Features
- Create users with their name.
- Create orders with date and total value.
- Display a list of orders with the sum of order total value.

## Directory Structure

The important directories and files in this project are:

- `app/`: Contains Laravel application files, including models, controllers, and routes.
- `resources/`: Contains frontend assets, including React components, views, and styles.
- `database/migrations/`: Contains database migration files.
- `database/seeds/`: Contains database seeder files.
- `routes/`: Contains Laravel route definitions.
- `public/`: Contains the compiled assets and the main entry point `index.php`.
- `.env`: The environment configuration file.
- `README.md`: This file.

## API List

| Description              | Method   | URI                 | CURL Request                                              |
|--------------------------|----------|---------------------|-----------------------------------------------------------|
| Create a user            | POST     | api/users           | `curl -X POST http://localhost:8000/api/users -H "Content-Type: application/json" -d '{"name": "John Doe"}'` |
| Create an order          | POST     | api/orders          | `curl -X POST http://localhost:8000/api/orders -H "Content-Type: application/json" -d '{"date": "2023-06-05", "total_value": 100, "user_id": 123}'` |
| Get all users            | GET | api/users           | `curl http://localhost:8000/api/users`                    |
| Get user by id and returns all orders     | GET | api/users/{userId}  | `curl http://localhost:8000/api/users/1`                  |
| Update user detail by ID     | PUT | api/users/{userId}  | `curl -X PUT https://localhost:8000/api/users/1 -H "Content-Type: application/json" -d '{"name": "NEW_NAME"}'`
`                  |

## Tech Stack

- PHP 7.4.33
- Laravel 8.75
- React 18.2.0
- NPM 9.6.1
- Composer 2.5.7
- PostgreSQL 15.3

## Author

> Eugene Masangkay (ugemasangkay@gmail.com)

## License

This application is open-source and is licensed under the [MIT License](https://opensource.org/licenses/MIT).
