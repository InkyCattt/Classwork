const classContainer = document.getElementById('classCategoryContainer');

function openCategoryModal() {
    document.getElementById('addCategoryModal').style.display = 'block';
}

function closeCategoryModal() {
    document.getElementById('addCategoryModal').style.display = 'none';
}

function deleteCategory(categoryBox) {
    classContainer.removeChild(categoryBox); // Remove the class box from the container
    updateLocalStorage('class-category-box', classContainer);
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

function openAddAssignmentsModal(ID) {
    document.getElementById('addAssignmentsModal').style.display = 'block';;
}

function closeAddAssignmentsModal() {
    document.getElementById('addAssignmentsModal').style.display = 'none';
}

// Add event listeners to check for input changes
const inputFieldsAssignments = document.querySelectorAll('.input-field-assignemnt input');
inputFieldsAssignments.forEach(function (input) {
    input.addEventListener('input', checkInputsAssignment);
});

function checkInputsAssignment() {
    const assignmentName = document.getElementById('assignmentName').value;
    const link = document.getElementById('link').value;
    const addButton = document.getElementById('addButton');

    if (assignmentName && link) {
        // All fields are filled, enable the "Create" button
        addButton.removeAttribute('disabled');
    } else {
        // Not all fields are filled, disable the "Create" button
        addButton.setAttribute('disabled', 'disabled');
    }
}

function deleteAssignment(assignmentBox, categoryContainer) {
    categoryContainer.removeChild(assignmentBox); // Remove the assignment box from the container
    updateLocalStorage('class-assignment-box', classContainer);
}

function addAssignment() {
    const assignmentName = document.getElementById('assignmentName').value;
    const link = document.getElementById('link').value;

    if (assignmentName && link) {
        let imageSrc;

        // Determine the type of document based on the link
        if (link.includes("docs.google.com/presentation")) {
            imageSrc = "UI/Icons/Slides.png";
        } else if (link.includes("docs.google.com/sites")) {
            imageSrc = "UI/Icons/Sites.png";
        } else if (link.includes("docs.google.com/sheets")) {
            imageSrc = "UI/Icons/Sheets.png";
        } else if (link.includes("docs.google.com/drawings")) {
            imageSrc = "UI/Icons/Drawings.png";
        } else if (link.includes("docs.google.com/forms")) {
            imageSrc = "UI/Icons/Forms.png";
        } else if (link.includes("docs.google.com/document")) {
            imageSrc = "UI/Icons/Docs.png";
        } else {
            // Default image if not matching any of the types
            imageSrc = "UI/Icons/Default.png";
        }

        const assignmentBox = document.createElement('div');
        assignmentBox.className = 'class-assignment-box';
        assignmentBox.innerHTML = `
            <a href="${link}" target="_blank">
                <div class="assignment-image">
                    <img src="${imageSrc}" alt="Assignment Image">
                </div>
                <div class="assignment-name">
                    <p>${assignmentName}</p>
                </div>
            </a>
            <button class="button" data-tooltip="Delete Assignment" onclick="deleteAssignment(this.parentNode)">
                <div class="circle"></div>
                <img src="UI/TrashCan.png" alt="Trash Icon" style="margin-top: 6px;">
            </button>
        `;

        classContainer.appendChild(assignmentBox);

        document.getElementById('assignmentName').value = '';
        document.getElementById('link').value = '';

        closeAddAssignmentsModal();

        // Update local storage after adding a new assignment
        const assignmentList = [];
        const assignmentBoxes = classContainer.getElementsByClassName('class-assignment-box');
        for (const assignmentBox of assignmentBoxes) {
            assignmentList.push(assignmentBox.innerHTML);
        }
        localStorage.setItem(assignmentLocalStorageKey, JSON.stringify(assignmentList));
    }
}

function navigateToClassroom () {
    window.location.href = "https://classroom.google.com/h";
}

// Add event listeners to check for input changes
const inputFieldsClass = document.querySelectorAll('.input-field-class input');
inputFieldsClass.forEach(function (input) {
    input.addEventListener('input', checkInputs);
});

function checkInputs() {
    const categoryName = document.getElementById('categoryName').value;
    const information = document.getElementById('information').value;
    const createButton = document.getElementById('createButton');

    if (categoryName && information) {
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

// Parse the URL parameters to check for the 'class' parameter
const urlParams = new URLSearchParams(window.location.search);
const classNameParam = urlParams.get('class');

function createCategory() {
    const categoryName = document.getElementById('categoryName').value;
    const information = document.getElementById('information').value;

    if (categoryName && information) {
        const categoryBox = document.createElement('div');
        categoryBox.className = 'class-category-box';
        categoryBox.id = categoryName;
        categoryBox.innerHTML = `
            <div class="mainText">
                <p class="CName"<strong>Category Name:</strong> ${categoryName}</p>
                <p><strong>Information:</strong> ${information}</p>
            </div>
            <button class="button" data-tooltip="Delete Category" onclick="deleteCategory(this.parentNode)">
                <div class="circle"></div>
                <img src="UI/TrashCan.png" alt="Trash Icon" style="margin-top: 6px;">
            </button>
            <button class="button" data-tooltip="Add Assignments" onclick="openAddAssignmentsModal()">
                <div class="circle"></div>
                <img src="UI/Plus.png" alt="Plus Icon"">
            </button>
        `;

        classCategoryContainer.appendChild(categoryBox);

        document.getElementById('categoryName').value = '';
        document.getElementById('information').value = '';

        closeCategoryModal();
        createButton.setAttribute('disabled', 'disabled');

        // Update local storage after adding a new category
        const categoryList = [];
        const categoryBoxes = classContainer.getElementsByClassName('class-category-box');
        for (const categoryBox of categoryBoxes) {
            categoryList.push(categoryBox.innerHTML);
        }
        localStorage.setItem(classNameParam, JSON.stringify(categoryList));
    }
}

// Update local storage
function updateLocalStorage(dataKey, container) {
    const items = [];
    const itemsInContainer = container.getElementsByClassName(dataKey);
    for (const item of itemsInContainer) {
        items.push(item.innerHTML);
    }
    localStorage.setItem(classNameParam, JSON.stringify(items));
}

// Function to load category data based on the class parameter
function loadFromLocalStorage(className) {
    // Load categories from local storage
    const categoryData = localStorage.getItem(className);
    if (categoryData) {
        const categoryList = JSON.parse(categoryData);
        for (const categoryHTML of categoryList) {
            const categoryBox = document.createElement('div');
            categoryBox.className = 'class-category-box';
            categoryBox.innerHTML = categoryHTML;
            classContainer.appendChild(categoryBox);
        }
    }
}

// Load categories from local storage when the page loads
window.addEventListener('load', function() {
    if (classNameParam) {
        loadFromLocalStorage(classNameParam);
        // Handle the class parameter, e.g., display it on the page
    }
});
