<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\JsonResource;

class UserGResource extends JsonResource
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
        "id" => $this->resource->id,
        "name" => $this->resource -> name,
        "lastname" => $this->resource -> lastname,
        "email" => $this->resource -> email,
        "role" => $this->resource->role,
        "state" =>$this->resource->state ?? 1, 
        "created_at" =>$this->resource->created_at->format("Y-m-d h:i:s"),
        "avatar" => env("APP_URL")."storage/".$this->resource -> avatar,
        'profesion'=>$this->resource-> profesion,
        'description'=>$this->resource-> description
           
        ];
    }
}
