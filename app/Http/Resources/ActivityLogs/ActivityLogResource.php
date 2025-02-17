<?php

namespace App\Http\Resources\ActivityLogs;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActivityLogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                => $this->id,
            'log_name'          => $this->log_name,
            'description'       => $this->description,
            'subject_type'      => $this->subject_type,
            'event'             => $this->event,
            'causer_type'       => $this->causer_type,
            'causer_id'         => $this->causer_id,
            'properties'        => $this->properties,
            'batch_uuid'        => $this->batch_uuid,
            'created_at'        => $this->created_at,
            'format_created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
