// script.js

// Function to handle appointment form submission
function submitAppointmentForm(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const appointmentDate = document.getElementById('appointmentDate').value;

    // Validate form values
    if (!name || !email || !appointmentDate) {
        alert('Please fill in all fields.');
        return;
    }

    // Additional validation (e.g., email format)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // If validation passes, submit the form (or perform an action)
    alert('Appointment has been successfully submitted!');
    // Here you can add the code to send data to the server
}

// Event listener for form submission
document.getElementById('appointmentForm').addEventListener('submit', submitAppointmentForm);
