<?php

namespace App\Http\Controllers\Book;

use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Models\Book;

class BookController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $books = Book::with('category')->where(['deleted' => 0])->orderBy('name')->paginate(5);
        return $this->successResponse($books);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $rules = [
                'name' => 'required|string',
                'category_id' => 'required|integer',
                'author' => 'required|string',
                'publication_date' => 'required|date',
            ];
    
            $validatedData = $request->validate($rules);
            $data = $request->all();
    
            $model = Book::create($data);
    
            return $this->successResponse(compact('model'),201);
        }
        catch (\Illuminate\Database\QueryException $exception) {
            $errorInfo = $exception->errorInfo;
            return $this->errorResponse($errorInfo, 500);
        }
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $book = Book::find($id);
            if($book == null){
                return $this->errorResponse("Record does not exist.", 500);
            }
            $rules = [
                'name' => 'string',
                'category_id' => 'integer',
                'author' => 'string',
                'publication_date' => 'date',
                'available' => 'integer'
            ];
    
            $validatedData = $request->validate($rules);
            $data = $request->all();
    
            $book->fill($data);
            $res = $book->save();
            return $this->successResponse($book,200);
        }
        catch (\Illuminate\Database\QueryException $exception) {
            $errorInfo = $exception->errorInfo;
            return $this->errorResponse($errorInfo, 500);
        }
        catch (\Exception $exception) {
            $errorInfo = $exception->errorInfo;
            return $this->errorResponse($errorInfo, 500);
        }
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
    }
}
