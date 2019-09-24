<?php

use Illuminate\Database\Seeder;

class KisetsuconExhibitorsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('exhibitors')->insert([
            'name' => 'Hammergirl Anime',
            'category' => 'Vendor',
            'url' => 'http://hammergirlanime.com'
        ]);

        DB::table('exhibitors')->insert([
            'name' => 'Lanaluu',
            'category' => 'Artist',
            'url' => 'http://lanaluuart.wixsite.com/artportfolio'
        ]);

        DB::table('exhibitors')->insert([
            'name' => 'ETs Designs',
            'category' => 'Artist',
            'url' => 'http://www.ets-designs.com/index.html'
        ]);

        DB::table('exhibitors')->insert([
            'name' => 'The Clever Kitsune',
            'category' => 'Artist',
            'url' => 'https://www.etsy.com/shop/TheCleverKitsune'
        ]);

        DB::table('exhibitors')->insert([
            'name' => 'monwinvo',
            'category' => 'Artist',
            'url' => 'https://www.monicanguyenvo.com/'
        ]);

        DB::table('exhibitors')->insert([
            'name' => 'Happy Whip',
            'category' => 'Artist',
            'url' => 'https://happywhip.weebly.com/'
        ]);

        DB::table('exhibitors')->insert([
            'name' => 'Milky Moonbow',
            'category' => 'Artist',
            'url' => 'http://milkymoonbowart.tumblr.com'
        ]);

        DB::table('exhibitors')->insert([
            'name' => 'Tofuvore',
            'category' => 'Artist',
            'url' => 'http://tofuvore.tumblr.com/'
        ]);

        DB::table('exhibitors')->insert([
            'name' => 'MeepuDraws',
            'category' => 'Artist',
            'url' => 'https://www.etsy.com/shop/ChibiMeepu'
        ]);

        DB::table('exhibitors')->insert([
            'name' => 'E. D. Mead Art',
            'category' => 'Artist',
            'url' => 'http://www.edmeadart.com/'
        ]);

        DB::table('exhibitors')->insert([
            'name' => 'Wendigo House',
            'category' => 'Artist',
            'url' => 'http://wh-portfolio.tumblr.com/'
        ]);

        DB::table('exhibitors')->insert([
            'name' => 'nothART',
            'category' => 'Artist',
            'url' => 'https://www.deviantart.com/nothhart'
        ]);

        DB::table('exhibitors')->insert([
            'name' => 'Hanimun',
            'category' => 'Artist',
            'url' => 'https://hanimun.tumblr.com/'
        ]);

        DB::table('exhibitors')->insert([
            'name' => 'Mad Crafters',
            'category' => 'Artist',
            'url' => 'https://www.facebook.com/MadCrafters/'
        ]);

        DB::table('exhibitors')->insert([
            'name' => 'Sugary Carousel',
            'category' => 'Artist',
            'url' => 'https://www.facebook.com/sugarycarousel/'
        ]);
    }
}
