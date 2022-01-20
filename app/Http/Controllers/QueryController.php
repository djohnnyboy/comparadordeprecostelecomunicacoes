<?php

namespace App\Http\Controllers;

use Auth;
use App\Query;
use App\Product;
use App\Company;
use App\Locality;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class QueryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['store', 'show']]);
        $this->query = new Query();
        $this->product = new Product();
        $this->locality = new Locality();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $allLocalities = $this->locality::all();
        $postCodeVerification = false;
        $validateData = $request->validate([
            'contractTime' => ['required', 'numeric','bail'],
            'email' => ['required', 'email','bail'],
            'number' => ['required','numeric','digits_between:1,15','bail'],
            'channels' => ['required', 'numeric','bail'],
            'internetGb' => ['required', 'numeric','bail'],
            'phones' => ['required','numeric','bail'],
            'postCode' => ['required','numeric',
                            'digits:4',
                            'bail'],
            'postCodeAux' => ['required','numeric',
                            'digits:3'],
        ]);
        
        $query = $this->query::create([
            'contractTime' => $validateData['contractTime'],
            'email' => $validateData['email'],
            'number' => $validateData['number'],
            'internetGb' => $validateData['internetGb'],
            'phones' => $validateData['phones'],
            'channels' => $validateData['channels'],
            'postCode' => $validateData['postCode'],
            'postCodeAux' => $validateData['postCodeAux'],
        ]);
        foreach ($allLocalities as $locality) {
            if ($query->postCode == $locality->postCode) {
                $postCodeVerification = true;
            }
        }

        if ($postCodeVerification) {
            $products = $this->product::where('internetGb','<=',$query->internetGb)
                    ->where('channels','<=',$query->channels)
                    ->where('phones' . $query->phones, '!=', null)
                    ->orderBy('phones' . $query->phones,'ASC')->get();
                                            
                return response()->json( ['products' => $products,
                    'phones' => $query->phones ], 201); 
        }else{
            $products = $this->product::where('internetGb','<=',$query->internetGb)
                    ->where('zoneIn', 0)
                    ->where('channels','<=',$query->channels)
                    ->where('phones' . $query->phones, '!=', null)
                    ->orderBy('phones' . $query->phones,'ASC')->get();
                                            
                return response()->json( ['products' => $products,
                    'phones' => $query->phones ], 201);  
        }
         
    }
}
