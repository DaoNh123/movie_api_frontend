const submitCategories = (event) => {
    event.preventDefault();
  // Get all checked checkboxes
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

  // Extract values from checked checkboxes
  const checkedValues = Array.from(checkboxes).map((checkbox) => checkbox.value);

  console.log(checkedValues);
};
