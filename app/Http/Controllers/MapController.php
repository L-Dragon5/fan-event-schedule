<?php

namespace App\Http\Controllers;

use App\Map;
use Illuminate\Http\Request;

class MapController extends Controller
{
    private $successStatus = 200;

    /**
     * Get all map ids and names
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $maps = Maps::all();

        return $maps
    }

    /**
     * Get map by id
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function view(Request $request) {

    }

    /**
     * Store map in DB
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Requst $request) {

    }

    /**
     * Update the home content.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $home = Home::find(1);
        $home->content = $request->content;
        $home->save();

        return response()->json(['message' => 'Saved successfully'], $this->successStatus);
    }
}
