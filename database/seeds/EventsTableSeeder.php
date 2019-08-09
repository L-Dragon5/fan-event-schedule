<?php

use Illuminate\Database\Seeder;

class EventsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('events')->insert([
            'title' => 'Event A',
            'event_types' => '1,5',
            'date' => '2019-10-13',
            'time_start' => '10:00:00',
            'time_end' => '10:50:00',
            'location_id' => '1',
        ]);

        DB::table('events')->insert([
            'title' => 'Event B',
            'event_types' => '2',
            'date' => '2019-10-13',
            'time_start' => '12:00:00',
            'time_end' => '12:50:00',
            'location_id' => '2',
        ]);

        DB::table('events')->insert([
            'title' => 'Event C',
            'event_types' => '1,5',
            'date' => '2019-10-13',
            'time_start' => '11:00:00',
            'time_end' => '11:50:00',
            'location_id' => '1',
        ]);

        DB::table('events')->insert([
            'title' => 'Event D',
            'event_types' => '3',
            'date' => '2019-10-13',
            'time_start' => '13:00:00',
            'time_end' => '13:50:00',
            'location_id' => '3',
        ]);
    }
}
