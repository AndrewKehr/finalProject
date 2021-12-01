import React, { useState } from "react";
import ErrorAlert from "../../layout/ErrorAlert";
import { searchReservation } from "../../utils/api";
import SeatReservation from "./SeatReservation";

/**
 * Defines the create reservation page.
 * @param today date of today
 * @param updateDate function to update date displayed on dashboard
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function SearchReservation() {
  const initialFormState = {
    mobile_number: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [reservationsError, setReservationsError] = useState(null);
  const [reservations, setReservations] = useState([]);

  const handleChange = ({ target }) => {
    setReservationsError(null);
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  async function handleSearch(event) {
    setReservationsError(null);
    event.preventDefault();
    try {
      const abortController = new AbortController();

      const searchResults = await searchReservation(
        formData,
        abortController.signal
      );

      if (searchResults.length) {
        setReservations(searchResults);
      } else {
        setReservations([]);
        throw new Error("No reservations found");
      }
    } catch (error) {
      setReservationsError(error);
    }
  }

  return (
    <main className="container-fluid m-auto ">
      <h1>Search Reservations</h1>
      <div className="d-md-flex mb-3 container-fluid">
        <form className="column">
          <label>
            Enter Mobile Number
            <br />
            <input
              type="tel"
              id="mobile_number"
              name="mobile_number"
              required
              minLength="1"
              maxLength="10"
              value={formData.mobile_number}
              onChange={handleChange}
              className="w-100"
              placeholder="555-555-1234"
            />
          </label>
          <button type="submit" onClick={handleSearch} className="btn btn-primary rounded-pill m-1">
              Find
            </button>
        </form>
      </div>
      <ErrorAlert error={reservationsError} />
      <div className="d-flex flex-wrap justify-content-center">
        {reservations.map((reservation) => (
          <div
            className="d-md-flex flex-column border border-dark rounded p-3 col-sm-4 col-md-3 m-3 reservation-all"
            key={reservation.reservation_id}
          >
            <SeatReservation reservation={reservation} />
          </div>
        ))}
      </div>
    </main>
  );
}
export default SearchReservation;
