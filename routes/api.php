<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
}); 

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', 'UserController@login');
    Route::post('logout', 'UserController@logout');
    Route::post('register', 'UserController@register');

});

Route::post('companies','CompanyController@index');
Route::post('companyNew','CompanyController@store');
Route::post('company/{id}/edit','CompanyController@edit'); 
Route::put('company/{id}','CompanyController@update');
Route::delete('company/{id}','CompanyController@destroy'); 

Route::post('products','ProductController@index');
Route::post('productNew','ProductController@store');
Route::post('product/{id}/edit','ProductController@edit'); 
Route::put('product/{id}','ProductController@update');
Route::delete('product/{id}','ProductController@destroy' ); 

Route::post('productsQuery', 'ProductQueryController@productQuery');

Route::post('localities','LocalityController@index');
Route::post('localityNew','LocalityController@store');
Route::post('locality/{id}/edit','LocalityController@edit'); 
Route::put('locality/{id}','LocalityController@update');
Route::delete('locality/{id}','LocalityController@destroy'); 


Route::post('extras','ExtraController@index');
Route::post('extraNew','ExtraController@store');
Route::post('extra/{id}/edit','ExtraController@edit'); 
Route::put('extra/{id}','ExtraController@update');
Route::delete('extra/{id}','ExtraController@destroy'); 

Route::post('query','QueryController@show');
Route::post('queryNew','QueryController@store'); 
Route::post('queryCoverage', 'QueryController@coverage');