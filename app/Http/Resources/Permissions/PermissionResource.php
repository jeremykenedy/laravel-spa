<?php

namespace App\Http\Resources\Permissions;

use Illuminate\Http\Resources\Json\JsonResource;

class PermissionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'            => $this->id,
            'name'          => $this->name,
            'value'         => $this->id,
            'created_at'    => $this->created_at->toDateString(),
            'updated_at'    => $this->created_at->toDateString(),
        ];
    }
}
