<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Event;
use App\Location;
use App\EventType;

class EventController extends Controller
{
    private $successStatus = 200;
    private $errorStatus = 422;

    /**
     * Get event by id.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function view($id) {
        try {
            $event = Event::findOrFail($id);
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
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return return_json_message('Invalid event id', 401);
        }

        return $event;
    }

    /**
     * Store event in DB.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'title' => 'string|required',
            'date' => 'date_format:Y-m-d|required',
            'time_start' => 'date_format:H:i:s|required',
            'time_end' => 'date_format:H:i:s|after:time_start|required',
            'location_id' => 'numeric|required',
            'description' => 'string|nullable',
        ]);

        if($validator->fails()) {
            return return_json_message($validator->errors(), $this->errorStatus);
        }

        $event = new Event;
        $event->title = $request->title;
        $event->date = $request->date;
        $event->time_start = $request->time_start;
        $event->time_end = $request->time_end;
        $event->location_id = $request->location_id;
        $event->description = $request->description;
        $success = $event->save();

        if ($success) {
            return return_json_message('Created new event succesfully', $this->successStatus);
        } else {
            return return_json_message('Something went wrong while trying to create a new event', 401);
        }
    }

    /**
     * Update the event content.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'string|required',
            'date' => 'date_format:Y-m-d|required',
            'time_start' => 'date_format:H:i:s|required',
            'time_end' => 'date_format:H:i:s|after:time_start|required',
            'location_id' => 'numeric|required',
            'description' => 'string|nullable',
            'is_cancelled' => 'boolean'
        ]);

        if($validator->fails()) {
            return return_json_message($validator->errors(), $this->errorStatus);
        }

        try {
            $event = Event::findOrFail($id);
            $event->title = $request->title;
            $event->date = $request->date;
            $event->time_start = $request->time_start;
            $event->time_end = $request->time_end;
            $event->location_id = $request->location_id;
            $event->description = $request->description;
            $event->is_cancelled = $request->is_cancelled;
            $success = $event->save();

            if ($success) {
                return return_json_message('Updated succesfully', $this->successStatus);
            } else {
                return return_json_message('Something went wrong while trying to update', 401);
            }
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return return_json_message('Invalid event id', 401);
        }
    }

    /**
     * Remove event by id.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id) {
        $success = Event::destroy($id);

        if ($success) {
            return return_json_message('Deleted succesfully', $this->successStatus);
        } else {
            return return_json_message('Did not find a event to remove', 401);
        }
    }
}
