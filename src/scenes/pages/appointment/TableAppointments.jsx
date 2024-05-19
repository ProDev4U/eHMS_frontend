import { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { ToastContainer, toast } from 'react-toastify';

// Components
import { appointmentColumns, pAppointmentColumnsWithActions } from "./TableColumnAppointment";
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


export const TableAppointmentsWithActions = ({ setAppointmentData, userId, appointmentData, colors, doctors }) => {
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [addItem, setAddItem] = useState({});
    const [isAddDialog, setIsAddDialog] = useState(false);
    const [editedItem, setEditedItem] = useState({});
    const [isEditDialog, setIsEditDialog] = useState(false);
    const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

    const CreateNewAppointment = () => {
        onAdd({ ...addItem, patient_id: userId, doctor_id: doctors.find((item) => item.name === addItem.doctorName)?.id, state: 0 });
        setIsAddDialog(false);
    }

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setAddItem({ ...addItem, [name]: value });
    }

    const onAdd = async (data) => {
        try {
            delete data.doctorName;
            const res = await addAppointment(data);
            if (res.status === 201) {
                toast.success("Created successfully.");
                // Add new in AppointmentData
                let newAppointmentData = [...appointmentData];
                newAppointmentData.push({ ...addItem, id: res.data.appointmentId });
                setAppointmentData(newAppointmentData);
                setAddItem({});
            } else {
                toast.warning("Create Failed.");
            }
        } catch (error) {
            console.error("Server Error:", error);
            toast.error("Server Error");
        }
    };

    const handleEditClick = (id) => {
        setSelectedItemId(id);
        setEditedItem(appointmentData.find((item) => item.id === id));
        setIsEditDialog(true);
    }

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedItem({ ...editedItem, [name]: value });
    }

    const SaveEditDialog = async () => {
        delete editedItem.doctorName;
        delete editedItem.doctorEmail;
        onSave(selectedItemId, editedItem);
        setIsEditDialog(false);
    };

    const onSave = async (id, data) => {
        try {
            const res = await editAppointmentById(id, data);
            if (res.status === 200) {
                toast.success("Saved successfully.");
                // Update editedItem in appointmentData
                setAppointmentData(appointmentData.map(item => {
                    if (item.id === id) {
                        return { ...item, ...data }; // Merge edited data into the item
                    }
                    return item;
                }));
            } else {
                toast.warning("Save Failed.");
            }
        } catch (error) {
            console.error("Server Error:", error);
            toast.error("Server Error");
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
                toast.success("Deteled successfully.");
                setAppointmentData(appointmentData.filter((item) => item.id !== id));
            } else {
                toast.warning("Delete Failed.");
            }
        } catch (error) {
            console.error("Server Error:", error);
            toast.error("Server Error");
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
                <Button variant="outlined" color="success" startIcon={<AddOutlinedIcon />} onClick={() => setIsAddDialog(true)}>
                    Add
                </Button>
                <DataGrid
                    rows={appointmentData}
                    columns={pAppointmentColumnsWithActions.map((column) =>
                        column.field === "actions"
                            ? {
                                ...column,
                                getActions: ({ id }) => [
                                    <GridActionsCellItem
                                        icon={<EditOutlinedIcon />}
                                        label="Edit"
                                        className="textPrimary"
                                        onClick={() => handleEditClick(id)}
                                        color="inherit"
                                    />,
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
                            id="doctorName"
                            name="doctorName"
                            value={addItem.doctorName}
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
                open={isEditDialog}
                onClose={() => setIsEditDialog(false)}
                aria-labelledby="edit-dialog-title"
                aria-describedby="edit-dialog-description"
            >
                <DialogTitle id="edit-dialog-title">
                    {"Edit Item"}
                </DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel id="doctorName-label">Doctor Name</InputLabel>
                        <Select
                            labelId="doctorName-label"
                            id="doctorName"
                            name="doctorName"
                            value={editedItem.doctorName}
                            onChange={handleEditChange}
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
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        value={editedItem.doctorEmail}
                        onChange={handleEditChange}
                        headerAlign="left"
                        align="left"
                    />
                    <TextField
                        margin="dense"
                        name="date"
                        label="Date"
                        fullWidth
                        value={editedItem.date}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="from_time"
                        label="Start Time"
                        fullWidth
                        value={editedItem.from_time}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="end_time"
                        label="End Time"
                        fullWidth
                        value={editedItem.end_time}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="topic"
                        label="Topic"
                        fullWidth
                        value={editedItem.topic}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="notes"
                        label="Notes"
                        fullWidth
                        value={editedItem.notes}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="state"
                        label="State"
                        fullWidth
                        value={editedItem.state}
                        onChange={handleEditChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsEditDialog(false)}>Cancel</Button>
                    <Button onClick={() => SaveEditDialog()} autoFocus>
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
                        Are you sure you want to delete this item?
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

export const TableDoctorAppointmentsWithActions = ({ setAppointmentData, appointmentData, colors, patients }) => {
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [editedItem, setEditedItem] = useState({});
    const [isEditDialog, setIsEditDialog] = useState(false);
    const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

    const handleEditClick = (id) => {
        setSelectedItemId(id);
        setEditedItem(appointmentData.find((item) => item.id === id));
        setIsEditDialog(true);
    }

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedItem({ ...editedItem, [name]: value });
    }

    const SaveEditDialog = async () => {
        delete editedItem.doctorName;
        delete editedItem.doctorEmail;
        onSave(selectedItemId, editedItem);
        setIsEditDialog(false);
    };

    const onSave = async (id, data) => {
        try {
            const res = await editAppointmentById(id, data);
            if (res.status === 200) {
                toast.success("Saved successfully.");
                // Update editedItem in appointmentData
                setAppointmentData(appointmentData.map(item => {
                    if (item.id === id) {
                        return { ...item, ...data }; // Merge edited data into the item
                    }
                    return item;
                }));
            } else {
                toast.warning("Save Failed.");
            }
        } catch (error) {
            console.error("Server Error:", error);
            toast.error("Server Error");
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
                toast.success("Deteled successfully.");
                setAppointmentData(appointmentData.filter((item) => item.id !== id));
            } else {
                toast.warning("Delete Failed.");
            }
        } catch (error) {
            console.error("Server Error:", error);
            toast.error("Server Error");
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
                    columns={pAppointmentColumnsWithActions.map((column) =>
                        column.field === "actions"
                            ? {
                                ...column,
                                getActions: ({ id }) => [
                                    <GridActionsCellItem
                                        icon={<EditOutlinedIcon />}
                                        label="Edit"
                                        className="textPrimary"
                                        onClick={() => handleEditClick(id)}
                                        color="inherit"
                                    />,
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
                open={isEditDialog}
                onClose={() => setIsEditDialog(false)}
                aria-labelledby="edit-dialog-title"
                aria-describedby="edit-dialog-description"
            >
                <DialogTitle id="edit-dialog-title">
                    {"Edit Item"}
                </DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel id="patientName-label">Patient Name</InputLabel>
                        <Select
                            labelId="patientName-label"
                            id="patientName"
                            name="patientName"
                            value={editedItem.patientName}
                            onChange={handleEditChange}
                            className="name-column--cell"
                            autoFocus
                            fullWidth
                        >
                            {
                                patients?.map((item) => (
                                    <MenuItem key={item.id} value={item.name}>
                                        {item.name}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        value={editedItem.patientEmail}
                        onChange={handleEditChange}
                        headerAlign="left"
                        align="left"
                    />
                    <TextField
                        margin="dense"
                        name="date"
                        label="Date"
                        fullWidth
                        value={editedItem.date}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="from_time"
                        label="Start Time"
                        fullWidth
                        value={editedItem.from_time}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="end_time"
                        label="End Time"
                        fullWidth
                        value={editedItem.end_time}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="topic"
                        label="Topic"
                        fullWidth
                        value={editedItem.topic}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="notes"
                        label="Notes"
                        fullWidth
                        value={editedItem.notes}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="state"
                        label="State"
                        fullWidth
                        value={editedItem.state}
                        onChange={handleEditChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsEditDialog(false)}>Cancel</Button>
                    <Button onClick={() => SaveEditDialog()} autoFocus>
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
                        Are you sure you want to delete this item?
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
