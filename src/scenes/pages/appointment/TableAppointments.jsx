import { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AlarmOnOutlinedIcon from '@mui/icons-material/AlarmOnOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { ToastContainer, toast } from 'react-toastify';

// Components
import { appointmentColumns, AppointmentColumnsWithActions } from "./TableColumnAppointment";
// API Calls
import { addAppointment, editAppointmentById, deleteAppointmentById } from "../../../services/appointmentService";

export const TableAppointment = ({ appointmentData, colors }) => {

    return (
        <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`,
                },
            }}
        >
            <DataGrid
                rows={appointmentData}
                columns={appointmentColumns}
                components={{ Toolbar: GridToolbar }}
            />
        </Box>
    );
};


export const TableAppointmentsWithPatientActions = ({ setAppointmentData, userId, appointmentData, colors, doctors }) => {
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [addItem, setAddItem] = useState({});
    const [isAddDialog, setIsAddDialog] = useState(false);
    const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

    const CreateNewAppointment = () => {
        onAdd({ ...addItem, patient_id: userId, doctor_id: doctors.find((item) => item.name === addItem.name)?.doctor_id });
        setIsAddDialog(false);
    }

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setAddItem({ ...addItem, [name]: value });
    }

    const onAdd = async (data) => {
        delete data.name;
        console.log(doctors)
        try {
            const res = await addAppointment(data);
            if (res.status === 201) {
                toast.success("New Appointment created successfully.");
                // Add new in AppointmentData
                let newAppointmentData = [...appointmentData];
                newAppointmentData.push({ ...addItem, id: res.data.appointmentId, state: "Pending", email: doctors.find((item) => item.name === addItem.name)?.email });
                setAppointmentData(newAppointmentData);
                setAddItem({});
            } else {
                toast.warning("Sorry. Your action didn't work. \nTry again.");
            }
        } catch (error) {
            console.error("Server Error:", error);
            toast.error("Oop! Network Connection Error.");
        }
    };

    const handleDeleteClick = (id) => {
        setSelectedItemId(id);
        setIsDeleteConfirm(true);
    };

    const AgreeDeleteConfirm = () => {
        setIsDeleteConfirm(false);
        onDelete(selectedItemId)
    };

    const onDelete = async (id) => {
        try {
            const res = await deleteAppointmentById(id);
            if (res.status === 200) {
                toast.success("Appointment deteled successfully.");
                setAppointmentData(appointmentData.filter((item) => item.id !== id));
            } else {
                toast.warning("Sorry. Your action didn't work. \nTry again.");
            }
        } catch (error) {
            console.error("Server Error:", error);
            toast.error("Oop! Network Connection Error.");
        }
    }

    return (
        <div>
            <Box
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <Button variant="outlined" color="success" startIcon={<AddOutlinedIcon />} onClick={() => setIsAddDialog(true)}>
                    Add
                </Button>
                <DataGrid
                    rows={appointmentData}
                    columns={AppointmentColumnsWithActions.map((column) =>
                        column.field === "actions"
                            ? {
                                ...column,
                                getActions: ({ id }) => [
                                    <GridActionsCellItem
                                        icon={<DeleteForeverOutlinedIcon />}
                                        label="Delete"
                                        onClick={() => handleDeleteClick(id)}
                                        color="inherit"
                                    />,
                                ],
                            }
                            : column
                    )}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
            <Dialog
                open={isAddDialog}
                onClose={() => setIsAddDialog(false)}
                aria-labelledby="add-dialog-title"
                aria-describedby="add-dialog-description"
            >
                <DialogTitle id="add-dialog-title">
                    {"Record New Appointment"}
                </DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel id="doctorName-label">Doctor Name</InputLabel>
                        <Select
                            labelId="doctorName-label"
                            id="name"
                            name="name"
                            value={addItem.name}
                            onChange={handleAddChange}
                            className="name-column--cell"
                            autoFocus
                            fullWidth
                        >
                            {
                                doctors?.map((item) => (
                                    <MenuItem key={item.id} value={item.name}>
                                        {item.name}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        name="date"
                        label="Date"
                        type="date"
                        fullWidth
                        value={addItem.date}
                        onChange={handleAddChange}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        name="from_time"
                        label="Start Time"
                        type="time"
                        fullWidth
                        value={addItem.from_time}
                        onChange={handleAddChange}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        name="end_time"
                        label="End Time"
                        type="time"
                        fullWidth
                        value={addItem.end_time}
                        onChange={handleAddChange}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        name="topic"
                        label="Topic"
                        fullWidth
                        value={addItem.topic}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="notes"
                        label="Notes"
                        fullWidth
                        value={addItem.notes}
                        onChange={handleAddChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsAddDialog(false)}>Cancel</Button>
                    <Button onClick={() => CreateNewAppointment()} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={isDeleteConfirm}
                onClose={() => setIsDeleteConfirm(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Delete"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to cancel this appointment?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDeleteConfirm(false)}>Disagree</Button>
                    <Button onClick={() => AgreeDeleteConfirm()} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer autoClose={3000} />
        </div>
    );
};

export const TableAppointmentsWithDoctorActions = ({ setAppointmentData, appointmentData, colors }) => {
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isAccept, setIsAccept] = useState(false);
    const [isDecline, setIsDecline] = useState(false);
    const [isFinish, setIsFinish] = useState(false);

    const handleAcceptClick = (id) => {
        setSelectedItemId(id);
        setIsAccept(true);
    };

    const AgreeAcceptConfirm = () => {
        setIsAccept(false);
        onUpdate(selectedItemId, 2)
    };

    const handleDeclineClick = (id) => {
        setSelectedItemId(id);
        setIsDecline(true);
    };

    const AgreeDeclineConfirm = () => {
        setIsDecline(false);
        onUpdate(selectedItemId, 1)
    };

    const handleFinishClick = (id) => {
        setSelectedItemId(id);
        setIsFinish(true);
    };

    const AgreeFinishConfirm = () => {
        setIsFinish(false);
        onUpdate(selectedItemId, 3)
    };

    const onUpdate = async (id, newState) => {
        try {
            const res = await editAppointmentById(id, newState);
            if (res.status === 200) {
                toast.success("Appointment accept successfully.");
                setAppointmentData(appointmentData.map(item => {
                    if (item.id === id) {
                        let stateStr = 'Pending';
                        if(newState === 1){
                            stateStr = "Declined";  
                        } else if(newState === 2){
                            stateStr = "Accepted";
                        } else if(newState === 3){
                            stateStr = "Finished";
                        }
                        return { ...item, state: stateStr };
                    }
                    return item;
                }));
            } else {
                toast.warning("Accept Failed.");
            }
        } catch (error) {
            console.error("Server Error:", error);
            toast.error("Oop! Network Connection Error.");
        }
    }

    return (
        <div>
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid
                    rows={appointmentData}
                    columns={AppointmentColumnsWithActions.map((column) =>
                        column.field === "actions"
                            ? {
                                ...column,
                                getActions: ({ id }) => [
                                    <GridActionsCellItem
                                        icon={<CheckCircleOutlineOutlinedIcon />}
                                        label="Accept"
                                        className="textPrimary"
                                        onClick={() => handleAcceptClick(id)}
                                        color="inherit"
                                    />,
                                    <GridActionsCellItem
                                        icon={<ThumbDownAltOutlinedIcon />}
                                        label="Decline"
                                        onClick={() => handleDeclineClick(id)}
                                        color="inherit"
                                    />,
                                    <GridActionsCellItem
                                        icon={<AlarmOnOutlinedIcon />}
                                        label="Finish"
                                        onClick={() => handleFinishClick(id)}
                                        color="inherit"
                                    />,
                                ],
                            }
                            : column
                    )}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
            <Dialog
                open={isAccept}
                onClose={() => setIsAccept(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Accept"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to accept this appointment?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsAccept(false)}>Disagree</Button>
                    <Button onClick={() => AgreeAcceptConfirm()} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={isDecline}
                onClose={() => setIsDecline(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Decline"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to decline this appointment?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDecline(false)}>Disagree</Button>
                    <Button onClick={() => AgreeDeclineConfirm()} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={isFinish}
                onClose={() => setIsFinish(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Finish"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to finish this appointment?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsFinish(false)}>Disagree</Button>
                    <Button onClick={() => AgreeFinishConfirm()} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer autoClose={3000} />
        </div>
    );
};

