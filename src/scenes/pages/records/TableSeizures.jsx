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
import { seizureColumns, seizureColumnsWithActions } from "./TableColumns";
// API Calls
import { addSeizure, editSeizureById, deleteSeizureById } from "../../../services/seizureService";

export const TableSeizures = ({seizureData, colors}) => {

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
                rows={seizureData}
                columns={seizureColumns}
                components={{ Toolbar: GridToolbar }}
            />
        </Box>
    );
};


export const TableSeizuresWithActions = ({setSeizureData, userId,seizureData, colors}) => {
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [addItem, setAddItem] = useState({});
    const [isAddDialog, setIsAddDialog] = useState(false);
    const [editedItem, setEditedItem] = useState({});
    const [isEditDialog, setIsEditDialog] = useState(false);
    const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

    const CreateNewSeizure = () => {
        onAdd({...addItem, patient_id: userId});
        setIsAddDialog(false);
    }

    const handleAddChange = (e) => {
        const {name, value} = e.target;
        setAddItem({...addItem, [name]: value});
    }

    const onAdd = async (data) => {
        try {
            const res = await addSeizure(data);
            if(res.status === 201){
                toast.success("Created successfully.");
                // Add new in seizureData
                let newSeizureData = [...seizureData];
                newSeizureData.push({...addItem, id: res.data.seizureId});
                setSeizureData(newSeizureData);
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
        setEditedItem(seizureData.find((item) => item.id === id));
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
            const res = await editSeizureById(id, data);
            if(res.status === 200){
                toast.success("Saved successfully.");
                // Update editedItem in seizureData
                setSeizureData(seizureData.map(item => {
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
            const res = await deleteSeizureById(id);
            if(res.status === 200){
                toast.success("Deteled successfully.");
                setSeizureData(seizureData.filter((item) => item.id !== id));
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
            m="10px 0 0 0"
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
                rows={seizureData}
                columns={seizureColumnsWithActions.map((column) =>
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
                    {"Record New Seizure"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="description"
                        label="Type"
                        fullWidth
                        value={addItem.description}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        label="Activity"
                        fullWidth
                        value={addItem.activity}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="mood"
                        label="Mood"
                        fullWidth
                        value={addItem.mood}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="starttime"
                        label="Start Time"
                        type="datetime-local"
                        fullWidth
                        value={addItem.starttime}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="endtime"
                        label="End Time"
                        type="datetime-local"
                        fullWidth
                        value={addItem.endtime}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="duration"
                        label="Duration (min)"
                        fullWidth
                        value={addItem.duration}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="possibleTrigger"
                        label="Possible Trigger"
                        fullWidth
                        value={addItem.possibleTrigger}
                        onChange={handleAddChange}
                    />
                    {/* <input
                        type="file"
                        name="attachName"
                        onChange={(e) => handleFileUpload(e.target.files)}
                    /> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsAddDialog(false)}>Cancel</Button>
                    <Button onClick={() => CreateNewSeizure()} autoFocus>
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
                    <TextField
                        autoFocus
                        margin="dense"
                        name="description"
                        label="Type"
                        fullWidth
                        value={editedItem.description}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        label="Activity"
                        fullWidth
                        value={editedItem.activity}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="mood"
                        label="Mood"
                        fullWidth
                        value={editedItem.mood}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="starttime"
                        label="Start Time"
                        type="datetime-local"
                        fullWidth
                        value={editedItem.starttime}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="endtime"
                        label="End Time"
                        type="datetime-local"
                        fullWidth
                        value={editedItem.endtime}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="duration"
                        label="Duration (min)"
                        fullWidth
                        value={editedItem.duration}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="possibleTrigger"
                        label="Possible Trigger"
                        fullWidth
                        value={editedItem.possibleTrigger}
                        onChange={handleEditChange}
                    />
                    {/* <input
                        type="file"
                        name="attachName"
                        name="attachName"
                        onChange={(e) => handleFileUpload(e.target.files)}
                    /> */}
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

