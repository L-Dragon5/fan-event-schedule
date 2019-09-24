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
            'category' => 'Voice Actress',
            'social_tw' => 'https://twitter.com/FayeMata',
            'social_ig' => 'https://www.instagram.com/fayematata/'
        ]);

        DB::table('guests')->insert([
            'name' => 'Xanthe Huynh',
            'category' => 'Voice Actress',
            'social_tw' => 'https://twitter.com/itsxanthor'
        ]);

        DB::table('guests')->insert([
            'name' => 'HikikoMuri',
            'category' => 'Cosplay',
            'social_fb' => 'https://www.facebook.com/HikikoMuri/',
            'social_ig' => 'https://www.instagram.com/hikikomuri/'
        ]);

        DB::table('guests')->insert([
            'name' => 'Bunkie',
            'category' => 'Cosplay',
            'social_fb' => 'https://www.facebook.com/bunkiecosplay/'
        ]);

        DB::table('guests')->insert([
            'name' => 'AniParty',
            'category' => 'Performer',
            'social_fb' => 'https://www.facebook.com/ANISONGPARTY/',
            'social_tw' => 'https://twitter.com/anisongparty',
            'social_ig' => 'https://www.instagram.com/anisongparty/'
        ]);
    }
}
