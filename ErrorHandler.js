function PingError(customMessage = "", section = "", referencia = null) {
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

    // Collecting current timestamp
    const timestamp = new Date().toISOString();

    // Capture any error stack trace or message (if available)
    const errorStack = (custom1 instanceof Error) ? custom1.stack : null;

    // Placeholder for console errors or messages
    const consoleMessages = [];
    const originalConsoleError = console.error;
    console.error = function (...args) {
        consoleMessages.push(args.join(" "));
        originalConsoleError.apply(console, args); // Preserve original behavior
    };

    // Data to send in the POST request
    const data = {
        timestamp,
        browserInfo,        // Browser and system information
        consoleMessages,    // Console errors/messages captured
        customMessage,      // Custom message provided manually
        section,            // Section of code where the error occurred
        referencia,
        custom2,
        errorStack,         // Stack trace if custom1 is an Error object
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


PingError(
    "Unexpected input format",        // Custom error message
    "UserFormValidation",             // Section name
    { referencia: referencia }        // Custom input 1 (e.g., problematic input data)
);
