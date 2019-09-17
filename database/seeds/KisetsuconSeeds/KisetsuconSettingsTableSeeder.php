<?php

use Illuminate\Database\Seeder;

class KisetsuconSettingsTableSeeder extends Seeder
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
            'value' => 'https://www.kisetsucon.org/registration/attendee/'
        ]);

        DB::table('settings')->insert([
            'key' => 'event_name',
            'value' => 'Kisetsucon 2019'
        ]);

        DB::table('settings')->insert([
            'key' => 'event_date',
            'value' => 'October 13th, 2019'
        ]);

        DB::table('settings')->insert([
            'key' => 'event_start_time',
            'value' => '10:00:00'
        ]);

        DB::table('settings')->insert([
            'key' => 'social_fb',
            'value' => 'https://facebook.com/kisetsucon/'
        ]);

        DB::table('settings')->insert([
            'key' => 'social_tw',
            'value' => 'https://twitter.com/kisetsucon/'
        ]);

        DB::table('settings')->insert([
            'key' => 'social_ig',
            'value' => 'https://instagram.com/kisetsucon/'
        ]);

        DB::table('settings')->insert([
            'key' => 'social_web',
            'value' => 'https://kisetsucon.org/'
        ]);
    }
}
