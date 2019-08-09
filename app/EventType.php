<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EventType extends Model
{
    protected $fillable = ['name'];
    
    public function event() {
        return $this->belongsTo('App\Event');
    }
}
