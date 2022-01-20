<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Query extends Model
{
    protected $table = "queries";
    protected $fillable = [
        'id',
        'contractTime',
        'email',
        'number',
        'channels',
        'internetGb',
        'landline',
        'phones',
        'postCode',
        'postCodeAux',
    ];
}
