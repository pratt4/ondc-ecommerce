import React from "react";

function AddressSection({
  street,
  neighbourhood,
  city,
  county,
  state,
  zipcode,
  country,
}) {
  return (
    <>
      <p>
        <strong>Street:</strong> {street}
      </p>
      <p>
        <strong>Neighbourhood:</strong> {neighbourhood}
      </p>
      <p>
        <strong>City:</strong> {city}
      </p>
      <p>
        <strong>County:</strong> {county}
      </p>
      <p>
        <strong>State:</strong> {state}
      </p>
      <p>
        <strong>Zip/Postcode:</strong> {zipcode}
      </p>
      <p>
        <strong>Country:</strong> {country}
      </p>
    </>
  );
}

export default AddressSection;
