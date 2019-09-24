<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Guest;
use Validator;

class GuestController extends Controller
{
    private $successStatus = 200;

    /**
     * Get all guests.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $return = [];
        $guests = Guest::all()->sortBy('name');

        foreach ($guests as $guest) {
            $category = $guest->category;

            $return[$category][] = $guest;
        }

        // Sort by category key Z-A
        krsort($return);

        return $return;
    }

    /**
     * Get guest by id.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function view(Request $request, $id) {
        try {
            $guest = Guest::findOrFail($id);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return return_json_message('Invalid guest id', 401);
        }

        return $guest;
    }

    /**
     * Store guest in DB.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'string|required',
            'category' => 'string|nullable',
            'description' => 'string|nullable',
            'social_fb' => 'url|nullable',
            'social_tw' => 'url|nullable',
            'social_ig' => 'url|nullable',
        ]);

        if($validator->fails()) {
            return return_json_message($validator->errors(), $this->errorStatus);
        }

        $guest = new Guest;
        $guest->name = $request->name;
        $guest->category = $request->category;
        $guest->description = $request->description;
        $guest->social_fb = $request->social_fb;
        $guest->social_tw = $request->social_tw;
        $guest->social_ig = $request->social_ig;
        $success = $guest->save();

        if ($success) {
            return return_json_message('Created new guest succesfully', $this->successStatus);
        } else {
            return return_json_message('Something went wrong while trying to create a new guest', 401);
        }
    }

    /**
     * Update the guest content.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string|required',
            'category' => 'string|nullable',
            'description' => 'string|nullable',
            'social_fb' => 'url|nullable',
            'social_tw' => 'url|nullable',
            'social_ig' => 'url|nullable',
        ]);

        if($validator->fails()) {
            return return_json_message($validator->errors(), $this->errorStatus);
        }

        try {
            $guest = Guest::findOrFail($id);
            $guest->name = $request->name;
            $guest->category = $request->category;
            $guest->description = $request->description;
            $guest->social_fb = $request->social_fb;
            $guest->social_tw = $request->social_tw;
            $guest->social_ig = $request->social_ig;
            $success = $guest->save();

            if ($success) {
                return return_json_message('Updated succesfully', $this->successStatus);
            } else {
                return return_json_message('Something went wrong while trying to update', 401);
            }
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return return_json_message('Invalid guest id', 401);
        }
    }

    /**
     * Remove guest by id.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id) {
        $success = Guest::destroy($id);

        if ($success) {
            return return_json_message('Delete succesfully', $this->successStatus);
        } else {
            return return_json_message('Did not find a guest to remove', 401);
        }
    }
}
