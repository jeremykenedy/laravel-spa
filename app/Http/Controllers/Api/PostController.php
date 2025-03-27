<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Posts\DeletePostRequest;
use App\Http\Requests\Posts\RestorePostRequest;
use App\Http\Requests\Posts\ShowPostRequest;
use App\Http\Requests\Posts\StorePostRequest;
use App\Http\Resources\Posts\PostResource;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
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

        if (! in_array($orderColumn, ['id', 'title', 'created_at'])) {
            $orderColumn = 'created_at';
        }

        $orderDirection = request('order_direction', 'desc');

        if (! in_array($orderDirection, ['asc', 'desc'])) {
            $orderDirection = 'desc';
        }

        $posts = Post::with('media')
            ->when(request('search_category'), function ($query) {
                if (request('search_category')) {
                    return $query->where(function ($q) {
                        return $q->whereHas('categories', function ($q1) {
                            $categories = explode(',', request('search_category'));
                            $q1->whereIn('id', $categories);
                        });
                    });
                }
            })
            ->when(request('search_id'), function ($query) {
                return $query->where('id', request('search_id'));
            })
            ->when(request('search_title'), function ($query) {
                return $query->where('title', 'like', '%'.request('search_title').'%');
            })
            ->when(request('search_content'), function ($query) {
                return $query->where('content', 'like', '%'.request('search_content').'%');
            })
            ->when(request('search_global'), function ($query) {
                return $query->where(function ($q) {
                    return $q->where('id', request('search_global'))
                        ->orWhere('title', 'like', '%'.request('search_global').'%')
                        ->orWhere('content', 'like', '%'.request('search_global').'%');
                });
            })
            ->when(! auth()->user()->hasPermission('Can Edit Articles'), function ($query) {
                return $query->where('user_id', auth()->id());
            })

            ->orderBy($orderColumn, $orderDirection)
            ->paginate($per);

        return PostResource::collection($posts);
    }

    public function store(StorePostRequest $request)
    {
        $validatedData = $request->validated();
        $validatedData['user_id'] = auth()->id();
        $post = Post::create($validatedData);

        $categories = explode(',', $request->categories);
        $category = Category::findMany($categories);
        $post->categories()->attach($category);

        if ($request->hasFile('thumbnail')) {
            $post->addMediaFromRequest('thumbnail')->preservingOriginal()->toMediaCollection('images');
        }

        return new PostResource($post);
    }

    public function show(ShowPostRequest $request, Post $post)
    {
        if ($post->user_id !== auth()->user()->id && ! auth()->user()->hasPermission('Can View Articles')) {
            return response()->json(['status' => 405, 'success' => false, 'message' => 'You can only edit your own posts']);
        } else {
            return new PostResource($post);
        }
    }

    public function update(StorePostRequest $request, Post $post)
    {
        if ($post->user_id !== auth()->id() && ! auth()->user()->hasPermission('Can Edit Articles')) {
            return response()->json(['status' => 405, 'success' => false, 'message' => 'You can only edit your own posts']);
        } else {
            $post->update($request->validated());

            $category = Category::findMany($request->categories);
            $post->categories()->sync($category);

            return new PostResource($post);
        }
    }

    public function destroy(DeletePostRequest $request, Post $post)
    {
        if ($post->user_id !== auth()->id() && ! auth()->user()->hasPermission('delete.articles')) {
            return response()->json([
                'status'    => 405,
                'success'   => false,
                'message'   => 'You can only delete your own posts',
            ]);
        } else {
            $post->delete();

            return response()->noContent();
        }
    }

    public function restorePost(RestorePostRequest $request, Post $post)
    {
        $post->restore();

        return response()->json($post);
    }

    public function destroyPost(DeletePostRequest $request, Post $post)
    {
        $post->forceDelete();

        return response()->json($post);
    }

    public function getPosts()
    {
        $posts = Post::with('categories')->with('media')->latest()->paginate();

        return PostResource::collection($posts);
    }

    public function getCategoryByPosts($id)
    {
        $posts = Post::whereRelation('categories', 'category_id', '=', $id)->paginate();

        return PostResource::collection($posts);
    }

    public function getPost($id)
    {
        return Post::with('categories', 'user', 'media')->findOrFail($id);
    }
}
