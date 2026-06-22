# TrendWave 🏍️

A full-stack e-commerce web application for browsing, purchasing, and 
reviewing motorbikes/bike accessories, with separate Admin and User experiences.

## Tech Stack
**Frontend:** Angular, TypeScript, HTML, CSS
**Backend:** Java 17, Spring Boot 3.0.1, Spring Security, Spring Data JPA
**Database:** MySQL
**Auth:** JWT (jjwt)
**Build tools:** Maven (backend), Angular CLI/npm (frontend)
**CI:** GitHub Actions

## Features
- User registration & login (JWT-secured)
- Role-based access — Admin vs. User dashboards
- Admin: create/update/delete products, view all reviews
- User: browse products, add to cart, checkout, place orders
- Order history per user (`/api/orders/user/{userId}`)
- Product reviews & ratings (per product / per user)
- Global exception handling with custom error responses

## Project Structure
TrendWave/
├── angularapp/        # Angular frontend
│   └── src/app/
│       ├── components/   # login, signup, product views, cart, checkout, reviews...
│       ├── services/      # auth, product, cart, order, review, user
│       └── models/
├── springapp/          # Spring Boot backend
│   └── src/main/java/com/examly/springapp/
│       ├── config/        # JWT + Spring Security config
│       ├── controller/    # AuthController, ProductController, OrderController, ReviewController
│       ├── model/         # User, Product, Order, OrderItem, Review
│       ├── repository/
│       ├── service/
│       └── exceptions/
└── .github/workflows/  # CI pipeline

## Prerequisites
- Node.js + Angular CLI
- JDK 17, Maven
- MySQL Server running locally

### Backend
cd springapp
# update src/main/resources/application.properties with your MySQL creds
./mvnw spring-boot:run


### Frontend
cd angularapp
npm install
ng serve


## API Endpoints (sample)
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/register | Register a new user |
| POST | /api/login | Login, returns JWT + role |
| GET/POST/PUT/DELETE | /api/products | Product CRUD |
| GET/POST/PUT/DELETE | /api/orders | Order management |
| GET | /api/orders/user/{userId} | Orders for a user |
| GET/POST/DELETE | /api/reviews | Review management |
| GET | /api/reviews/product/{productId} | Reviews for a product |

## Environment Variables / Config
- `spring.datasource.url`, `username`, `password` — MySQL connection (currently hardcoded in `application.properties` — should be externalized for production)
- JWT secret/expiry — in `JwtUtils`/`JwtHelper`

## Testing
ng test          # Angular unit tests (Karma/Jasmine)
./mvnw test       # Spring Boot unit/integration tests

## CI/CD
GitHub Actions workflow in `.github/workflows/build.yml` builds the project on push.

## License


