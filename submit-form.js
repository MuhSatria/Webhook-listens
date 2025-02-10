exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }; // Only accept POST
  }

  try {
    const formData = JSON.parse(event.body); // Parse the form data

    // 1. Validate and sanitize formData (VERY IMPORTANT!)
    if (!formData.name || !formData.email || !formData.message) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing required fields" }) };
    }

    const { name, email, message } = formData; // Destructure for easier use

    // Sanitize input (example - adapt to your needs)
    const sanitizedName = name.replace(/[^a-zA-Z0-9 ]/g, ""); // Remove special chars
    const sanitizedEmail = email.trim(); // Remove leading/trailing spaces
    const sanitizedMessage = message.replace(/<[^>]*>/g, ""); // Remove HTML tags

    // 2. Log the data (for testing)
    console.log("Form Data Received:", { 
      name: sanitizedName, 
      email: sanitizedEmail, 
      message: sanitizedMessage 
    });

    // 3. Interact with your backend (CMS, database, email, etc.)
    //    This is where you'd send the data.  For this example, we'll just simulate:

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
