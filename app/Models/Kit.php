<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Kit extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'jumper_id',
        'indentifer',
        'main',
        'main_size',
        'reserve',
        'reserve_size',
        'aad',
        'aad_service_due',
        'reserve_due',
    ];

    /**
     * Get the jumper for this kit.
     */
    public function jumper(): BelongsTo
    {
        return $this->belongsTo(Jumper::class);
    }
}
