# Fan Event Schedule
Schedule application for fan events

Built on Laravel REST API backend with a ReactJS frontend.
Styled using Google's Material Design via MaterializeCSS.

Page Options:
- Home Page
- Schedule
- Exhibitors
- Rules & Policies
- Guests
- Maps

Schedule is laid out into a grid view or a list view. More views might be added in the future
Provides social media links and other settings to set.
Provides login functionality for admins to add, edit, delete content.

## Requirements
* MySQL/MariaDB Server
* PHP >= 7.2.0
* PHP Extensions: BCMath, Ctype, JSON, Mbstring, OpenSSL, PDO, XML
* Composer
* NodeJS

## Ubuntu 18.04 Installation with Nginx
1. Make sure server is up to date
   1. `apt-get update && apt-get upgrade`
2. Instal NGINX
   1. `apt install nginx` & `systemctl enable nginx.service`
3. Install MariaDB (newest version that supports large index keys by default)
   1. `apt-get install software-properties-common`
   2. `apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xF1656F24C74CD1D8`
   3. `add-apt-repository "deb [arch=amd64,arm64,ppc64el] http://mariadb.mirror.liquidtelecom.com/repo/10.4/ubuntu $(lsb_release -cs) main"`
   4. `apt update`
   5. `apt install mariadb-server mariadb-client`
   6. `systemctl enable mariadb.service`
4. Secure MariaDB installation
   1. `mysql_secure_installation`
5. Setup firewall
   1. `ufw app list`
   2. `ufw allow OpenSSH`
   3. `ufw allow 'Nginx HTTP'`
   4. `ufw allow 'Nginx HTTPS'`
   5. `ufw enable`
   6. `ufw status`
6. Install PHP, extensions, and other tools
   1. `apt install php-fpm php-common php-mbstring php-xmlrpc php-soap php-gd php-xml php-mysql php-cli php-zip php-bcmath`
   2. `apt install composer unzip`
7. Update PHP settings to process for Nginx
   1. `nano /etc/php/<version>/fpm/php.ini`
   2. `memory_limit = 256M`
   3. `upload_max_filesize = 64M`
   4. `cgi.fix_pathinfo=0`
8.  Clone repository into /var/www/html. Rename if you want to.
9.  Setup nginx to have permission over the folder
    1.  `chown -R www-data:www-data /var/www/html/<Folder Name>`
    2.  `chmod -R 755 /var/www/html/<Folder Name>`
10. Setup nginx sites-available for folder. Create symbolic link to sites-enabled
11. Restart Nginx to refresh changes
    1.  `systemctl restart nginx.service`
12. Go into MariaDB and create a new database for the website
    1.  `CREATE DATABASE <database name>;`

## Installation
1. Go into folder
2. Install composer modules
   * Development: `composer install`
   * Production: `composer install --no-dev --optimize-autoloader`
3. Install node modules
   * `npm install`
   * Development: `npm run dev` or `npm run watch`
   * Production: `npm run prod`
4. Change `.env.example` file into `.env`
5. Update entries within the `.env` file to match database and other information
   * If in production, be sure to set `APP_ENV=production` and `APP_DEBUG=false`
   * Update `MIX_EVENT_NAME` with your event name in quotes
6. Generate a new key
   * `php artisan key:generate`
7. Create database tables
   * `php artisan migrate`
   * If you want it seeded, then `php artisan migrate --seed`
   * You can wipe and seed again by doing `php artisan migrate:fresh --seed`
8. Generate encryption keys for API Auth
   * `php artisan passport:install`
9. Create user account by sending register email and password to api url
   * Send `email`, `password`, `c_password` to `/api/register` via POST form-data
   * ` curl -X POST -F 'email=<email>' -F 'password=<password>' -F 'c_password=<password>' http://localhost/api/register`


## To-Do

### Backend
- Setup Redis cache
- Setup Event Types
- Setup Exhibitor Types
- Setup Guest Types
- Setup Settings configuration

### Admin-Side
- Pages
  - Add/Edit/Remove Locations
  - Maps
    - Add Map
    - Edit Map Name
    - Remove Map
  - Event
    - Add isCancelled Checkbox

### Public-Side
- My Schedule
  - Ability to add events to personal schedule
    - Probably use localStorage to store