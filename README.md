# Fan Event Schedule
Schedule application for fan events

Built on Laravel REST API backend with a ReactJS frontend.
Styled using Google's Material Design via MaterializeCSS.

## Requirements
* MySQL/MariaDB Server
* PHP >= 7.2.0
* PHP Extensions: BCMath, Ctype, JSON, Mbstring, OpenSSL, PDO, Tokenizer, XML
* Composer
* NodeJS

## Installation
1. Clone repository into folder
2. Install composer modules
   * Development: `composer install`
   * Production: `composer install --no-dev --optimize-autoloader`
3. Install node modules
   * `npm install`
   * Development: `npm run dev` or `npm run watch`
   * Production: `npm run prod`
4. Change `.env.example` file into `.env`
5. Update entries within the `.env` file to match database and other information
6. Generate a new key
   * `php artisan key:generate`
7. Create database tables
   * `php artisan migrate`
8. Generate encryption keys for API Auth
   * `php artisan passport:install`
9.  Create user account by sending register email and password to api url
   * Send `email`, `password`, `c_password` to `/api/register` via POST form-data

## To-Do

### Admin-Side
- Pages
  - Add/Edit/Remove Locations
  - Maps
    - Add Map
    - Edit Map Name
    - Remove Map

### Public-Side
- My Schedule
  - Ability to add events to personal schedule
    - Probably use localStorage to store

## Finished
- ~~Buy Tickets (External Link)~~
- ~~Home Page~~
- ~~Schedules~~
  - ~~Grid Layout~~
  - ~~List Layout~~
  - ~~Layout Switcher~~
- ~~Social Media Links~~
- ~~Exhibitors~~
- ~~Rules & Polcies~~
- ~~Guests~~
  - ~~List by Type~~
  - ~~Single View~~
- ~~Login Functiionality~~
- ~~Maps~~
- Admin-Side
  - ~~Home Page~~
  - ~~Guests~~
    - ~~Add Guest~~
    - ~~Edit Guest~~
    - ~~Remove Guest~~
  - ~~Event~~
    - ~~Add Event~~
    - ~~Edit Event~~
    - ~~Remove Event~~
  -  ~~Exhibitors~~
    - ~~Add Exhibitor~~
    - ~~Edit Exhibitor~~
    - ~~Remove Exhibitor~~
  - ~~Rules~~
    - ~~Add Rule~~
    - ~~Edit Rule~~
    - ~~Remove Rule~~