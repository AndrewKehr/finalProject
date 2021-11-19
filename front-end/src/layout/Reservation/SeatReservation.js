import React from "react";
import { reservationStatusUpdate } from "../../utils/api";

function SeatReservation({ reservation }) {
  async function handleCancel(event) {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      await reservationStatusUpdate(
        event.target.value,
        "cancelled",
        abortController.signal
      );
      window.location.reload();
      return () => abortController.abort();
    } else {
    }
  }
  return (
    <div>
      <h4 className="mb-0">Reservation #{reservation.reservation_id}</h4>
      <p className="mb-0">
        {reservation.first_name} {reservation.last_name}
      </p>
      <p className="mb-0">{reservation.mobile_number}</p>
      <p className="mb-0">Date: {reservation.reservation_date}</p>
      <p className="mb-0">Time: {reservation.reservation_time}</p>
      <p className="mb-0">Party Size: {reservation.people}</p>
      <p data-reservation-id-status={reservation.reservation_id}>
        Status: {reservation.status}
      </p>
      <div className="d-flex justify-content-around ">
        
        <a
          href={`/reservations/${reservation.reservation_id}/seat`}
          className="btn btn-primary m-1"
          hidden={!(reservation.status === "booked")}
        >
          Seat
        </a>

        <a
          href={`/reservations/${reservation.reservation_id}/edit`}
          className="btn btn-secondary m-1"
          hidden={!(reservation.status === "booked")}
        >
          Edit
        </a>
        
        <button
          onClick={handleCancel}
          className="btn btn-warning bg-white m-1"
          value={reservation.reservation_id}
          data-reservation-id-cancel={reservation.reservation_id}
          hidden={reservation.status === "cancelled"||"finished"}
        >
          Cancel
        </button>

      </div>
    </div>
  );
}
export default SeatReservation;
