$(document).ready(function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const zipCode = urlParams.get("PostalCode");
  console.log(urlParams.has(PostalCode));
});
