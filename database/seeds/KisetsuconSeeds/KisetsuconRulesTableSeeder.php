<?php

use Illuminate\Database\Seeder;

class KisetsuconRulesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('rules')->insert([
            'title' => 'General Rules',
            'description' => 'Something goes in here'
        ]);
    }
}
