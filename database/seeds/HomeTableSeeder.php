<?php

use Illuminate\Database\Seeder;

class HomeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('home')->insert([
            'content' => 'Welcome to the home page of the public-facing side of the application.',
        ]);
    }
}
