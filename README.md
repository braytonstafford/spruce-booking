# Spruce booking app

## Install dependencies

```
$ cd api/
$ npm install
$ cd ../client
$ npm install
```

-or-

```
$ cd api/
$ yarn
$ cd ../client
$ yarn
```

## Run in development

```
$ npm run dev
```

-or-

```
$ yarn dev
```

## Run tests

```
$ npm run test
```

-or-

```
$ yarn test
```

## Run in docker

```
$ docker-compose up --build
```

# Desing Specifications

Our internal operations team would like a basic web app that lets them view and create customer bookings. Your requirements are below - how you approach them is up to you. Feel free to add as much (or as little) context as you'd like explaining your decisions. When you submit, be sure all files are committed to the repo.

## 🖥 Booking UI

- Should match the attached mockups
- Should use a modern JS framework (we use React, but use whatever is most comfortable for you)
- Should support creating and displaying two types of bookings
  - Housekeeping
  - Dog walks
- Should let the user create a new booking and require the following data
  - Email
  - Name
  - Address
  - Booking Type (housekeeping, dog walk)
  - Booking Date
  - Booking Time
- Should list bookings in ascending order by date

## 🧰 Booking API

- Should communicate with a MySQL database
  - You can create a free hosted db here: https://remotemysql.com/
  - Database design is up to you
- Should have two endpoints
  - getBookings (GET)
    - Should respond with all bookings in ascending order by date
  - createBooking (POST)
    - Should accept a JSON object with the following data, and create a booking:
      - Email
      - Name
      - Address
      - Booking Type (housekeeping, dog walk)
      - Booking Date
      - Booking Time

## 💯 Bonus points

- Seed the db with bookings (100) and add pagination (20 items per page)!
- Add functionality to filter by Booking Type!
- Add TypeScript support!
- Add unit tests!
- Add a build/deploy pipeline and a link to your hosted solution!
