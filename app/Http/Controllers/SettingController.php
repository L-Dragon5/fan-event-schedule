<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Setting;

class SettingController extends Controller
{
    /**
     * Retrieve value of setting by key
     */
    public function getByKey($key) {
        $setting = Setting::find($key);
        if(!empty($setting)) {
            return $setting->value;
        } else {
            return null;
        }
    }

    public function getSocial() {
        $social_fb = Setting::find('social_fb');
        $social_tw = Setting::find('social_tw');
        $social_ig = Setting::find('social_ig');
        $social_web = Setting::find('social_web');

        $socials = [
            'social_fb' => $social_fb->value,
            'social_tw' => $social_tw->value,
            'social_ig' => $social_ig->value,
            'social_web' => $social_web->value
        ];
        
        if(!empty($socials)) {
            return $socials;
        } else {
            return null;
        }
    }
}
