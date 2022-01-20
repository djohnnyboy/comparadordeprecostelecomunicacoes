<?php

namespace App\Http\Controllers;

use App\Locality;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LocalityController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => 
                ['index','edit', 'store', 'update', 'destroy']]);
        $this->locality = new Locality();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $localities = $this->locality::all();
        if ($localities) {
            return response()->json($localities, 201);
        } else {
            $errors = 'Something went wrong!';
            return response()->json($errors, 201);
        }
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'name' => ['required', 'string','bail','unique:localities'],
            'postCode' => ['required', 'string','unique:localities'],
        ]);
        
        $localities = $this->locality::create([
            'name' => $validateData['name'],
            'postCode' => $validateData['postCode'],
        ]); 

        return response()->json('Locality created');  
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Locality  $locality
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $localities = $this->locality::where('id',$id)->first();
        if ($localities) {
            return response()->json($localities, 201);
        }else{
            return response()->json('reload', 201);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Locality  $locality
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Locality $locality,$id)
    {
        $validateData = $request->validate([
            'name' => ['required', 'string','bail'],
            'postCode' => ['required', 'numeric']
        ]);
        
        $locality = $this->locality::where('id', $id)
            ->update([
                'name' => $validateData['name'],
                'postCode' => $validateData['postCode']
        ]);
        
        return response()->json('Locality created'); 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Locality  $locality
     * @return \Illuminate\Http\Response
     */
    public function destroy(Locality $locality)
    {
        //
    }
}
