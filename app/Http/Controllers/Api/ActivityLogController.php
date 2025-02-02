<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ActivityLogResource;
use Illuminate\Http\Request;
use Spatie\Activitylog\Models\Activity;

class ActivityLogController extends Controller
{
    public function __invoke(Request $request)
    {
        $perPage = $request->get('per_page', 15); // Default pagination size
        $search = $request->get('search');

        $activity = Activity::query()
            ->latest()
            ->where('causer_id', auth()->id())
            ->when($request->filled('filter'), function ($query) use ($request) {
                $query->where('event', $request->filter);
            })
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('description', 'like', '%' . $search . '%')
                    ->orWhere('event', 'like', '%' . $search . '%');
                });
            })
            ->paginate($perPage);

        return ActivityLogResource::collection($activity);
    }

}
