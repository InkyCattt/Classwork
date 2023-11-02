// Define a list of valid page names
const validPageNames = ["Home", "Class", "Signup", "Error404"];

function navigateToClassroom () {
    window.location.href = "https://classroom.google.com/h";
}

function navigateTo(pageName) {
    // Check if the requested page name is in the list of valid page names
    if (validPageNames.includes(pageName)) {
        // Page exists, navigate to it
        const filePath = pageName + ".html";
        window.location.href = filePath;
    } else {
        // Page doesn't exist, redirect to Error404.html
        window.location.href = "Error404.html";
    }
}
