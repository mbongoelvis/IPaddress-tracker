// for the map
var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
L.marker([51.513, -0.09])
  .addTo(map)
  .bindPopup("Here is the location")
  .openPopup();

// when the user clicks then this function is executed
const searchip = () => {
  const address = document.querySelector(".domain").value;
  const country = document.querySelector(".country");
  const ipaddress = document.querySelector(".ipaddress");
  const timezone = document.querySelector(".timezone");
  const isp = document.querySelector(".isps");

  if (address == "") {
    alert("field is empty");
  } else {
    const cores = "https://cors-anywhere.herokuapp.com/";

    const headers = {
      "Access-Control-Allow-Origin": "*",
    };

    console.log(address);
    const API =
      cores +
      "https://geo.ipify.org/api/v2/country,city?apiKey=at_tGMJ0hYLeAcA87tAZfg7QTfiLpOT3&ipAddress=" +
      `${address}`;
    fetch(API, headers)
      .then((data) => {
        return data.json();
      })
      .then((finaldata) => {
        //   address
        ipaddress.textContent = finaldata.ip;
        //   location section
        country.textContent =
          finaldata.location.region +
          "," +
          finaldata.location.city +
          finaldata.location.postalCode;
        //   time section
        timezone.textContent = finaldata.location.timezone;
        //   isp section
          isp.textContent = finaldata.isp;
          

          L.marker([finaldata.location.lat, finaldata.location.lng])
            .addTo(map)
            .bindPopup(finaldata.ip)
            .openPopup();
      })
      .catch((err) => {
        alert("enter valid ip address");
      });
  }
};
