<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    protected $fillable = ['name', 'category', 'description', 'social_fb', 'social_tw', 'social_ig'];
    public $timestamps = false;
}
