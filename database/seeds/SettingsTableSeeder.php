<?php

use Illuminate\Database\Seeder;

class SettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('settings')->insert([
            'key' => 'registration_link',
        ]);

        DB::table('settings')->insert([
            'key' => 'event_name',
            'value' => 'Example Event'
        ]);

        DB::table('settings')->insert([
            'key' => 'event_date',
            'value' => 'January 1st, 2020'
        ]);

        DB::table('settings')->insert([
            'key' => 'event_start_time',
            'value' => '10:00:00'
        ]);

        DB::table('settings')->insert([
            'key' => 'social_fb'
        ]);

        DB::table('settings')->insert([
            'key' => 'social_tw'
        ]);

        DB::table('settings')->insert([
            'key' => 'social_ig'
        ]);

        DB::table('settings')->insert([
            'key' => 'social_web'
        ]);
    }
}
