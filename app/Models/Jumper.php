<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Jumper extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'person_id',
    ];

    /**
     * Get the individual for this jumper.
     */
    public function individual(): BelongsTo
    {
        return $this->belongsTo(Individual::class);
    }

    /**
     * @return HasMany
     */
    public function instructor(): HasMany
    {
        return $this->hasMany(Instructor::class);
    }
}
