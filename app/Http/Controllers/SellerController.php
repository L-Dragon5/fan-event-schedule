<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Seller;

class SellerController extends Controller
{
    /**
     * Retrieve all sellers
     */
    public function index() {
        $return = [];
        $sellers = Seller::all()->sortBy('name');

        foreach ($sellers as $seller) {
            $category = $seller->category;

            $return[$category][] = $seller;
        }

        return $return;
    }
}
