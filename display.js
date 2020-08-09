$(document).ready(function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const zipCode = urlParams.get("PostalCode");
  console.log(zipCode);
  const latLongUrl =
    "https://public.opendatasoft.com//api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=" +
    zipCode;
  $.ajax({
    url: latLongUrl,
    method: "GET",
  }).then((response) => {
    console.log(response);
  });
});
