<?php

use Illuminate\Database\Seeder;

class KisetsuconPartnersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('partners')->insert([
            'name' => 'RIT Cosplay Troupe',
            'url' => 'https://cosplay.rit.edu/'
        ]);

        DB::table('partners')->insert([
            'name' => 'Tora-Con',
            'url' => 'https://toracon.org/'
        ]);
    }
}
