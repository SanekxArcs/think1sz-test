

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Get the form data from the request
    const formData = await request.formData();

    // Uncoment below to send data to external API
    // The external endpoint is fictional, so we'll just simulate a successful response

    // Start
    // const response = await fetch("http://letsworkout.pl/submit", {
    //   method: "POST",
    //   body: formData,
    //   // You might need headers depending on the external API requirements
    //   headers: {
    //     // No Content-Type header as it will be set automatically for FormData
    //   },
    // });
    // const responseData = await response.json();
    // console.log("External API response:", responseData);
    // End

    // In a real application, we would check response.ok and handle accordingly
    // Return a successful response



    // Process the form data
    const formEntries = Object.fromEntries(formData.entries());
    // Log the received data (you can replace this with database storage or other processing)
    console.log("Form submission received:", formEntries);

    // Here you would typically:
    // 1. Validate the data
    // 2. Store it in a database
    // 3. Send confirmation emails, etc.

    // For demonstration, we'll just log the field names we received
    const receivedFields = Object.keys(formEntries);

    // Return a successful response with the received data summary
    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
      receivedFields,
      timestamp: new Date().toISOString(),
      resetSuccessAfter: 5000, // Tell the client to reset success state after 5 seconds
    });
  } catch (error) {
    console.error("Error processing form submission:", error);
    return NextResponse.json(
      { success: false, message: "Error processing form submission" },
      { status: 500 }
    );
  }
}
