<?php

use Illuminate\Database\Seeder;

class KisetsuconGuestsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('guests')->insert([
            'name' => 'Faye Mata',
            'category' => 'Voice Actress'
        ]);

        DB::table('guests')->insert([
            'name' => 'Xanthe Huynh',
            'category' => 'Voice Actress'
        ]);

        DB::table('guests')->insert([
            'name' => 'HikikoMuri',
            'category' => 'Cosplay'
        ]);

        DB::table('guests')->insert([
            'name' => 'Bunkie',
            'category' => 'Cosplay'
        ]);
    }
}
