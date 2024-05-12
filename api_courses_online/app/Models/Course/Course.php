<?php

namespace App\Models\Course;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;

class Course extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'title',
        'subtitle',
        'slug',
        'imagen',
        'precio_usd',
        'precio_pen',
        'categorie_id',
        'user_id',
        'level',
        'idioma',
        'vimeo_id',
        'time',
        'description',
        'requirements',
        'who_is_it_for',
        'state'
    ];
    
    //Ingresar la fecha de creacion auto de Laravel
    public function setCreatedAttribute($value){
        date_default_timezone_set("America/Lima");
        $this->attributes["created_at"] = Carbon::now();
    }

    public function setUpdatedAttribute($value){
        date_default_timezone_set("America/Lima");
        $this->attributes["updated_at"] = Carbon::now();
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function categorie(){
        return $this->belongsTo(User::class);
    }

    public function sections(){
        return $this->hasMany(CourseSection::class);
    }
}
