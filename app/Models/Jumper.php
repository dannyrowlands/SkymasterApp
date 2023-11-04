<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Jumper extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'individual_id',
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

    /**
     * @return HasMany
     */
    public function kits(): HasMany
    {
        return $this->hasMany(Kit::class);
    }

    /**
     * @return HasOne
     */
    public function manifestDetails(): HasOne
    {
        return $this->hasOne(ManifestDetails::class);
    }
}
