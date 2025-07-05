import { Link } from "react-router-dom";
import useAdmin from "../../hooks/useUser";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Paging from "../../components/Paging";

const NotificationView = () => {
  const { Notification } = useAdmin();
  const NotificationData = useSelector((state) => state.auth.notificationdata);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [billsPerPage] = useState(10);
  const [filter, setFilter] = useState("all"); // Track the filter type (all, read, unread)

  useEffect(() => {
    Notification();
  }, []);

  const reversedNotificationData = [...NotificationData].reverse();

  // Function to handle page change
  const onPageChanged = (data) => {
    setCurrentPage(data.currentPage); // Set the current page
  };

  // Filter notifications based on the selected filter (all, read, unread)
  const filteredNotifications = reversedNotificationData.filter((item) => {
    if (filter === "all") return true;
    return filter === "unread" ? item.status === "unread" : item.status === "read";
  });

  // Calculate current notifications to display
  const indexOfLastNotification = currentPage * billsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - billsPerPage;
  const currentNotifications = filteredNotifications.slice(indexOfFirstNotification, indexOfLastNotification);

  return (
    <div className="container mb-3">
      <h4 className="my-3 text-center text-primary">Notifications</h4>

      {/* Filter buttons */}
      <div className="d-flex justify-content-center mb-3">
        <button
          className={`btn btn-sm me-2 ${filter === "all" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`btn btn-sm me-2 ${filter === "read" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setFilter("read")}
        >
          Read
        </button>
        <button
          className={`btn btn-sm ${filter === "unread" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setFilter("unread")}
        >
          Unread
        </button>
      </div>

      <div className="list-group shadow-lg rounded-lg">
        {currentNotifications.length > 0 ? (
          currentNotifications.map((item, index) => (
            <Link
              key={index}
              to={item.link || "/"}
              className={`list-group-item list-group-item-action rounded-3 shadow-sm my-3 p-4 ${
                item.type === "custom"
                  ? "bg-gradient-to-r from-success-300 via-success-400 to-success-500 text-white"
                  : item.type === "danger"
                  ? "bg-gradient-to-r from-danger-300 via-danger-400 to-danger-500 text-white"
                  : "bg-gradient-to-r from-light-300 via-light-400 to-light-500"
              }`}
              style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                borderRadius: "15px",
              }}
            >
              <div className="d-flex w-100 justify-content-between align-items-start">
                <div className="w-75">
                  <h5 className="mb-2">
                    <i
                      className={`bi bi-${
                        item.type === "system" ? "info-circle-fill" : "bell-fill"
                      }`}
                    />{" "}
                    {item.type || "Notification"}
                  </h5>
                  <p className="mb-2" style={{ whiteSpace: "normal" }}>
                    {item.message}
                  </p>
                </div>
                <div className="d-flex flex-column align-items-end w-25">
                  <span className="small text-muted">
                    <i className="bi bi-clock"></i>{" "}
                    {new Date(item.createdAt).toLocaleString()}
                  </span>
                  {item.status === "unread" && (
                    <span className="badge bg-warning text-dark mt-2">
                      Unread
                    </span>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <span
                  className={`badge text-white ${
                    item.priority === "high"
                      ? "bg-danger"
                      : item.priority === "medium"
                      ? "bg-warning"
                      : "bg-success"
                  }`}
                >
                  {item.priority === "high" && (
                    <i className="bi bi-exclamation-circle-fill"></i>
                  )}{" "}
                  {item.priority || "Normal"}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center">
            <p className="text-muted">No notifications available.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <Paging
        totalRecords={filteredNotifications.length}
        pageLimit={billsPerPage}
        pageNeighbours={1}
        onPageChanged={onPageChanged} // Ensure handler is working
      />
    </div>
  );
};

export default NotificationView;
