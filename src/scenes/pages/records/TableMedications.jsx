import { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Dialog, DialogTitle,DialogContent, DialogActions,  DialogContentText, Button, Stack, TextField } from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { ToastContainer, toast } from 'react-toastify';
// Components
import { medicineColumns, medicineColumnsWithActions } from "./TableColumns";
// API Calls
import { addMedication, editMedicationById, editMedicationStateById, deleteMedicationById } from "../../../services/medicationService";
import { create } from "@mui/material/styles/createTransitions";

export const TableMedications = ({medicationData, colors}) => {
    return (
        <Box
        height="70vh"
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
                rows={medicationData}
                columns={medicineColumns}
                components={{ Toolbar: GridToolbar }}
            />
        </Box>
    );
};

export const TableMedicationsWithPatientActions = ({setMedicationData, userId, medicationData, colors}) => {
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isConfirm, setIsConfirm] = useState(false);

    const showConfirm = (id) => {
        setSelectedItemId(id);
        setIsConfirm(true);
    };

    const AgreeConfirm = () => {
        setIsConfirm(false);
        onUpdateUseState(selectedItemId);
    };

    const onUpdateUseState = async (id) => {
        try {
            const res = await editMedicationStateById(id);
            if(res.status === 200){
                toast.success("Updated successfully.");
                // Update state
                setMedicationData(medicationData.map(item => {
                    if (item.id === id) {
                        return { ...item, useState: item.useState + 1 };
                    }
                    return item;
                }));
            } else {
                toast.warning("Update Failed.");
            }
        } catch (error) {
                console.error("Server Error:", error);
                toast.error("Server Error");
        }
    }

    return (
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
            <DataGrid
                rows={medicationData}
                columns={medicineColumnsWithActions.map((column) =>
                    column.field === "actions"
                    ? {
                        ...column,
                        getActions: ({ id }) => [
                            <GridActionsCellItem
                                icon={<VaccinesOutlinedIcon />}
                                label="Take a pill"
                                onClick={() => showConfirm(id)}
                                color="inherit"
                            />
                        ],   
                    }
                    : column
                )}
                components={{ Toolbar: GridToolbar }}
            />
            <Dialog
                open={isConfirm}
                onClose={() => setIsConfirm(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Confirm"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure take a pill for this item?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setIsConfirm(false)}>Disagree</Button>
                <Button onClick={() => AgreeConfirm()} autoFocus>
                    Agree
                </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer autoClose={3000} />
        </Box>
    );
};

export const TableMedicationsWithDoctorActions = ({setMedicationData, userId, medicationData, colors}) => {
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [addItem, setAddItem] = useState({});
    const [isAddDialog, setIsAddDialog] = useState(false);
    const [editedItem, setEditedItem] = useState({});
    const [isEditDialog, setIsEditDialog] = useState(false);
    const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

    const CreateNewMedication = () => {
        onAdd({...addItem, patient_id: userId, useState: 0});
        setIsAddDialog(false);
    }

    const handleAddChange = (e) => {
        const {name, value} = e.target;
        setAddItem({...addItem, [name]: value});
    }

    const onAdd = async (data) => {
        try {
            const res = await addMedication(data);
            if(res.status === 201){
                toast.success("Created successfully.");
                // Add new in medicationData
                let newMedicationData = [...medicationData];
                newMedicationData.push({...addItem, id: res.data.medicationId});
                setMedicationData(newMedicationData);
                setAddItem({});
            } else {
                toast.warning("Create Failed.");
            }
        } catch (error) {
                console.error("Server Error:", error);
                toast.error("Server Error");
        }
    };

    const handleEditClick = (id) =>  {
        setSelectedItemId(id);
        setEditedItem(medicationData.find((item) => item.id === id));
        setIsEditDialog(true);
    }
    
    const handleEditChange = (e) => {
        const {name, value} = e.target;
        setEditedItem({...editedItem, [name]: value});
    }

    const SaveEditDialog = async () => {
        setIsEditDialog(false);
        if(editedItem.useState) {
            toast.warning("You can't edit record of the medication. \nThe patient has already taken the medicine!");
            return;
        }
        onSave(selectedItemId, editedItem);
    };
    
    const onSave = async (id, data) => {
        try {
            const res = await editMedicationById(id, data);
            if(res.status === 200){
                toast.success("Saved successfully.");
                // Update editedItem in medicationData
                setMedicationData(medicationData.map(item => {
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

    const handleDeleteClick = (id)  => {
        setSelectedItemId(id);
        setEditedItem(medicationData.find((item) => item.id === id));
        setIsDeleteConfirm(true);
    };

    const AgreeDeleteConfirm  = () => {
        setIsDeleteConfirm(false);
        if(editedItem.useState) {
            toast.warning("You can't delete record of the medication. \nThe patient has already taken the medicine!");
            return;
        }
        onDelete(selectedItemId)
    };  

    const onDelete = async (id) => {
        try {
            const res = await deleteMedicationById(id);
            if(res.status === 200){
                toast.success("Deteled successfully.");
                setMedicationData(medicationData.filter((item) => item.id !== id));
            } else {
                toast.warning("Delete Failed.");
            }
        } catch (error) {
              console.error("Server Error:", error);
              toast.error("Server Error");
        }
    }

    return (
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
            <Button variant="outlined"  color="success" startIcon={<AddOutlinedIcon />} onClick={() => setIsAddDialog(true)}>
                Add
            </Button>
            <DataGrid
                rows={medicationData}
                columns={medicineColumnsWithActions.map((column) =>
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
                            />
                        ],   
                    }
                    : column
                )}
                components={{ Toolbar: GridToolbar }}
            />
            <Dialog
                open={isAddDialog}
                onClose={() => setIsAddDialog(false)}
                aria-labelledby="add-dialog-title"
                aria-describedby="add-dialog-description"
            >
                <DialogTitle id="add-dialog-title">
                    {"Record New Medication"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="medicineName"
                        label="Medicine Name"
                        fullWidth
                        value={addItem.medicineName}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="usageText"
                        label="Usage"
                        fullWidth
                        value={addItem.usageText}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="dose"
                        label="Dose"
                        fullWidth
                        value={addItem.dose}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="frequency"
                        label="Frequency"
                        fullWidth
                        value={addItem.frequency}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="date"
                        label="Date"
                        type="date"
                        fullWidth
                        value={addItem.date}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="time"
                        label="Time"
                        type="time"
                        fullWidth
                        value={addItem.time}
                        onChange={handleAddChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsAddDialog(false)}>Cancel</Button>
                    <Button onClick={() => CreateNewMedication()} autoFocus>
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
                    {"Edit Medication Record"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="medicineName"
                        label="Medicine Name"
                        fullWidth
                        value={editedItem.medicineName}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="usageText"
                        label="Usage"
                        fullWidth
                        value={editedItem.usageText}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="dose"
                        label="Dose"
                        fullWidth
                        value={editedItem.dose}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="frequency"
                        label="Frequency"
                        fullWidth
                        value={editedItem.frequency}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="date"
                        label="Date"
                        type="date"
                        fullWidth
                        value={editedItem.date}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="time"
                        label="Time"
                        type="time"
                        fullWidth
                        value={editedItem.time}
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
        </Box>
    );
};