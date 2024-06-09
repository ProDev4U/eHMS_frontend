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
import { getScheduleByUserId, addSchedule,  deleteScheduleById } from "../../../services/scheduleService";

const Schedule = () => {
  const { user } = useContext(AuthContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [initialEvents, setInitialEvents] = useState([]);

  useEffect(() => {
    getSchedule(user.id);
  }, []);

  const getSchedule = async (userId) => {
    try {
      const tmp_data = await getScheduleByUserId(userId);
      console.log(tmp_data);
      setInitialEvents(tmp_data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleDateClick = async (selected) => {
    const title = prompt("Please enter a new title for your event");

    if (title) {
      const data = {
        user_id: user.id,
        title: title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      }

      onAddEvent(data, selected);
    }
    
  };

  const onAddEvent = async (data, selected) => {
    try {
      const res = await addSchedule(data);
      if (res.status === 201) {
        // Add new in scheduleData
        let newScheduleData = [...currentEvents];
        newScheduleData.push({...data, id: res.data.scheduleId});
        setCurrentEvents(newScheduleData);
        
        const calendarApi = selected.view.calendar;
        calendarApi.unselect();
        
        calendarApi.addEvent({
          ...data, id: res.data.scheduleId,
        });
        toast.success("Created successfully.");
      } else {
        toast.warning("Create Failed.");
      }
    } catch (error) {
      console.error("Server Error:", error);
      toast.error("Oop! Network Connection Error.");
    }
  }

  const handleEventClick = async (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      onDeleteEvent(selected);
    }
  };

  const onDeleteEvent = async (selected) => {
    try{
      const res = await deleteScheduleById(selected.event.id);
      if (res.status === 200) {
        // Remove from scheduleData
        setCurrentEvents(currentEvents.filter((item) => item.id !== selected.event.id));
        selected.event.remove();
        toast.success("Deleted successfully.");
      } else {
        toast.warning("Delete Failed.");
      }
    } catch {
      toast.error("Oop! Network Connection Error.");  
    }
  }

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
          sx={{height: '75vh', overflow: 'auto'}}
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
            eventClick={handleEventClick}
            eventsSet={(events) => {setCurrentEvents(events);}}
            initialEvents={initialEvents}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Schedule;
