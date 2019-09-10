<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Guest;

class GuestController extends Controller
{
    /**
     * Retrieve all guests
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
     * {@inheritdoc}
     */
    public function view($id) {
        $guest = Guest::find($id);
        return $guest;
    }
}
