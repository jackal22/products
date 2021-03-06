<?php
namespace App\Http\Controllers;
use App\Models\product;
use Illuminate\Http\Request;

class ProductController extends Controller {
	public function index() {
		$products = Product::all()->toArray();
		return array_reverse($products);
	}

	public function store(Request $request) {
		$product = new Product([
			'products' => $request->input('products'),
			'stocks' => $request->input('stocks'),
			'price' => $request->input('price'),

		]);
		$product->save();

		return response()->json('Products Added!');
	}

	public function show($id) {
		$product = Product::find($id);
		return response()->json($product);
	}

	public function update($id, Request $request) {
		$product = Product::find($id);
		$product->update($request->all());

		return response()->json('Product updated!');
	}

	public function destroy($id) {
		$product = Product::find($id);
		$product->delete();

		return response()->json('Product deleted!');
	}
}
