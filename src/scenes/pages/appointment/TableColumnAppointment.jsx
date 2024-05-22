
export const appointmentColumns = [
    {
      field: "doctorName",
      headerName: "Doctor Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "from_time",
      headerName: "Start Time",
      flex: 1,
    },
    {
      field: "end_time",
      headerName: "End Time",
      flex: 1,
    },
    {
      field: "topic",
      headerName: "Topic",
      flex: 1,
    },
    {
      field: "notes",
      headerName: "Notes",
      flex: 1,
    },
    {
      field: "state",
      headerName: "State",
      flex: 1,
    },
];

export const AppointmentColumnsWithActions = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
  },
  {
    field: "from_time",
    headerName: "Start Time",
    flex: 1,
  },
  {
    field: "end_time",
    headerName: "End Time",
    flex: 1,
  },
  {
    field: "topic",
    headerName: "Topic",
    flex: 1,
  },
  {
    field: "notes",
    headerName: "Notes",
    flex: 1,
  },
  {
    field: "state",
    headerName: "State",
    flex: 1,
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    cellClassName: 'actions',
    flex: 1,
  },
];
