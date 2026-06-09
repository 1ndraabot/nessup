<?php
    namespace App\Models;

    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Database\Eloquent\Relations\BelongsTo;
    use Illuminate\Database\Eloquent\Relations\HasOne;
    use App\Models\TicketEvent;
    use Illuminate\Database\Eloquent\Relations\HasMany;

    class Event extends Model
    {
        protected $fillable = [
            'name',
            'description',
            'kategori',
            'organization_maker',
            'tipe',
            'open_event',
            'close_event',
            'organizer_id',
            'banner',
        ];

        protected $casts = [
            'open_event' => 'datetime',
            'close_event' => 'datetime',
        ];

        public function organizer(): BelongsTo
        {
            return $this->belongsTo(
                User::class,
                'organizer_id'
            );
        }

        public function scopeSearch($query, ?string $search)
        {
            if (!$search) {
                return $query;
            }

            return $query->whereRaw(
                'LOWER(name) LIKE ?',
                ['%' . strtolower(trim($search)) . '%']
            );
        }

        public function ticket()
        {
            return $this->hasOne(TicketEvent::class, 'event_id');
        }

        public function scopeFilter($query, array $filters)
        {
            return $query
                ->when($filters['search'] ?? null, function ($query, $search) {
                    $query->whereRaw(
                        'LOWER(name) LIKE ?',
                        ['%' . strtolower($search) . '%']
                    );
                })

                ->when(
                    ($filters['category'] ?? null)
                    && $filters['category'] !== 'all',
                    function ($query) use ($filters) {
                        $query->where(
                            'kategori',
                            strtolower($filters['category'])
                        );
                    }
                )

                ->when(
                    ($filters['type'] ?? null)
                    && $filters['type'] !== 'all',
                    function ($query) use ($filters) {
                        $query->where(
                            'tipe',
                            strtolower($filters['type'])
                        );
                    }
                )

                ->when($filters['start_date'] ?? null, function ($query, $startDate) {
                    $query->whereDate('open_event', '>=', $startDate);
                })

                ->when($filters['end_date'] ?? null, function ($query, $endDate) {
                    $query->whereDate('close_event', '<=', $endDate);
                });
        }

        public function registrations(): HasMany
        {
            return $this->hasMany(EventRegistration::class);
        }

        public function bookmarks(): HasMany
        {
            return $this->hasMany(EventBookmark::class);
        }
    }
