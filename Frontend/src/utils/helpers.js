// Format time to HH:MM
export const formatTime = (time) => {
  if (!time) return "";
  const date = new Date(`1970-01-01T${time}`);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

// Generate readable ticket ID
export const formatTicketId = (id) => {
  return `T-${id}`;
};

// Get congestion label color
export const getCrowdColor = (crowdLevel) => {

  switch (crowdLevel) {
    case "Low":
      return "bg-green-500";

    case "Medium":
      return "bg-yellow-500";

    case "High":
      return "bg-red-500";

    default:
      return "bg-gray-500";
  }

};