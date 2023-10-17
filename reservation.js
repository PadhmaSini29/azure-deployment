const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");


$(document).ready(function () {
    // Function to show/hide the selected movie's poster
    function showMoviePoster(selectedMovie) {
        $(".movie-poster").hide();
        $("#" + selectedMovie + "-poster").show();
    }

    // Function to set the movie rating
    function setMovieRating(rating) {
        // Add a class to the selected stars to fill them
        $(".star-rating .fa-star").removeClass("fa-star-filled");
        $(".star-rating .fa-star[data-value='" + rating + "']").addClass("fa-star-filled");
    }

    // Initial setup to clear any previous rating and hide posters
    setMovieRating(0);
    $(".movie-poster").hide();

    // Event handler for movie selection
    $("#movie-selection").change(function () {
        const selectedMovie = $(this).val();
        showMoviePoster(selectedMovie);
    });

    // Event handler for clicking on stars
    $(".star-rating .fa-star").click(function () {
        const rating = $(this).data("value");
        setMovieRating(rating);

        document.addEventListener("DOMContentLoaded", function () {
  const starContainers = document.querySelectorAll(".star-rating");

  starContainers.forEach((container) => {
    const rating = parseFloat(container.getAttribute("data-rating"));

    // Round the rating to the nearest 0.5
    const roundedRating = Math.round(rating * 2) / 2;

    for (let i = 0; i < 5; i++) {
      const star = document.createElement("span");
      star.classList.add("star");

      if (i + 0.5 <= roundedRating) {
        star.classList.add("full");
      } else if (i <= roundedRating) {
        star.classList.add("half");
      } else {
        star.classList.add("empty");
      }

      container.appendChild(star);
    }
  });
});

    });


populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}


// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        console.log(seat.classList.add("selected"));
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
    console.log(selectedMovieIndex)
  }
}
console.log(populateUI())
// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("sold")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();

});
