const classContainer = document.getElementById('classContainer');

function openModal() {
    document.getElementById('addClassModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('addClassModal').style.display = 'none';
}

function deleteClass(classBox) {
    classContainer.removeChild(classBox); // Remove the class box from the container
    updateLocalStorage(); // Update local storage after deletion
}

function navigateToClassroom () {
    window.location.href = "https://classroom.google.com/h";
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


function createClass() {
    const className = document.getElementById('className').value;
    const teacher = document.getElementById('teacher').value;
    const subject = document.getElementById('subject').value;
    const room = document.getElementById('room').value;
    const createButton = document.getElementById('createButton');

    if (className && teacher && subject && room) {
        // Create a new class box element
        const classBox = document.createElement('div');
        classBox.className = 'class-box';
        classBox.innerHTML = `
            <div class="mainText">
                <h3>Class Details:</h3>
                <p><strong>Class Name:</strong> ${className}</p>
                <p><strong>Teacher:</strong> ${teacher}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Room:</strong> ${room}</p>
            </div>
            <button class="button" data-tooltip="Delete Class" onclick="deleteClass(this.parentNode)">
                <div class="circle"></div>
                <img src="UI/TrashCan.png" alt="Trash Icon" style="margin-top: 6px;">
            </button>
            <button class="button" data-tooltip="Download Class" onclick="downloadClass(this.parentNode)">
                <div class="circle"></div>
                <img class="upside-down-arrow" src="UI/Arrow.png" alt="Arrow Icon" style="margin-top: 7px;">
            </button>
            <button class="button" data-tooltip="Open Class" onclick="navigateToClass('Class', '?class=${className}')">
                <div class="circle"></div>
                <img src="UI/Door.png" alt="Door Icon" style="margin-top: 5px;">
            </button>
        `;

        // Append the new class box to the container
        classContainer.appendChild(classBox);

        // Reset input fields
        document.getElementById('className').value = '';
        document.getElementById('teacher').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('room').value = '';

        closeModal();

        // Not all fields are filled, disable the "Create" button
        createButton.setAttribute('disabled', 'disabled');

        // Update local storage after adding a new class
        updateLocalStorage();
    }
}


function downloadClass(classBox) {
    const classInfo = classBox.querySelector('.mainText').innerText;
    const encodedClassInfo = btoa(classInfo); // Encode the class information

    const blob = new Blob([encodedClassInfo], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'class_info.txt';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function updateLocalStorage() {
    const classList = [];
    const classBoxes = classContainer.getElementsByClassName('class-box');
    for (const classBox of classBoxes) {
        classList.push(classBox.innerHTML);
    }
    localStorage.setItem('classData', JSON.stringify(classList));
}

function loadClassesFromLocalStorage() {
    const classData = localStorage.getItem('classData');
    if (classData) {
        const classList = JSON.parse(classData);
        for (const classHTML of classList) {
            const classBox = document.createElement('div');
            classBox.className = 'class-box';
            classBox.innerHTML = classHTML;
            classContainer.appendChild(classBox);
        }
    }
}

// Load classes from local storage when the page loads
window.addEventListener('load', loadClassesFromLocalStorage);

// Add event listeners to check for input changes
const inputFields = document.querySelectorAll('.input-field input');
inputFields.forEach(function (input) {
    input.addEventListener('input', checkInputs);
});

function checkInputs() {
    const className = document.getElementById('className').value;
    const teacher = document.getElementById('teacher').value;
    const subject = document.getElementById('subject').value;
    const room = document.getElementById('room').value;
    const createButton = document.getElementById('createButton');

    if (className && teacher && subject && room) {
        // All fields are filled, enable the "Create" button
        createButton.removeAttribute('disabled');
    } else {
        // Not all fields are filled, disable the "Create" button
        createButton.setAttribute('disabled', 'disabled');
    }
}

// Define a list of valid page names
const validPageNames = ["Home", "Class", "Signup", "Error404"];

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

function navigateToClass(pageName, newURL) {
    // Check if the requested page name is in the list of valid page names
    if (validPageNames.includes(pageName)) {
        // Page exists, navigate to it
        const filePath = pageName + ".html" + newURL;
        window.location.href = filePath;
    } else {
        // Page doesn't exist, redirect to Error404.html
        window.location.href = "Error404.html";
    }
}

// Function to extract URL parameters
function getParameterByName(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

function openFileUploader() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt'; // Limit file type to .txt
    input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            readAndCreateClass(file);
        }
    });
    input.click();
}

function readAndCreateClass(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const encodedClassInfo = event.target.result;
        try {
            const classInfo = atob(encodedClassInfo); // Decode the class information
            createClassFromFileContent(classInfo);
        } catch (error) {
            alert("Error: Could not decode the class information. Please make sure the file is in the correct format.");
        }
    };
    reader.readAsText(file);
}

function createClassFromFileContent(classInfo) {
    const lines = classInfo.split('\n');
    
    // Initialize variables to store class information
    let className = '';
    let teacher = '';
    let subject = '';
    let room = '';

    // Loop through each line of classInfo
    for (const line of lines) {
        // Split each line into key and value
        const parts = line.split(':');
        if (parts.length === 2) {
            const key = parts[0].trim();
            const value = parts[1].trim();
            
            // Map the values to the appropriate variable
            if (key === 'Class Name') {
                className = value;
            } else if (key === 'Teacher') {
                teacher = value;
            } else if (key === 'Subject') {
                subject = value;
            } else if (key === 'Room') {
                room = value;
            }
        }
    }

    // Create a new class box element
    const classBox = document.createElement('div');
    classBox.className = 'class-box';
    classBox.innerHTML = `
        <div class="mainText">
            <h3>Class Details:</h3>
            <p><strong>Class Name:</strong> ${className}</p>
            <p><strong>Teacher:</strong> ${teacher}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Room:</strong> ${room}</p>
        </div>
        <button class="button" data-tooltip="Delete Class" onclick="deleteClass(this.parentNode)">
            <div class="circle"></div>
            <img src="UI/TrashCan.png" alt="Trash Icon" style="margin-top: 6px;">
        </button>
        <button class="button" data-tooltip="Download Class" onclick="downloadClass(this.parentNode)">
            <div class="circle"></div>
            <img class="upside-down-arrow" src="UI/Arrow.png" alt="Arrow Icon" style="margin-top: 7px;">
        </button>
        <button class="button" data-tooltip="Open Class" onclick="navigateToClass('Class', '?class=${className}')">
            <div class="circle"></div>
            <img src="UI/Door.png" alt="Door Icon" style="margin-top: 5px;">
        </button>
    `;

    // Append the new class box to the container
    classContainer.appendChild(classBox);

    // Update local storage after adding a new class
    updateLocalStorage();
}