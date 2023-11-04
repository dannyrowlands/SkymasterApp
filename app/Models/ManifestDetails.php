<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ManifestDetails extends Model
{
    use HasFactory;

    protected $fillable = [
        'jumper_id',
        'sequence',
        'note',
        'group_identifier',
    ];

    /**
     * Get the jumper for these details.
     */
    public function jumper(): BelongsTo
    {
        return $this->belongsTo(Jumper::class);
    }
}
