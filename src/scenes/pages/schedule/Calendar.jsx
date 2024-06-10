import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../theme";
import { toast } from "react-toastify";
// Components
import Header from "../../../components/Header";
// API Calls
import { addSchedule, deleteScheduleById } from "../../../services/scheduleService";

const Calendar = ({initialEvents}) => {
  const { user } = useContext(AuthContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleDateClick = async (selected) => {
    const title = prompt("Please enter a new title for your event");

    if (title) {
      const data = {
        user_id: user.id,
        title: title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      };

      onAddEvent(data, selected);
    }
  };

  const onAddEvent = async (data, selected) => {
    try {
      const res = await addSchedule(data);
      if (res.status === 201) {
        const newEvent = { ...data, id: res.data.ScheduleId };
        setCurrentEvents((prevEvents) => [...prevEvents, newEvent]);

        const calendarApi = selected.view.calendar;
        calendarApi.unselect();

        calendarApi.addEvent(newEvent);
        toast.success("Schedule created successfully.");
      } else {
        toast.warning("Sorry. Your action didn't work. \nTry again.");
      }
    } catch (error) {
      console.error("Server Error:", error);
      toast.error("Oop! Network Connection Error.");
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      // Delete the event from the calendar
      console.log("Deleting event...", selected);
      onDeleteEvent(selected);
    }
  };

  const onDeleteEvent = async (selected) => {
    try {
      const res = await deleteScheduleById(selected.event.id);
      if (res.status === 201) {
        setCurrentEvents((prevEvents) =>
          prevEvents.filter((item) => item.id !== selected.event.id)
        );
        selected.event.remove();
        toast.success(res.data.message);
      } else {
        toast.warning("Sorry. Your action didn't work. \nTry again.");
      }
    } catch {
      toast.error("Oop! Network Connection Error.");
    }
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
          sx={{ height: "75vh", overflow: "auto" }}
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
                onClick={() => handleEventClick({ event })}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            // eventClick={handleEventClick}
            eventsSet={(events) => {
              setCurrentEvents(events.map(event => ({
                id: event.id,
                title: event.title,
                start: event.start,
                end: event.end,
                allDay: event.allDay,
              })));
            }}
            initialEvents={initialEvents}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
