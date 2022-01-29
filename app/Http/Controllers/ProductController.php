<?php

namespace App\Http\Controllers;

use App\Company;
use App\Product;
use App\Locality;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index','edit', 'store', 'update', 'destroy']]);
        $this->product = new Product();
        $this->company = new Company();
        $this->locality = new Locality();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       $products = $this->product::all();
       #$channels = $this->product::orderBy('channels','desc')->distinct()->get('channels');
       #$internetGb = $this->product::orderBy('internetGb','desc')->distinct()->get('internetGb');
       $channels = $this->product::orderBy('channels','desc')->distinct()->first();
       $internetGb = $this->product::orderBy('internetGb','desc')->distinct()->first();
       
       $locality = $this->locality::all();
        if ($channels) {
            return response()->json([
                                'channels' => $channels->channels, 
                                'internetGb' => $internetGb->internetGb, 
                                'products' => $products,
                                'localities' => $locality],
                                201);
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
            'name' => ['required', 'string','bail'],
            'discount' => ['required','regex:/^\d+(\.\d{1,2})?$/','bail'],
            'discountTime' => ['required','numeric','bail'],
            'zoneIn' => ['required','boolean','bail'],
            'channels' => ['required', 'numeric','bail'],
            'internetGb' => ['required', 'numeric','bail'],
            'landLine' => ['required','string','bail'],
            'connection' => ['required','string','bail'],
            'companyName' => ['required','string','bail'],
            'company_id' => ['required','numeric','bail'],
            'phones0' => ['nullable','regex:/^\d+(\.\d{1,2})?$/','bail'],
            'phones1' => ['nullable','regex:/^\d+(\.\d{1,2})?$/','bail'],
            'phones2' => ['nullable','regex:/^\d+(\.\d{1,2})?$/','bail'],
            'phones3' => ['nullable','regex:/^\d+(\.\d{1,2})?$/','bail'],
            'phones4' => ['nullable','regex:/^\d+(\.\d{1,2})?$/'],
        ]);
        $companyName = $this->company::findOrFail($validateData['company_id']);

        $products = $this->product::create([
            'name' => $validateData['name'],
            'discount' => $validateData['discount'],
            'discountTime' => $validateData['discountTime'],
            'zoneIn' => $validateData['zoneIn'],
            'channels' => $validateData['channels'],
            'internetGb' => $validateData['internetGb'],
            'landLine' => $validateData['landLine'],
            'connection' => $validateData['connection'],
            'companyName' => $companyName->name,
            'company_id' => $validateData['company_id'],
            'phones0' => $validateData['phones0'],
            'phones1' => $validateData['phones1'],
            'phones2' => $validateData['phones2'],
            'phones3' => $validateData['phones3'],
            'phones4' => $validateData['phones4'],
        ]); 

        return response()->json('Product created');  
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $products = $this->product::where('id',$id)->first();
        if ($products) {
            return response()->json($products, 201);
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
            'discount' => ['required','regex:/^\d+(\.\d{1,2})?$/','bail'],
            'discountTime' => ['required','numeric','bail'],
            'zoneIn' => ['required','boolean','bail'],
            'channels' => ['required', 'numeric','bail'],
            'internetGb' => ['required', 'numeric','bail'],
            'landLine' => ['required','string','bail'],
            'connection' => ['required','string'],
            'phones0' => ['nullable','regex:/^\d+(\.\d{1,2})?$/','bail'],
            'phones1' => ['nullable','regex:/^\d+(\.\d{1,2})?$/','bail'],
            'phones2' => ['nullable','regex:/^\d+(\.\d{1,2})?$/','bail'],
            'phones3' => ['nullable','regex:/^\d+(\.\d{1,2})?$/','bail'],
            'phones4' => ['nullable','regex:/^\d+(\.\d{1,2})?$/','bail'],
        ]);
        
        $products = $this->product::where('id', $id)
            ->update([
                'name' => $validateData['name'],
                'discount' => $validateData['discount'],
                'discountTime' => $validateData['discountTime'],
                'zoneIn' => $validateData['zoneIn'],
                'channels' => $validateData['channels'],
                'internetGb' => $validateData['internetGb'],
                'landLine' => $validateData['landLine'],
                'connection' => $validateData['connection'],
                'phones0' => $validateData['phones0'],
                'phones1' => $validateData['phones1'],
                'phones2' => $validateData['phones2'],
                'phones3' => $validateData['phones3'],
                'phones4' => $validateData['phones4'],
        ]);

        return response()->json('Company created'); 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id){

        $Products = $this->product::findOrFail($id);
        $Products->delete();
        return response()->json('Product deleted');
    }
}
