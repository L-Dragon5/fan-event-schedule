<?php

use Illuminate\Database\Seeder;

class EventTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('event_types')->insert([
            'name' => 'Main Event'
        ]);

        DB::table('event_types')->insert([
            'name' => 'Q&A Panel'
        ]);

        DB::table('event_types')->insert([
            'name' => 'Instructional Panel'
        ]);

        DB::table('event_types')->insert([
            'name' => 'Game Show Panel'
        ]);

        DB::table('event_types')->insert([
            'name' => 'Guest Event'
        ]);
    }
}
