import React, { useState, useEffect, useContext } from "react";
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
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
import { toast, ToastContainer } from "react-toastify";
// API Calls
import { getScheduleByUserId, addSchedule, editScheduleById, deleteScheduleById } from "../../../services/scheduleService";

const AdminDoctorSchedule = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useContext(AuthContext);

  const [currentEvents, setCurrentEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tmp_data = await getScheduleByUserId(user.id);
        setCurrentEvents(tmp_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    console.log(currentEvents);
  }, []);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");

    if (title) {
      // add new schedule
      const data = {
        user_id: user.id,
        title: title,
        date: selected.startStr,
      }
      handleAddSchedule(data);
    };
  }

  const handleAddSchedule = async (data) => {
    try {
      const res = await addSchedule(data);
      if (res.status === 201) {
        toast.success("Created successfully.");
        // Add new in scheduleData
        let newScheduleData = [...currentEvents];
        newScheduleData.push({...data, id: res.data.scheduleId});
        setCurrentEvents(newScheduleData);
        
        const calendarApi = data?.selected.view.calendar;
        calendarApi.unselect();

        calendarApi.addEvent({
          id: res.data.scheduleId,
          title: data?.title,
          start: data?.selected.startStr,
          end: data?.selected.endStr,
          allDay: data?.selected.allDay,
        });
      } else {
        toast.warning("Create Failed.");
      }
    } catch (error) {
      console.error("Server Error:", error);
      toast.error("Server Error");
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      const deleteSchedule = async () => {
        try{
          const res = await deleteScheduleById(selected.event.id);
          if (res.status === 200) {
            toast.success("Deleted successfully.");
            // Remove from scheduleData
            let newScheduleData = [...currentEvents];
            newScheduleData = newScheduleData.filter((item) => item.id !== selected.event.id);
            setCurrentEvents(newScheduleData);
            selected.event.remove();
          } else {
            toast.warning("Delete Failed.");
          }
        } catch {
          toast.error("Server Error");  
        }
      }

      deleteSchedule();
    }
  };

  return (
      <Box m="20px">
        <Header title="My Schedule" subtitle="Record my schedule." />

        <Box display="flex" justifyContent="space-between">
          {/* CALENDAR SIDEBAR */}
          <Box
            flex="1 1 20%"
            backgroundColor={colors.primary[400]}
            p="15px"
            borderRadius="4px"
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
                  }}
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
              eventsSet={(events) => setCurrentEvents(events)}
              initialEvents={currentEvents}
            />
          </Box>
        </Box>
        <ToastContainer autoClose={3000} />
      </Box>
  );
};

export default AdminDoctorSchedule;
