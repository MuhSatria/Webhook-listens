// functions/submit-form.js (Netlify Function)
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }; // Only allow POST requests
  }

  try {
    const formData = JSON.parse(event.body); // Parse the form data

    // 1. Validate and sanitize formData (VERY IMPORTANT!)
    if (!formData.name || !formData.email || !formData.message) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing required fields" }) };
    }

    // 2. (Example) Log the data (for testing)
    console.log("Form Data Received:", formData);

    // 3. (Crucial) Interact with your backend (CMS, database, email service, etc.)
    //    This is where you'd send the form data to where it needs to go.
    //    Since we're focusing on the webhook, I'll just simulate a successful response:

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Form submitted successfully!" }),
    };


  } catch (error) {
    console.error("Error submitting form:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
