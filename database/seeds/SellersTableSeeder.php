<?php

use Illuminate\Database\Seeder;

class SellersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sellers')->insert([
            'name' => 'Vendor A',
            'category' => 'Vendor'
        ]);

        DB::table('sellers')->insert([
            'name' => 'Artist A',
            'category' => 'Artist'
        ]);

        DB::table('sellers')->insert([
            'name' => 'Artist B',
            'category' => 'Artist'
        ]);

        DB::table('sellers')->insert([
            'name' => 'Artist C',
            'category' => 'Artist'
        ]);
    }
}
