<?php

namespace App\Traits;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;

trait ApiResponser {

    protected function successResponse($data, $code=200){
        $status = true;
        $response = compact('status', 'data');
        return response()->json($response, $code);
    }

    protected function errorResponse($message, $code, $data=null){
        $status = false;
        $response = compact('status', 'message', 'data', 'code');
        return response()->json($response, $code);
    }

    protected function showAll(Collection $data, $code = 200){
        $status = true;
        $response = compact('status', 'data');
        return $this->successResponse($response, $code);
    }

    protected function showOne(Model $data, $code = 200){
        $status = true;
        $response = compact('status', 'data');
        return $this->successResponse($response, $code);
    }
}