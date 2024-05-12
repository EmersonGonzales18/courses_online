<?php

namespace App\Http\Controllers\Admin\Course;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\Course\Course;
use App\Models\Course\Categorie;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\Course\CourseGCollection;
use App\Http\Resources\Course\CourseGResource;
use App\Models\User;

class CourseGController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $search = $request -> search;
        $state = $request -> state;
        
        //filterAdvance($search ,$state)->
        $courses = Course::orderBy("id", "desc")->get();

        return response()->json([
            "courses" => CourseGCollection::make($courses),
            

        ]);
    }

    public function config(){
        $categories = Categorie::where("categorie_id", NULL)->orderBy("id","desc")->get();
        $instructores = User::where("role_id", 2)->orderBy("id","desc")->get();
        return response()->json([
            "categories" => $categories,
            "instructores" => $instructores->map(function($user){
                return [
                    "id" => $user->id,
                    "full_name"=> $user->name.' '.$user->lastname
                ];
            }),
            
            
        ]);

        
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //Almacenamiento de imagnes
        if($request-> hasFile("portada")){
            $path = Storage::putFile("courses",$request->file("portada"));
            $request ->request->add(["imagen" => $path]);
        }
        //ejemplo Desarrollo Movil => Desarrollo-Movil
        $request->request->add(["slug"=> Str::slug($request->title)]);

        $request->request->add(["slug"=> json_encode($request->requirements)]);
        $request->request->add(["slug"=> json_encode($request->who_is_it_for)]);

        $course = Course::create($request->all());
        return response()->json(["course" => CourseGResource::make($course)]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {   
        $course = Course::findOrFail($id);
        //Almacenamiento de imagnes
        if($request-> hasFile("portada")){
            if($course->imagen){
                Storage::delete($course->imagen);
            }
            $path = Storage::putFile("courses",$request->file("portada"));
            $request ->request->add(["imagen" => $path]);
        }
                //ejemplo Desarrollo Movil => Desarrollo-Movil
        $request->request->add(["slug"=> Str::slug($request->title)]);

        $request->request->add(["slug"=> json_encode($request->requirements)]);
        $request->request->add(["slug"=> json_encode($request->who_is_it_for)]);
        $course -> update($request->all());
        return response()->json(["course" => CourseGResource::make($course)]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $course = Course::findOrFail($id);
        $course -> delete();
        return response()->json(["message" => 200]);
    }
}
