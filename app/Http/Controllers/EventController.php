<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;
use App\Location;
use App\EventType;

class EventController extends Controller
{
    /**
     * {@inheritdoc}
     */
    public function view($id) {
        $event = Event::find($id);
        $location = Location::find($event->location_id);

        $event_types = explode(',', $event->event_types);
        
        if(!empty($event_types)) {
            $event_type_names = [];
            foreach ($event_types as $id) {
                $e = EventType::find($id);
                
                if(isset($e->name)) {
                    $event_type_names[] = ['id' => $id, 'name' => $e->name];
                }
            }
        }

        $event->location = $location->name;
        $event->event_type_names = $event_type_names;

        return $event;
    }
}
