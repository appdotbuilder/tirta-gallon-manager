<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\GallonTransaction
 *
 * @property int $id
 * @property int $employee_id
 * @property int $quantity
 * @property int $remaining_allowance
 * @property string $transaction_date
 * @property string $month_year
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Employee $employee
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|GallonTransaction newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GallonTransaction newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GallonTransaction query()
 * @method static \Illuminate\Database\Eloquent\Builder|GallonTransaction whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonTransaction whereEmployeeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonTransaction whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonTransaction whereMonthYear($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonTransaction whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonTransaction whereRemainingAllowance($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonTransaction whereTransactionDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonTransaction whereUpdatedAt($value)
 * @method static \Database\Factories\GallonTransactionFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class GallonTransaction extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'employee_id',
        'quantity',
        'remaining_allowance',
        'transaction_date',
        'month_year',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'quantity' => 'integer',
        'remaining_allowance' => 'integer',
        'transaction_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the employee that owns the transaction.
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }
}