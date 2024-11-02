function oAltaCategorie() {
  const categorieSelect = document.getElementById("categorie");
  const otherCategoryDiv = document.getElementById("otherCategoryDiv");

  if (categorieSelect.value === "Altele") {
    otherCategoryDiv.classList.remove("hidden");
  } else {
    otherCategoryDiv.classList.add("hidden");
  }
}
