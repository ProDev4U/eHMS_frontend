import { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Dialog, DialogTitle,DialogContent, DialogActions,  DialogContentText, Button, TextField } from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { ToastContainer, toast } from 'react-toastify';

// Components
import { checkupColumns, checkupColumnsWithActions } from "./TableColumns";
// API Calls
import { addCheckup, editCheckupById, deleteCheckupById } from "../../../services/checkupService";

export const TableCheckups = ({checkupData, colors}) => {

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
                rows={checkupData}
                columns={checkupColumns}
                components={{ Toolbar: GridToolbar }}
            />
        </Box>
    );
};

export const TableCheckupsWithActions = ({setCheckupData, userId, checkupData, colors}) => {
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [addItem, setAddItem] = useState({});
    const [isAddDialog, setIsAddDialog] = useState(false);
    const [editedItem, setEditedItem] = useState({});
    const [isEditDialog, setIsEditDialog] = useState(false);
    const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

    const CreateNewCheckup = () => {
        onAdd({...addItem, patient_id: userId});
        setIsAddDialog(false);
    }

    const handleAddChange = (e) => {
        const {name, value} = e.target;
        setAddItem({...addItem, [name]: value});
    }

    const onAdd = async (data) => {
        try {
            const res = await addCheckup(data);
            if(res.status === 201){
                toast.success("Insert new checkup successfully.");
                // Add new in checkupData
                let newCheckupData = [...checkupData];
                newCheckupData.push({...addItem, id: res.data.checkupId});
                setCheckupData(newCheckupData);
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
        setEditedItem(checkupData.find((item) => item.id === id));
        setIsEditDialog(true);
    }
    
    const handleEditChange = (e) => {
        const {name, value} = e.target;
        setEditedItem({...editedItem, [name]: value});
    }

    const SaveEditDialog = async () => {
        onSave(selectedItemId, editedItem);
        setIsEditDialog(false);
    };
    
    const onSave = async (id, data) => {
        try {
            const res = await editCheckupById(id, data);
            if(res.status === 200){
                toast.success("Saved successfully.");
                // Update editedItem in checkupData
                setCheckupData(checkupData.map(item => {
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
        setIsDeleteConfirm(true);
    };

    const AgreeDeleteConfirm  = () => {
        setIsDeleteConfirm(false);
        onDelete(selectedItemId)
    };  

    const onDelete = async (id) => {
        try {
            const res = await deleteCheckupById(id);
            if(res.status === 200){
                toast.success("Deteled successfully.");
                setCheckupData(checkupData.filter((item) => item.id !== id));
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
                rows={checkupData}
                columns={checkupColumnsWithActions.map((column) =>
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
                    {"Record New Checkup"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="datetime"
                        label="Time"
                        type="datetime-local" // Specify type as datetime-local
                        fullWidth
                        value={addItem.datetime}
                        onChange={handleAddChange}
                        className="name-column--cell"
                    />
                    <TextField
                        margin="dense"
                        name="outputCurrent"
                        label="Output Current"
                        fullWidth
                        value={addItem.outputCurrent}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="signalFrequency"
                        label="Signal Frequency"
                        fullWidth
                        value={addItem.signalFrequency}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="pulseWidth"
                        label="Pulse Width"
                        fullWidth
                        value={addItem.pulseWidth}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="onTime"
                        label="On Time"
                        fullWidth
                        value={addItem.onTime}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="offTime"
                        label="Off Time"
                        fullWidth
                        value={addItem.offTime}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="dutyCycle"
                        label="Duty Cycle"
                        fullWidth
                        value={addItem.dutyCycle}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="siteEffects"
                        label="Site Effects"
                        fullWidth
                        value={addItem.siteEffects}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="iderability"
                        label="Iderability"
                        fullWidth
                        value={addItem.iderability}
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
                    <Button onClick={() => CreateNewCheckup()} autoFocus>
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
                    {"Edit Checkup Record"} 
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="datetime"
                        label="Time"
                        type="datetime-local" // Specify type as datetime-local
                        fullWidth
                        value={addItem.datetime}
                        onChange={handleAddChange}
                        className="name-column--cell"
                    />
                    <TextField
                        margin="dense"
                        name="outputCurrent"
                        label="Output Current"
                        fullWidth
                        value={editedItem.outputCurrent}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="signalFrequency"
                        label="Signal Frequency"
                        fullWidth
                        value={editedItem.signalFrequency}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="pulseWidth"
                        label="Pulse Width"
                        fullWidth
                        value={editedItem.pulseWidth}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="onTime"
                        label="On Time"
                        fullWidth
                        value={editedItem.onTime}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="offTime"
                        label="Off Time"
                        fullWidth
                        value={editedItem.offTime}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="dutyCycle"
                        label="Duty Cycle"
                        fullWidth
                        value={editedItem.dutyCycle}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="siteEffects"
                        label="Site Effects"
                        fullWidth
                        value={editedItem.siteEffects}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="iderability"
                        label="Iderability"
                        fullWidth
                        value={editedItem.iderability}
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

