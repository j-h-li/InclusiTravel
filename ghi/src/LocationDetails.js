import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import useToken from "@galvanize-inc/jwtdown-for-react";
function LocationDetails() {
  const [location, setLocations] = useState({});
  const [accessibilities, setaccessibilities] = useState([]);
  const { token } = useToken();
  const { locationId } = useParams();

  async function fetchLocation() {
    console.log(locationId);
    const url = `${process.env.REACT_APP_API_HOST}/api/locations/${locationId}`;

    const response = await fetch(url);
    console.log(locationId);
    if (response.ok) {
      const data = await response.json();
      setLocations(data);
    }
  }

  async function fetchAccessibilities() {
    console.log(locationId);
    const accessabilityUrl = `${process.env.REACT_APP_API_HOST}/api/locations/${locationId}/accessibilities`;

    const response = await fetch(accessabilityUrl);
    if (response.ok) {
      const accData = await response.json();
      setaccessibilities(accData.accessibilities);
    }
  }

  async function handleDelete(event) {
    event.preventDefault();
    const url = `${process.env.REACT_APP_API_HOST}/api/locations/${locationId}/`;
    const fetchConfig = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const locactionDelete = await fetch(url, fetchConfig);
  }

  useEffect(() => {
    fetchLocation();
    fetchAccessibilities();
  }, []);

  return (
    <>
      <div>
        <p>{location.location_name}</p>
        <p>{location.address}</p>
        <p>{location.city}</p>
        <p>{location.state}</p>
      </div>
      <div>
        {accessibilities.map((accessibility) => (
          <div key={accessibility.id}>
            <p>{accessibility.name}</p>
          </div>
        ))}
      </div>
      <button onClick={handleDelete} className="btn btn-primary">
        delete
      </button>
    </>
  );
}
export default LocationDetails;