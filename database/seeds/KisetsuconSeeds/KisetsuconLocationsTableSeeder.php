<?php

use Illuminate\Database\Seeder;

class KisetsuconLocationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('locations')->insert([
            'name' => 'Main Events'
        ]);

        DB::table('locations')->insert([
            'name' => 'Panel A'
        ]);

        DB::table('locations')->insert([
            'name' => 'Panel B'
        ]);

        DB::table('locations')->insert([
            'name' => 'Game Room'
        ]);

        DB::table('locations')->insert([
            'name' => 'Public HQ'
        ]);
    }
}
