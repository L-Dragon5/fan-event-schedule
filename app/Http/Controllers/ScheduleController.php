<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Location;
use App\Event;

class ScheduleController extends Controller
{
    /**
     * Retrieve built array of schedule listing organized by room location
     */
    public function index() {
        $return = [];
        $events = Event::all()->sortBy('time_start');

        foreach ($events as $event) {
            $loc = Location::find($event->location_id);

            $return[$loc->name][] = $event;
        }

        return $return;
    }
}
