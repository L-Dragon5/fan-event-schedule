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
}
