// Select all elements with class "dropdown", "dropdown-arrow", and "dropdown-menu"
const dropdowns = document.querySelectorAll(".dropdown");
const dropdownMenus = document.querySelectorAll(".dropdown-menu");
const showClass = "show"; // CSS class used to display the dropdown menu

// Function to handle mouse enter event for dropdowns on large screens
function handleDropdownHover(event) {
  const targetDropdown = event.currentTarget;
  targetDropdown.classList.add(showClass); // Add "show" class to display the dropdown menu
  targetDropdown
    .querySelector(".dropdown-arrow")
    .setAttribute("aria-expanded", "true");
  targetDropdown.querySelector(".dropdown-menu").classList.add(showClass);
  adjustDropdownPosition();
}

// Function to handle click event for dropdowns on small screens
function handleDropdownClick(event) {
  const targetDropdown = event.currentTarget;
  const isActive = targetDropdown.classList.contains(showClass);

  // Toggle the "show" class for the dropdown and dropdown-menu elements
  targetDropdown.classList.toggle(showClass, !isActive);
  const menu = targetDropdown.querySelector(".dropdown-menu");
  if (menu) {
    menu.classList.toggle(showClass, !isActive);
  }
}

// Function to attach/detach event listeners based on window width
function handleWindowResize() {
  if (window.matchMedia("(min-width: 768px)").matches) {
    // On larger screens, show dropdowns on hover and remove click event listeners
    dropdowns.forEach(function (dropdown) {
      dropdown.removeEventListener("click", handleDropdownClick);
      dropdown.addEventListener("mouseenter", handleDropdownHover);
      dropdown.addEventListener("mouseleave", hideDropdown);
    });
    adjustDropdownPosition();

  } else {
    // On smaller screens, show dropdowns on click and remove hover event listeners
    dropdowns.forEach(function (dropdown) {
      dropdown.removeEventListener("mouseenter", handleDropdownHover);
      dropdown.removeEventListener("mouseleave", hideDropdown);
      dropdown.addEventListener("click", handleDropdownClick);
    });
  }
}

// Function to handle mouse leave event for dropdowns
function hideDropdown(event) {
  const targetDropdown = event.currentTarget;
  targetDropdown.classList.remove(showClass); // Remove "show" class to hide the dropdown menu
  targetDropdown
    .querySelector(".dropdown-arrow")
    .setAttribute("aria-expanded", "false");
  targetDropdown.querySelector(".dropdown-menu").classList.remove(showClass);
}

// Function to adjust the position of the dropdown menu relative to the navbar
function adjustDropdownPosition() {
  // Get the dropdown menu and navbar elements
  const dropdown = document.querySelector(".dropdown-menu");

  // Get the bounding rectangle of the dropdown menu and viewport width
  const dropdownRect = dropdown.getBoundingClientRect();
  const viewportWidth = document.documentElement.clientWidth;

  // Calculate the left and right positions for the dropdown menu
  const dropdownLeft = dropdownRect.left;
  const dropdownRight = viewportWidth - dropdownRect.right;

  // If the left edge is out of view, align with the left edge of the viewport
  if (dropdownLeft < 0) {
    dropdown.style.left = "0";
    dropdown.style.right = "auto";
  }
  // If the right edge is out of view, align with the right edge of the viewport
  else if (dropdownRight < 0) {
    dropdown.style.right = "0";
    dropdown.style.left = "auto";
  }
  // If both edges are within view, reset styles to default
  else {
    dropdown.style.left = "auto";
    dropdown.style.right = "auto";
  }
}
// Add event listeners for page load and window resize events
window.addEventListener("load", handleWindowResize);
window.addEventListener("resize", handleWindowResize);
