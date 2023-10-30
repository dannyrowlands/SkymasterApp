<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class Instructor extends Model
{
    use HasFactory;

    /**
     * Get the jumper for this jumper.
     */
    public function jumper(): BelongsTo
    {
        return $this->belongsTo(Jumper::class);
    }
}
