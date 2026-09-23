function MainModule(listingsID = "#listings") {
  const me = {};


  const listingsElement = document.querySelector(listingsID);

  function getListingCode(listing) {
  const amenitiesList = JSON.parse(listing.amenities);
  const amenitiesPreview = amenitiesList.slice(0, 5).join(", ");

  // Creative addition: tag each listing by how many amenities it offers
  const amenityCount = amenitiesList.length;
  let tierLabel = "Basic";
  let tierColor = "secondary";
  if (amenityCount > 20) {
    tierLabel = "Fully Loaded";
    tierColor = "success";
  } else if (amenityCount > 10) {
    tierLabel = "Well Equipped";
    tierColor = "info";
  }

  return `<div class="col-4">
  <div class="listing card">
    <img
      src="${listing.picture_url}"
      class="card-img-top"
      alt="${listing.name}"
    />
    <div class="card-body">
      <h5 class="card-title">${listing.name}</h5>
      <span class="badge bg-${tierColor}">${tierLabel}</span>
      <p class="card-text">${listing.description}</p>
      <p><strong>Amenities:</strong> ${amenitiesPreview}...</p>
      <div class="d-flex align-items-center">
        <img src="${listing.host_picture_url}" alt="${listing.host_name}" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 8px;" />
        <span>Hosted by ${listing.host_name}</span>
      </div>
      <p><strong>${listing.price}</strong> / night</p>
    </div>
  </div>
  </div>
  `;
}

  function redraw(listings) {
    listingsElement.innerHTML = "";
    // for (let i = 0; i < listings.length; i++) {
    //   listingsElement.innerHTML += getListingCode(listings[i]);
    // }

    // for (let listing of listings) {
    //   console.log("listing", listing );
    //   listingsElement.innerHTML += getListingCode(listing);
    // }

    listingsElement.innerHTML = listings.map(getListingCode).join("\n");
  }

  async function loadData() {
    const res = await fetch("./airbnb_sf_listings_500.json");
    const listings = await res.json();


    me.redraw(listings.slice(0, 50));
  }

  me.redraw = redraw;
  me.loadData = loadData;

  return me;
}

const main = MainModule();


main.loadData();