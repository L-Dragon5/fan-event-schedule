<?php

use Illuminate\Database\Seeder;

class GuestsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('guests')->insert([
            'name' => 'Guest 1',
            'category' => 'Voice Actress'
        ]);

        DB::table('guests')->insert([
            'name' => 'Guest 2',
            'category' => 'Voice Actress'
        ]);

        DB::table('guests')->insert([
            'name' => 'Guest 3',
            'category' => 'Cosplay'
        ]);

        DB::table('guests')->insert([
            'name' => 'Guest 4',
            'category' => 'Cosplay'
        ]);
    }
}
