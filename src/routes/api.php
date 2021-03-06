<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Book\BookController;
use App\Http\Controllers\CategoryController;
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

Route::group(['namespace' => 'Book'], function () {
    Route::get('book', [BookController::class, 'index']);
    Route::post('book', [BookController::class, 'store']);
    Route::put('book/{id}', [BookController::class, 'update']);

});

Route::get('category', [CategoryController::class, 'index']);