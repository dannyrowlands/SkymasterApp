<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Medical extends Model
{
    use HasFactory;

    /**
     * Get the person for this medical.
     */
    public function person(): BelongsTo
    {
        return $this->belongsTo(Individual::class);
    }
}
