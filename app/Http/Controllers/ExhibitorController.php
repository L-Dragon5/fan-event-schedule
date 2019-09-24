<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Exhibitor;

class ExhibitorController extends Controller
{
    /**
     * Retrieve all exhibitors
     */
    public function index() {
        $return = [];
        $exhibitors = Exhibitor::all()->sortBy('name');

        foreach ($exhibitors as $exhibitor) {
            $category = $exhibitor->category;

            $return[$category][] = $exhibitor;
        }

        return $return;
    }
}
