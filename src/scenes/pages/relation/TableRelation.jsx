import { useState } from "react";
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { Box, MenuItem, Dialog, DialogTitle,DialogContent, DialogActions,  DialogContentText, Button, FormControl, InputLabel, Select } from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { ToastContainer, toast } from 'react-toastify';
// Components
import { TableColumnRelationWithActions } from "./TableColumnRelation";
// API Calls
import { createRelation, deleteRelationById, updateRelationStateById } from "../../../services/relationService";

export const PatientTableRelation = ({ relations, setRelations, colors, doctors, userId }) => {
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isAddDialog, setIsAddDialog] = useState(false);
    const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
    const [addItem, setAddItem] = useState({
        doctorId: '',
        patientId: userId
    }); 

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setAddItem({ ...addItem, [name]: value });
    }
  
    const onAddRelation = async (data) => {
        console.log(relations)
        setIsAddDialog(false)
        try {
            const res = await createRelation(data);
            console.log(res.status, res.data)
            if(res.status === 201){
                toast.success(res.data.message);
                // Add new in relationData
                let newRelationData = [...relations];
                let tmp_data = doctors.find((item) => item.id === addItem.doctorId);
                tmp_data.id = res.data.relationId;
                newRelationData.push({...tmp_data, id: res.data.relationId, state: 'Pending'});
                
                setRelations(newRelationData);
                setAddItem({});
            } else {
                toast.warning(res.data.message);
            }
        } catch (error) {
                console.error("Server Error:", error);
                toast.error('Oop! Network Connection Error.');
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
            const res = await deleteRelationById(id);
            if(res.status === 200){
                toast.success(res.data.message);
                setRelations(relations.filter((item) => item.id !== id));
            } else {
                toast.warning("Your action didn't work. \nTry again.");
            }
        } catch (error) {
              console.error("Server Error:", error);
              toast.error("Oop! Network Connection Error.");
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
            }}
        >
            <Button variant="outlined"  color="success" startIcon={<AddOutlinedIcon />} onClick={() => setIsAddDialog(true)}>
                Add
            </Button>
            <DataGrid 
            rows={relations}
            columns={TableColumnRelationWithActions.map((column) =>
                column.field === "actions"
                ? {
                    ...column,
                    getActions: ({ id }) => [
                        <GridActionsCellItem
                            icon={<CancelOutlinedIcon />}
                            label="Cancel"
                            color="inherit"
                            onClick={() => handleDeleteClick(id)}
                        />,
                    ],   
                    }
                : column
            )}
            components={{ Toolbar: GridToolbar }} />
            <Dialog
                open={isAddDialog}
                onClose={() => setIsAddDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Add Relation"}
                </DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel id="doctorName-label">Doctor Name</InputLabel>
                        <Select
                            labelId="doctorName-label"
                            id="doctorName"
                            name="doctorId"
                            value={addItem.doctorId}
                            onChange={handleAddChange}
                            className="name-column--cell"
                            autoFocus
                            fullWidth
                        >
                            {
                                doctors?.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setIsAddDialog(false)}>Disagree</Button>
                <Button onClick={() => onAddRelation(addItem)} autoFocus>
                    Agree
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
                {"Confirm"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to cancel the relation with this doctor?
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

export const DoctorTableRelation = ({ relations, setRelations, colors }) => {
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isEditConform, setIsEditConform] = useState(false);
    const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

    const handleEditClcik = (id)  => {
        setSelectedItemId(id);
        setIsEditConform(true);
    };

    const AgreeEditConfirm  = () => {
        setIsEditConform(false);
        onEdit(selectedItemId)
    };  

    const onEdit = async (id) => {
        try {
            const res = await updateRelationStateById(id);
            console.log(res)
            if(res.status === 201){
                toast.success(res.data.message);
                setRelations(relations.map(item => {
                    if (item.id === id) {
                        return { ...item, state: 'Accept' }; // Merge edited data into the item
                    }
                    return item;
                }));
            } else {
                toast.warning("Sorry. Your action didn't work.\nTry again.");
            }
        } catch (error) {
              console.error("Server Error:", error);
              toast.error("Oop! Network Connection Error.");
        }
    }

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
            const res = await deleteRelationById(id);
            if(res.status === 200){
                toast.success("Deteled successfully.");
                setRelations(relations.filter((item) => item.id !== id));
            } else {
                toast.warning("Delete Failed.");
            }
        } catch (error) {
              console.error("Server Error:", error);
              toast.error("Oop! Network Connection Error.");
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
            }}
        >
            <DataGrid 
            rows={relations}
            columns={TableColumnRelationWithActions.map((column) =>
                column.field === "actions"
                ? {
                    ...column,
                    getActions: ({ id }) => [
                        <GridActionsCellItem
                            icon={<CheckCircleOutlinedIcon />}
                            label="Accept"
                            color="inherit"
                            onClick={() => handleEditClcik(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelOutlinedIcon />}
                            label="Cancel"
                            color="inherit"
                            onClick={() => handleDeleteClick(id)}
                        />,
                    ],   
                    }
                : column
            )}
            components={{ Toolbar: GridToolbar }} />
           <Dialog
                open={isEditConform}
                onClose={() => setIsEditConform(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Confirm"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to accept the relation with this patient?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setIsEditConform(false)}>Disagree</Button>
                <Button onClick={() => AgreeEditConfirm()} autoFocus>
                    Agree
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
                {"Confirm"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to cancel the relation with this doctor?
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