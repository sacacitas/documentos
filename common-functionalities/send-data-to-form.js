$("[go-to-form-services]").click(function () {
    // Get the last path segment of the current page URL
    let lastPathSegment = window.location.pathname.split('/').filter(Boolean).pop();

    // Redirect to the form page with the last path segment as a parameter
    window.location.href = `https://sacacitas.webflow.io/services/form?ref=${encodeURIComponent(lastPathSegment)}`;
});
