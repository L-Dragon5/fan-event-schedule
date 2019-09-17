<?php

use Illuminate\Database\Seeder;

class KisetsuconEventsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        // Main Events = 1
        //
        DB::table('events')->insert([
            'title' => 'Opening Ceremonies',
            'event_types' => NULL,
            'date' => '2019-10-13',
            'time_start' => '10:00:00',
            'time_end' => '10:50:00',
            'location_id' => '1',
        ]);

        DB::table('events')->insert([
            'title' => 'AniParty Set 1',
            'event_types' => NULL,
            'date' => '2019-10-13',
            'time_start' => '11:00:00',
            'time_end' => '11:50:00',
            'location_id' => '1',
        ]);

        DB::table('events')->insert([
            'title' => 'VA Guest Q&A',
            'event_types' => NULL,
            'date' => '2019-10-13',
            'time_start' => '12:30:00',
            'time_end' => '13:30:00',
            'location_id' => '1',
        ]);

        DB::table('events')->insert([
            'title' => 'Asian Dance Showcase',
            'event_types' => NULL,
            'date' => '2019-10-13',
            'time_start' => '15:00:00',
            'time_end' => '16:20:00',
            'location_id' => '1',
        ]);

        DB::table('events')->insert([
            'title' => 'AniParty Set 2',
            'event_types' => NULL,
            'date' => '2019-10-13',
            'time_start' => '18:00:00',
            'time_end' => '18:50:00',
            'location_id' => '1',
        ]);

        DB::table('events')->insert([
            'title' => 'Cosplay Contest',
            'event_types' => NULL,
            'date' => '2019-10-13',
            'time_start' => '19:00:00',
            'time_end' => '19:50:00',
            'location_id' => '1',
        ]);

        //
        // Panel A = 2
        //
        DB::table('events')->insert([
            'title' => 'Panel A1',
            'event_types' => NULL,
            'date' => '2019-10-13',
            'time_start' => '10:30:00',
            'time_end' => '11:20:00',
            'location_id' => '2',
        ]);

        DB::table('events')->insert([
            'title' => 'Panel A2',
            'event_types' => NULL,
            'date' => '2019-10-13',
            'time_start' => '11:30:00',
            'time_end' => '12:20:00',
            'location_id' => '2',
        ]);

        DB::table('events')->insert([
            'title' => 'Panel A3',
            'event_types' => NULL,
            'date' => '2019-10-13',
            'time_start' => '12:30:00',
            'time_end' => '13:20:00',
            'location_id' => '2',
        ]);

        DB::table('events')->insert([
            'title' => 'Xanthe Workshop',
            'event_types' => NULL,
            'date' => '2019-10-13',
            'time_start' => '13:30:00',
            'time_end' => '14:30:00',
            'location_id' => '2',
        ]);

        DB::table('events')->insert([
            'title' => 'Panel A5',
            'event_types' => NULL,
            'date' => '2019-10-13',
            'time_start' => '15:00:00',
            'time_end' => '15:50:00',
            'location_id' => '2',
        ]);

        DB::table('events')->insert([
            'title' => 'VA Guest Autographs',
            'event_types' => NULL,
            'date' => '2019-10-13',
            'time_start' => '16:30:00',
            'time_end' => '17:30:00',
            'location_id' => '2',
        ]);

        DB::table('events')->insert([
            'title' => 'Panel A7',
            'event_types' => NULL,
            'date' => '2019-10-13',
            'time_start' => '18:00:00',
            'time_end' => '18:50:00',
            'location_id' => '2',
        ]);

        DB::table('events')->insert([
            'title' => 'Panel A8',
            'event_types' => NULL,
            'date' => '2019-10-13',
            'time_start' => '19:30:00',
            'time_end' => '19:50:00',
            'location_id' => '2',
        ]);

        DB::table('events')->insert([
            'title' => 'Staff Q&A',
            'event_types' => NULL,
            'date' => '2019-10-13',
            'time_start' => '20:00:00',
            'time_end' => '20:50:00',
            'location_id' => '2',
        ]);

        DB::table('events')->insert([
            'title' => 'Name That Anime Tune 2.0',
            'event_types' => NULL,
            'date' => '2019-10-13',
            'time_start' => '21:00:00',
            'time_end' => '21:50:00',
            'location_id' => '2',
        ]);

        //
        // Panel B = 3
        //
        DB::table('events')->insert([
            'title' => 'Panel B1',
            'event_types' => NULL,
            'date' => '2019-10-13',
            'time_start' => '10:30:00',
            'time_end' => '11:20:00',
            'location_id' => '3',
        ]);

        DB::table('events')->insert([
            'title' => 'Panel B2',
            'event_types' => NULL,
            'date' => '2019-10-13',
            'time_start' => '12:30:00',
            'time_end' => '13:20:00',
            'location_id' => '3',
        ]);

        DB::table('events')->insert([
            'title' => 'Panel B3',
            'event_types' => NULL,
            'date' => '2019-10-13',
            'time_start' => '13:30:00',
            'time_end' => '14:00:00',
            'location_id' => '3',
        ]);

        DB::table('events')->insert([
            'title' => 'HikikoMuri Workshop',
            'event_types' => NULL,
            'date' => '2019-10-13',
            'time_start' => '14:30:00',
            'time_end' => '15:30:00',
            'location_id' => '3',
        ]);

        DB::table('events')->insert([
            'title' => 'Panel B5',
            'event_types' => NULL,
            'date' => '2019-10-13',
            'time_start' => '16:00:00',
            'time_end' => '16:30:00',
            'location_id' => '3',
        ]);

        DB::table('events')->insert([
            'title' => 'Bunkie Workshop',
            'event_types' => NULL,
            'date' => '2019-10-13',
            'time_start' => '17:00:00',
            'time_end' => '17:50:00',
            'location_id' => '3',
        ]);

        DB::table('events')->insert([
            'title' => 'Panel B7',
            'event_types' => NULL,
            'date' => '2019-10-13',
            'time_start' => '18:30:00',
            'time_end' => '19:00:00',
            'location_id' => '3',
        ]);

        DB::table('events')->insert([
            'title' => 'Panel B8',
            'event_types' => NULL,
            'date' => '2019-10-13',
            'time_start' => '20:00:00',
            'time_end' => '22:00:00',
            'location_id' => '3',
        ]);

        //
        // Game Room = 4
        //
        DB::table('events')->insert([
            'title' => 'Free Play Game Room',
            'event_types' => NULL,
            'date' => '2019-10-13',
            'time_start' => '10:00:00',
            'time_end' => '22:00:00',
            'location_id' => '4',
        ]);

        //
        // Public HQ = 5
        //
        DB::table('events')->insert([
            'title' => 'Info Booth / Lost & Found / Cosplay Repair',
            'event_types' => NULL,
            'date' => '2019-10-13',
            'time_start' => '10:00:00',
            'time_end' => '22:00:00',
            'location_id' => '5',
        ]);
    }
}
