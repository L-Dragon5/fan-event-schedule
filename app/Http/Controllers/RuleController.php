<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Rule;

class RuleController extends Controller
{
    /**
     * Retrieve all rules
     */
    public function index() {
        $rules = Rule::all()->sortBy('title');

        return $rules;
    }
}
