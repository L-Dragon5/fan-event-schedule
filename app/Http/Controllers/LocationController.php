<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Location;

class LocationController extends Controller
{
    /**
     * Retrieve all locations.
     */
    public function index() {
        $locations = Location::all();

        return $locations;
    }
}
