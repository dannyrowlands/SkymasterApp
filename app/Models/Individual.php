<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Individual extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'tel_no',
        'email',
        'dob',
        'weight',
        'notes',
    ];

    /**
     * @return HasOne
     */
    public function jumper(): HasOne
    {
        return $this->hasOne(Jumper::class);
    }

    /**
     * @return HasOne
     */
    public function pilot(): HasOne
    {
        return $this->hasOne(Pilot::class);
    }
}
