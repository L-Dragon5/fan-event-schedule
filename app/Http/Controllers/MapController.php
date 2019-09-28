<?php

namespace App\Http\Controllers;

use App\Map;
use Validator;
use Illuminate\Http\Request;

class MapController extends Controller
{
    private $successStatus = 200;

    /**
     * Get all map ids and names.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $maps = Map::select('id', 'title')->get();

        return $maps;
    }

    /**
     * Get map by id.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function view(Request $request, $id) {
        $map = Map::find($id);

        return $map;
    }

    /**
     * Store map in DB.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'title' => 'string|required',
            'image' => 'image|nullable',
        ]);

        if($validator->fails()) {
            return return_json_message($validator->errors(), $this->errorStatus);
        }

        $map = new Map;
        $map->title = $request->title;

        $image = file_get_contents($request->image);
        $image_data = base64_encode($image);
        
        $final_img = 'data:image/' . $request->image->extension() . ';base64,' . $image_data;

        $map->image = $final_img;
        $success = $map->save();

        if ($success) {
            return return_json_message('Created new map succesfully', $this->successStatus);
        } else {
            return return_json_message('Something went wrong while trying to create a new map', 401);
        }
    }

    /**
     * Update the map content.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'string|required',
        ]);

        if($validator->fails()) {
            return return_json_message($validator->errors(), $this->errorStatus);
        }

        $map = Map::find($id);
        $map->title = $request->title;
        $success = $map->save();

        if ($success) {
            return return_json_message('Updated succesfully', $this->successStatus);
        } else {
            return return_json_message('Something went wrong while trying to update', 401);
        }
    }

    /**
     * Remove map by id.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id) {
        $success = Map::destroy($id);

        if ($success) {
            return return_json_message('Delete succesfully', $this->successStatus);
        } else {
            return return_json_message('Did not find a map to remove', 401);
        }
    }
}
