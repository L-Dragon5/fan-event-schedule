<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    private $kisetsucon = true;
    
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        if($this->kisetsucon) {
            $this->call([
                KisetsuconEventTypesTableSeeder::class,
                KisetsuconSettingsTableSeeder::class,
                KisetsuconLocationsTableSeeder::class,
                KisetsuconExhibitorsTableSeeder::class,
                KisetsuconRulesTableSeeder::class,
                KisetsuconPartnersTableSeeder::class,
                KisetsuconGuestsTableSeeder::class,
                KisetsuconEventsTableSeeder::class,
                HomeTableSeeder::class,
            ]);
        } else {
            $this->call([
                EventTypesTableSeeder::class,
                SettingsTableSeeder::class,
                LocationsTableSeeder::class,
                ExhibitorsTableSeeder::class,
                RulesTableSeeder::class,
                PartnersTableSeeder::class,
                GuestsTableSeeder::class,
                EventsTableSeeder::class,
                HomeTableSeeder::class,
            ]);
        }
    }
}
