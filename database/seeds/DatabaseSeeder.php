<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            EventTypesTableSeeder::class,
            SettingsTableSeeder::class,
            LocationsTableSeeder::class,
            SellersTableSeeder::class,
            RulesTableSeeder::class,
            PartnersTableSeeder::class,
            GuestsTableSeeder::class,
            EventsTableSeeder::class,
        ]);
    }
}
