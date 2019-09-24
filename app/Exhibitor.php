<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Exhibitor extends Model
{
    protected $fillable = ['name', 'category', 'url'];
    public $timestamps = false;
}
