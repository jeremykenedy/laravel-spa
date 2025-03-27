<?php

namespace App\Http\Resources\Users;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'email'         => $this->email,
            'role_id'       => $this->roles,
            'roles'         => $this->roles,
            'permissions'   => $this->permissions,
            'created_at'    => $this->created_at->toDateString(),
            'updated_at'    => $this->created_at->toDateString(),
            'deleted_at'    => $this->created_at->toDateString(),
        ];
    }
}
