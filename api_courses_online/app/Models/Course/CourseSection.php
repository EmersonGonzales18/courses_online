<?php

namespace App\Models\Course;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CourseSection extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'name',
        'course_id',
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

    public function course(){
        return $this->belongsTo(Course::class);
    }

    public function clases(){
        return $this->hasMany(CourseClase::class, "course_section_id");
    }

}
