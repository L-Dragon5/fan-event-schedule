<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Location;
use App\Event;

class ScheduleController extends Controller
{
    /**
     * Retrieve built array of schedule listing organized by room location for grid layout.
     */
    public function byGrid() {
        $return = [];
        $events = Event::all()->sortBy('time_start');

        // Set all events to location
        foreach ($events as $event) {
            $loc = Location::find($event->location_id);

            $return[$loc->id][] = $event;

            if(!isset($return[$loc->id]['name'])) {
                $return[$loc->id]['name'] = $loc->name;
            }
        }

        // Sort events by location id
        ksort($return);

        // Set events by location name instead of id
        foreach($return as $k => $v) {
            $name = $return[$k]['name'];

            unset($return[$k]['name']);
            $return[$name] = $return[$k];
            unset($return[$k]);
        }

        return $return;
    }

    /**
     * Retrieve array of schedule listing by time, earliest to latest.
     */
    public function byTime() {
        $return = [];
        $events = Event::all()->sortBy('time_start');
        foreach($events as $event) {
            $loc = Location::find($event->location_id);
            $event->location = $loc->name;

            $return[] = $event;
        }

        return $return;
    }

    /**
     * Retrieve array of schedule listing by singular location in grid layout.
     */
    public function byLocation($location) {
        $events = Event::where('location_id', $location)->orderBy('time_start')->get();

        return $events;
    }
}
