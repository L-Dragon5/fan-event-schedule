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
- Login/Logout
- Check if Authorized
- Allow 'Add' FAB on list pages
- Allow 'Edit' FAB on detail pages
  - Replaced fiels with text inputs and WYSIWYG (Summernote)

### Public-Side
- General Info
- Schedule
  - List Layout
  - Layout Switcher
  - Filter Options
- Maps
  - Collection of Images

## Finished
- ~~Buy Tickets (External Link)~~
- ~~Schedules~~
  - ~~Grid Layout~~
  - ~~Single View~~
- ~~Social Media Links~~
- ~~Exhibitors~~
- ~~Rules & Polcies~~
- ~~Guests~~
  - ~~List by Type~~
  - ~~Single View~~