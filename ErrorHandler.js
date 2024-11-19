function PingError({ referencia = "", message = "", section = "", defcon = "" } = {}) {
    // Collecting browser and system info
    const browserInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        cookiesEnabled: navigator.cookieEnabled,
        onlineStatus: navigator.onLine,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
    };

    // Current timestamp
    const timestamp = new Date().toISOString();

    // Capturing any error stack trace if available
    const errorStack = new Error().stack;

    // Placeholder for console messages
    const consoleMessages = [];
    const originalConsoleError = console.error;
    console.error = function (...args) {
        consoleMessages.push(args.join(" "));
        originalConsoleError.apply(console, args); // Preserve original behavior
    };

    // Data to send in the POST request
    const data = {
        timestamp,
        browserInfo,
        consoleMessages,  // Any captured console errors
        message,          // Custom error message
        section,          // Section of the code
        defcon,           // Defcon level (1-5)
        referencia,       // Reference string (7 characters)
        errorStack,       // Stack trace for debugging
    };

    // POST request to the error webhook
    fetch("https://n8n.sacacitas.com/webhook/error-ping", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).catch((err) => {
        // Log if the ping itself fails
        originalConsoleError("Error pinging error webhook:", err);
    });
}

// Example usage in another function
PingError({
    referencia: "ab12345", // 7-character string
    message: "When completing the form to pay, something went wrong.",
    section: "CompleteFormToPayLinkUnico",
    defcon: "1",
});

