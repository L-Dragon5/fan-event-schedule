<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $primaryKey = 'key';
    protected $fillable = ['key', 'value'];
    public $timestamps = false;
}
