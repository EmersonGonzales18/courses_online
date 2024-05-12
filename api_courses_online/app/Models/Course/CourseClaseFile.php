<?php

namespace App\Models\Course;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseClaseFile extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'course_clase_id',
        'name_file',
        'size',
        'time',
        'resolution',
        'file',
        'type'
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
}
