<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Dropzone extends Model
{
    use HasFactory;

    /**
     * @return HasMany
     */
    public function pools(): HasMany
    {
        return $this->hasMany(Pool::class);
    }
}
