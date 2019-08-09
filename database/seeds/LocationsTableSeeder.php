<?php

use Illuminate\Database\Seeder;

class LocationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('locations')->insert([
            'name' => 'Panel A'
        ]);

        DB::table('locations')->insert([
            'name' => 'Panel B'
        ]);

        DB::table('locations')->insert([
            'name' => 'Panel C'
        ]);

        DB::table('locations')->insert([
            'name' => 'Game Room'
        ]);
    }
}
