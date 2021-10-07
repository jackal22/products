<?php
namespace App\Http\Controllers;
use App\Models\Sales;
use Illuminate\Http\Request;

class SalesController extends Controller {
	public function index() {
		$products = Sales::all()->toArray();
		return array_reverse($products);
	}

	public function store(Request $request) {
		$product = new Sales([
			'quantity' => $request->input('quantity'),
			'totalsales' => $request->input('totalsales'),
		]);
		$product->save();

		return response()->json('Sales created!');
	}

	public function show($id) {
		$product = Sales::find($id);
		return response()->json($product);
	}

	public function update($id, Request $request) {
		$product = Sales::find($id);
		$product->update($request->all());

		return response()->json('Sales updated!');
	}

	public function destroy($id) {
		$product = Sales::find($id);
		$product->delete();

		return response()->json('Sales deleted!');
	}
}