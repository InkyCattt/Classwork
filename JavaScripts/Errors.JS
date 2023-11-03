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

function openContactModal() {
    document.getElementById('contactModal').style.display = 'block';
}

function closeContactModal() {
    document.getElementById('contactModal').style.display = 'none';
}

// Add event listeners to check for input changes
const contactInputFields = document.querySelectorAll('.input-field-contact input');
contactInputFields.forEach(function (input) {
    input.addEventListener('input', checkInputsContact);
});

function checkInputsContact() {
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const gmail = document.getElementById('gmail').value;
    const message = document.getElementById('message').value;
    const sendButton = document.getElementById('sendButton');

    if (fname && lname && gmail && message) {
        // All fields are filled, enable the "Create" button
        sendButton.removeAttribute('disabled');
    } else {
        // Not all fields are filled, disable the "Create" button
        sendButton.setAttribute('disabled', 'disabled');
    }
}
