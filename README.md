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