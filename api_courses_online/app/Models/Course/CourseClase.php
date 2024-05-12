<?php

namespace App\Models\Course;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CourseClase extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'course_section_id',
        'name',
        'vimeo_id',
        'time',
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

    
    public function course_section(){
        return $this->belongsTo(CourseSection::class);
    }

    public function files(){
        return $this->hasMany(CourseClaseFile::class, "course_clase_id");
    }

}
