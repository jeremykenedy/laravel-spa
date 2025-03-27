<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Categories\DeleteCategoryRequest;
use App\Http\Requests\Categories\RestoreCategoryRequest;
use App\Http\Requests\Categories\ShowCategoryRequest;
use App\Http\Requests\Categories\StoreCategoryRequest;
use App\Http\Requests\Categories\UpdateCategoryRequest;
use App\Http\Resources\Categories\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');

        try {
            ob_start('ob_gzhandler');
        } catch (\Exception $e) {
            //
        }
    }

    public function index(Request $request)
    {
        $per = 50;

        if ($request->has('per')) {
            $per = $request->input('per');
        }

        $orderColumn = request('order_column', 'created_at');

        if (! in_array($orderColumn, ['id', 'name', 'created_at'])) {
            $orderColumn = 'created_at';
        }

        $orderDirection = request('order_direction', 'desc');

        if (! in_array($orderDirection, ['asc', 'desc'])) {
            $orderDirection = 'desc';
        }

        $categories = Category::with([
            'posts:id,title',
        ])
            ->when(request('search_id'), function ($query) {
                $query->where('id', request('search_id'));
            })
            ->when(request('search_title'), function ($query) {
                $query->where('name', 'like', '%'.request('search_title').'%');
            })
            ->when(request('search_global'), function ($query) {
                $query->where(function ($q) {
                    $q->where('id', request('search_global'))
                        ->orWhere('name', 'like', '%'.request('search_global').'%');
                });
            })
            ->orderBy($orderColumn, $orderDirection)
            ->paginate($per);

        return CategoryResource::collection($categories);
    }

    public function store(StoreCategoryRequest $request)
    {
        $category = Category::create($request->validated());

        return new CategoryResource($category);
    }

    public function show(ShowCategoryRequest $request, Category $category)
    {
        return new CategoryResource($category);
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,'.$category->id,
        ]);

        $category->update($request->validated());

        return new CategoryResource($category);
    }

    public function destroy(DeleteCategoryRequest $request, Category $category)
    {
        $category->delete();

        return response()->noContent();
    }

    public function restoreCategory(RestoreCategoryRequest $request, Category $category)
    {
        $category->restore();

        return response()->json($category);
    }

    public function destroyCategory(DeleteCategoryRequest $request, Category $category)
    {
        $category->forceDelete();

        return response()->json($category);
    }

    public function getList()
    {
        return CategoryResource::collection(Category::all());
    }
}
