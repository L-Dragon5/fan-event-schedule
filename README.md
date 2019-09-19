# Fan Event Schedule
Schedule application for fan events

Built on Laravel REST API backend with a ReactJS frontend.

Using Google's Material Design to create a clean user interface, different from Bootstrap.

## Installation
1. Clone repository into folder
2. Change `.env.example` file into `.env`
3. Update entries within the `.env` file to match database and other information
4. Generate a new key
   * `php artisan key:generate`
5. Create database tables
   * `php artisan migrate`
6. Generate encryption keys for API Auth
   * `php artisan passport:install`
7. Create user account by sending register email and password to api url
   * Send `email`, `password`, `c_password` to `/api/register` via POST form-data

## To-Do

### Admin-Side
- Pages
  - Schedule
    - Add Event
    - Edit Event
    - Remove Event
  - Guests
    - Add Guest
    - Edit Guest
    - Remove Guest
  - Exhibitors
    - Add Exhibitor
    - Edit Exhibitor
    - Remove Exhibitor
  - Rules
    - Add Rule
    - Edit Rule
    - Remove Rule
  - Maps
    - Add Maps
    - Edit Map Name
    - Remove Maps

### Public-Side
- Schedule
  - List Layout
  - Single Location View
  - Layout Switcher
- Maps
  - Collection of Images

## Finished
- ~~Buy Tickets (External Link)~~
- ~~Home Page~~
- ~~Schedules~~
  - ~~Grid Layout~~
  - ~~Single View~~
- ~~Social Media Links~~
- ~~Exhibitors~~
- ~~Rules & Polcies~~
- ~~Guests~~
  - ~~List by Type~~
  - ~~Single View~~
- ~~Login Functiionality~~
- Admin-Side
  - ~~Home Page~~