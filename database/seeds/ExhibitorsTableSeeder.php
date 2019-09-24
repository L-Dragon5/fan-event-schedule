<?php

use Illuminate\Database\Seeder;

class ExhibitorsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('exhibitors')->insert([
            'name' => 'Vendor A',
            'category' => 'Vendor'
        ]);

        DB::table('exhibitors')->insert([
            'name' => 'Artist A',
            'category' => 'Artist'
        ]);

        DB::table('exhibitors')->insert([
            'name' => 'Artist B',
            'category' => 'Artist'
        ]);

        DB::table('exhibitors')->insert([
            'name' => 'Artist C',
            'category' => 'Artist'
        ]);
    }
}
