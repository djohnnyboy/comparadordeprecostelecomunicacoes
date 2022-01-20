<?php

namespace App\Http\Controllers;

use App\Company;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class CompanyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index','edit', 'store', 'update', 'destroy']]);
        $this->company = new Company();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $companies = $this->company::all();
        if ($companies) {
            return response()->json($companies, 201);
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
            'name' => ['required', 'string','bail','unique:companies'],
            'nif' => ['required', 'numeric','bail','unique:companies'],
            'agent' => ['required', 'string','bail'],
            'phone' => ['required', 'numeric'],
            'image' => ['image|mimes:jpeg,png,jpg,gif','svg|max:120'],
        ]);
        
        $companies = $this->company::create([
            'name' => $validateData['name'],
            'nif' => $validateData['nif'],
            'agent' => $validateData['agent'],
            'phone' => $validateData['phone'],
        ]); 
        return response()->json('Company created');  
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
        $companies = $this->company::where('id',$id)->first();
        if ($companies) {
            return response()->json($companies, 201);
        }else{
            return response()->json('reload', 201);
        } 
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
        $validateData = $request->validate([
            'name' => ['required', 'string','bail'],
            'nif' => ['required', 'numeric','bail'],
            'agent' => ['required', 'string','bail'],
            'phone' => ['required', 'numeric'],
        ]);
        
        $companies = $this->company::where('id', $id)
            ->update([
            'name' => $validateData['name'],
            'nif' => $validateData['nif'],
            'agent' => $validateData['agent'],
            'phone' => $validateData['phone'],
        ]);

        return response()->json('Company created');  
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $companies = $this->company::findOrFail($id);
        $companies->delete();
        return response()->json('Company deleted');
    }
}
