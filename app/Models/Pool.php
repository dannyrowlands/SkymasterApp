<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pool extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'type',
        'date',
        'id_list',
        'dropzone_id',
    ];

    /**
     * Get the dropzone for this pool.
     */
    public function dropzone(): BelongsTo
    {
        return $this->belongsTo(Dropzone::class);
    }
}
