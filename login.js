// Login Page Script

$(document).ready(function () {
    $("#login-form").submit(function(event) {
        event.preventDefault();
        const username = $("#username").val();
        const password = $("#password").val();
        // Implement login validation logic here (e.g., check credentials on the server).
        // For the example, we'll assume successful login and redirect to the reservation page.
        window.location.href = "reservation.html";
    });
});
