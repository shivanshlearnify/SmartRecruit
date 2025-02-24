import * as React from "react";
import ReactDOM from "react-dom/client";
//import Alert from "@mui/material/Alert";
//import CheckIcon from "@mui/icons-material/Check";

function SimpleAlert({ content, severity }) {
  return (
    <div
      className={`${severity === 'success' ? 'bg-green-700': 'bg-red-400' } w-[350px] h-[70px] max-h-[150px] text-white px-[15px] py-[10px] rounded-md`}
    >
      {content}
    </div>
  );
}

const showSuccessToast = (content) => {
  if (typeof window === "undefined") {
    return;
  }

  // Create a container div for the alert
  const alertContainer = document.createElement("div");
  alertContainer.style.position = "fixed";
  alertContainer.style.top = "0";
  alertContainer.style.right = `0`;
  alertContainer.style.margin = "50px";
  alertContainer.style.zIndex = 20;
  document.body.appendChild(alertContainer);

  // Create a root and render SimpleAlert inside the container
  const root = ReactDOM.createRoot(alertContainer);
  root.render(<SimpleAlert content={content} severity={"success"} />);

  // Remove the alert after 3 seconds
  setTimeout(() => {
    root.unmount();
    document.body.removeChild(alertContainer);
  }, 3000);
};

const showErrorToast = (content) => {
  if (typeof window === "undefined") {
    return;
  }

  // Create a container div for the alert
  const alertContainer = document.createElement("div");
  alertContainer.style.position = "fixed";
  alertContainer.style.top = "0";
  alertContainer.style.right = `0`;
  alertContainer.style.margin = "50px";
  alertContainer.style.zIndex = 20;
  document.body.appendChild(alertContainer);

  // Create a root and render SimpleAlert inside the container
  const root = ReactDOM.createRoot(alertContainer);
  root.render(<SimpleAlert content={content} severity={"error"} />);

  // Remove the alert after 3 seconds
  setTimeout(() => {
    root.unmount();
    document.body.removeChild(alertContainer);
  }, 3000);
};

export default SimpleAlert;
export { showSuccessToast, showErrorToast };
