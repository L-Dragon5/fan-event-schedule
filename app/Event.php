<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'title',
        'event_type',
        'date',
        'time_start',
        'time_end',
        'location_id',
        'description',
        'is_cancelled'
    ];
    public $timestamps = false;

    public function location() {
        return $this->hasOne('App\Location');
    }

    public function event_types() {
        return $this->hasMany('App\EventType');
    }
}
