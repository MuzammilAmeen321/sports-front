<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
class ContactController extends Controller
{
    public function store(Request $request) {
        // Validate request
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string',
        ]);

        // Save data to database
        $contact = Contact::create($validatedData);

        // Return response
        return response()->json([
            'success' => true,
            'message' => 'Contact form submitted successfully!',
            'data' => $contact
        ], 201);
    }
}
