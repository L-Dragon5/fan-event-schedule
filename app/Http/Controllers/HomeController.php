<?php

namespace App\Http\Controllers;

use App\Home;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    private $successStatus = 200;

    /**
     * Display home content.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $home = Home::find(1);

        return $home->content;
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
