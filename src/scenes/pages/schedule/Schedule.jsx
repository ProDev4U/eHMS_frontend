import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
// Components
import Calendar from "./Calendar";
// API Calls
import { getScheduleByUserId } from "../../../services/scheduleService";

const Schedule = () => {
  const { user } = useContext(AuthContext);
  const [initialEvents, setInitialEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Introduce loading state

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const tmp_data = await getScheduleByUserId(user.id);
        console.log(tmp_data);
        setInitialEvents(tmp_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchSchedule();
  }, [user.id]); // Make sure to include user.id in the dependency array

  return (
    // Render Calendar component only when loading is false
    !loading && <Calendar initialEvents={initialEvents} />
  );
};

export default Schedule;
