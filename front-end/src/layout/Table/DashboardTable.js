import React from "react";
import { finishTable } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";

/**
 * Defines the dashboard all tables component.
 *
 * @returns {JSX.Element}
 */
function DashboardTable({
  loadAllReservations,
  loadDashboard,
  loadTables,
  tables,
  tablesError,
  setTablesError,
}) {
  async function finishClick(event) {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      const reservationTableIds = event.target.value.split(",");

      Promise.all([
        finishTable(
          reservationTableIds[0],
          reservationTableIds[1],
          abortController.signal
        ),
      ])
        .then(loadTables)
        .then(loadAllReservations)
        .then(loadDashboard)
        .catch(setTablesError);
      return () => abortController.abort();
    } else {
    }
  }

  return (
    <main className="border-left">
      <div className="mb-3 container-fluid">
        <h4 className="mb-0 text-center">Tables</h4>
      </div>
      <ErrorAlert error={tablesError} />
      <div className="d-flex flex-wrap container-fluid justify-content-center">
        {tables.map((table) => (
          <div
            className="border border-secondary d-flex flex-column p-3 col table text-center"
            key={table.table_id}
          >
            <h4 className="mb-0 pt-3">
              {table.table_name} - {table.capacity}
            </h4>

            <p data-table-id-status={table.table_id} className="occupied ">
              {table.occupied ? "Occupied" : "Free"}
            </p>
            <p className="text-center">
              {table.occupied ? `Res. #${table.reservation_id}` : null}
            </p>
            {table.occupied ? <button
              className="btn btn-outline-primary bg-white"
              onClick={finishClick}
              value={[table.table_id, table.reservation_id]}
              data-table-id-finish={table.table_id}
              data-reservation-id-status={table.reservation_id}
            >
              Finish
            </button> : null}
          </div>
        ))}
      </div>
    </main>
  );
}

export default DashboardTable;
