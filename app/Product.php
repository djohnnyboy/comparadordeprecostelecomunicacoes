<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = "products";
    protected $fillable = [
        'id',
        'discount',
        'discountTime',
        'name',
        'zoneIn',
        'price',
        'channels',
        'internetGb',
        'landLine',
        'connection',
        'companyName',
        'company_id',
        'phones0',
        'phones1',
        'phones2',
        'phones3',
        'phones4',
    ];
    public function Company(){
        return $this->belongsTo('App\Company');
    } 
}