export const seizureColumns = [
    {
      field: "description",
      headerName: "Type",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "activity",
      headerName: "Activity",
      flex: 1,
    },
    {
      field: "mood",
      headerName: "Mood",
      flex: 1,
    },
    {
      field: "starttime",
      headerName: "Start Time",
      flex: 1,
    },
    {
      field: "endtime",
      headerName: "End Time",
      flex: 1,
    },
    {
      field: "duration",
      headerName: "Duration\n[min]",
      flex: 1,
    },
    {
      field: "possibleTrigger",
      headerName: "Possible Trigger",
      flex: 1,
    },
    {
      field: "attachName",
      headerName: "Attach File",
      flex: 1,
    },
];

export const medicineColumns = [
    {
      field: "medicineName",
      headerName: "Medicine Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "usageText",
      headerName: "Usage",
      flex: 1,
    },
    {
      field: "dose",
      headerName: "Dose",
      flex: 1,
    },
    {
      field: "frequency",
      headerName: "Frequency",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "time",
      headerName: "Time",
      flex: 1,
    },
    {
      field: "useState",
      headerName: "Have U done?",
      flex: 1,
    },
];

export const checkupColumns = [
    {
      field: "datetime",
      headerName: "Time",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "outputCurrent",
      headerName: "Output Current",
      flex: 1,
    },
    {
      field: "signalFrequency",
      headerName: "Signal Frequency",
      flex: 1,
    },
    {
      field: "pulseWidth",
      headerName: "Pulse Width",
      flex: 1,
    },
    {
      field: "onTime",
      headerName: "On Time",
      flex: 1,
    },
    {
      field: "offTime",
      headerName: "Off Time",
      flex: 1,
    },
    {
      field: "dutyCycle",
      headerName: "Duty Cycle",
      flex: 1,
    },
    {
      field: "siteEffects",
      headerName: "Site Effects",
      flex: 1,
    },
    {
      field: "iderability",
      headerName: "Iderability",
      flex: 1,
    },
    {
      field: "notes",
      headerName: "Notes",
      flex: 1,
    },
];

export const seizureColumnsWithActions = [
  {
    field: "description",
    headerName: "Type",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "activity",
    headerName: "Activity",
    flex: 1,
  },
  {
    field: "mood",
    headerName: "Mood",
    flex: 1,
  },
  {
    field: "starttime",
    headerName: "Start Time",
    flex: 1,
  },
  {
    field: "endtime",
    headerName: "End Time",
    flex: 1,
  },
  {
    field: "duration",
    headerName: "Duration\n[min]",
    flex: 1,
  },
  {
    field: "possibleTrigger",
    headerName: "Possible Trigger",
    flex: 1,
  },
  {
    field: "attachName",
    headerName: "Attach File",
    flex: 1,
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: 'actions',
    // getActions: ({ id }) => {
    //   return [
    //     <GridActionsCellItem
    //       icon={<EditOutlinedIcon />}
    //       label="Edit"
    //       className="textPrimary"
    //       onClick={handleEditClick(id, "Seizure")}
    //       color="inherit"
    //     />,
    //     <GridActionsCellItem
    //       icon={<DeleteForeverOutlinedIcon />}
    //       label="Delete"
    //       onClick={handleDeleteClick(id, "Seizure")}
    //       color="inherit"
    //     />,
    //   ];
    // },
  },
];
     
export const medicineColumnsWithActions = [
  {
    field: "medicineName",
    headerName: "Medicine Name",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "usageText",
    headerName: "Usage",
    flex: 1,
  },
  {
    field: "dose",
    headerName: "Dose",
    flex: 1,
  },
  {
    field: "frequency",
    headerName: "Frequency",
    flex: 1,
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
  },
  {
    field: "time",
    headerName: "Time",
    flex: 1,
  },
  {
    field: "useState",
    headerName: "Have U done?",
    flex: 1,
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: 'actions'
  },
];

export const checkupColumnsWithActions = [
  {
    field: "datetime",
    headerName: "Time",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "outputCurrent",
    headerName: "Output Current",
    flex: 1,
  },
  {
    field: "signalFrequency",
    headerName: "Signal Frequency",
    flex: 1,
  },
  {
    field: "pulseWidth",
    headerName: "Pulse Width",
    flex: 1,
  },
  {
    field: "onTime",
    headerName: "On Time",
    flex: 1,
  },
  {
    field: "offTime",
    headerName: "Off Time",
    flex: 1,
  },
  {
    field: "dutyCycle",
    headerName: "Duty Cycle",
    flex: 1,
  },
  {
    field: "siteEffects",
    headerName: "Site Effects",
    flex: 1,
  },
  {
    field: "iderability",
    headerName: "Iderability",
    flex: 1,
  },
  {
    field: "notes",
    headerName: "Notes",
    flex: 1,
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    cellClassName: 'actions'
  },
];