// Load contacts from localStorage or start with an empty array
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
let editIndex = null;

// Save contacts to localStorage
function saveContacts() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

document.getElementById('add-contact-btn').addEventListener('click', () => {
    document.getElementById('add-contact-form').style.display = 'flex';
});

document.getElementById('cancel-btn').addEventListener('click', () => {
    document.getElementById('add-contact-form').style.display = 'none';
});

document.getElementById('save-contact-btn').addEventListener('click', () => {
    const fullName = document.getElementById('fullName').value;
    const mobile = document.getElementById('mobile').value;
    const email = document.getElementById('email').value;

    if (fullName && mobile && email) {
        const contact = { fullName, mobile, email };
        contacts.push(contact);
        saveContacts();
        displayContacts();
        document.getElementById('fullName').value = '';
        document.getElementById('mobile').value = '';
        document.getElementById('email').value = '';
        document.getElementById('add-contact-form').style.display = 'none';
    } else {
        alert('Please fill in all fields.');
    }
});

function displayContacts() {
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';
    contacts.forEach((contact, index) => {
        const contactDiv = document.createElement('div');
        contactDiv.classList.add('contact');
        contactDiv.innerHTML = `
            <div class="contact-fields">
                <span class="contact-name"><strong>Full Name:</strong> ${contact.fullName}</span>
                <span class="contact-mobile"><strong>Mobile:</strong> ${contact.mobile}</span>
                <span class="contact-email"><strong>Email:</strong> ${contact.email}</span>
            </div>
            <div class="contact-buttons">
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
        `;
        contactList.appendChild(contactDiv);
    });

    // Edit button functionality
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = this.getAttribute('data-index');
            showEditForm(idx);
        });
    });

    // Delete button functionality
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = this.getAttribute('data-index');
            if (confirm('Are you sure you want to delete this contact?')) {
                contacts.splice(idx, 1);
                saveContacts();
                displayContacts();
            }
        });
    });
}

function showEditForm(index) {
    editIndex = index;
    const contact = contacts[index];
    document.getElementById('edit-fullName').value = contact.fullName;
    document.getElementById('edit-mobile').value = contact.mobile;
    document.getElementById('edit-email').value = contact.email;
    document.getElementById('edit-contact-form').style.display = 'flex';
}

document.getElementById('cancel-edit-btn').addEventListener('click', () => {
    document.getElementById('edit-contact-form').style.display = 'none';
});

document.getElementById('update-contact-btn').addEventListener('click', () => {
    const fullName = document.getElementById('edit-fullName').value;
    const mobile = document.getElementById('edit-mobile').value;
    const email = document.getElementById('edit-email').value;
    if (fullName && mobile && email && editIndex !== null) {
        contacts[editIndex] = { fullName, mobile, email };
        saveContacts();
        displayContacts();
        document.getElementById('edit-contact-form').style.display = 'none';
        editIndex = null;
    } else {
        alert('Please fill in all fields.');
    }
});

// Display contacts on page load
displayContacts();
