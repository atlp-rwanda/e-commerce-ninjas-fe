/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import Table from '../../components/table/Table';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getAllUsers, updateUserRole } from '../../store/features/admin/adminSlice';
import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function Users() {
    const dispatch = useAppDispatch();
    const { users, isLoading } = useAppSelector((state) => state?.admin)
    const [localUserState, setLocalUserState] = useState([]);
    const [open, setOpen] = useState(false);
    const [pendingRoleChange, setPendingRoleChange] = useState(null);

    const headers = ['N0', 'Profile', 'Name', 'Email', 'Phone', 'Gender', 'Role', 'Registered At', 'Status', 'Actions'];

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch, getAllUsers]);

    useEffect(() => {
        setLocalUserState(users ? users.map(user => ({
            ...user,
            newStatus: user.status,
            newRole: user.role,
        })) : []);
    }, [users]);

    const handleRoleChange = (userId, newRole) => {
        if (newRole === 'admin') {
            setPendingRoleChange({ userId, newRole });
            setOpen(true);
        } else {
            setLocalUserState(prevState =>
                prevState.map(user =>
                    user.id === userId ? { ...user, newRole } : user
                )
            );
        }
    };

    const handleSaveClick = (userId) => {
        const user = localUserState.find(user => user.id === userId);
        if (user) {
            dispatch(updateUserRole({ userId: user.id, role: user.newRole }));
        }
    };

    const handleConfirmRoleChange = () => {
        const { userId, newRole } = pendingRoleChange;
        setLocalUserState(prevState =>
            prevState.map(user =>
                user.id === userId ? { ...user, newRole } : user
            )
        );
        setPendingRoleChange(null);
        setOpen(false);
    };

    const handleClose = () => {
        setPendingRoleChange(null);
        setOpen(false);
    };

    const rows = localUserState 
    ? localUserState
        .filter(user => user.role === 'seller' || user.role === 'buyer')
        .map((user, index) => [
            index + 1,
            <img src={user.profilePicture} alt="image" className='Profile' />,
            user.firstName + "  " + user.lastName,
            user.email,
            user.phone,
            user.gender,
            <select name="role" value={user.newRole} id="" className='user__role' onChange={(e) => handleRoleChange(user.id, e.target.value)}>
                <option value="admin">Admin</option>
                <option value="seller">Seller</option>
                <option value="buyer">Buyer</option>
            </select>,
            new Date(user.createdAt).toLocaleDateString(),
            <div className="switch">
                <Switch {...{ inputProps: { 'aria-label': 'Color switch demo' } }} defaultChecked={user.status === "enabled"} color='warning' />
            </div>,
            <div className="action__icons">
                <Tooltip TransitionComponent={Zoom} title="Save" arrow >
                    <IconButton onClick={() => handleSaveClick(user.id)}>
                        <SaveIcon className='icon__save' />
                    </IconButton>
                </Tooltip>
                <Tooltip TransitionComponent={Zoom} title="Delete" arrow>
                    <IconButton>
                        <DeleteIcon className='icon__delete' />
                    </IconButton>
                </Tooltip>
            </div>
        ])
    : [];

    return (
        <div className='main__container'>
            {isLoading && (
                <div className="table__spinner">
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress
                            sx={{
                                backgroundColor: '#fff',
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: '#ff8a46',
                                },
                            }}
                        />
                    </Box>
                </div>
            )}
            <Table title={'All Users'} headers={headers} rows={rows} />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Role Change"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{fontSize:"1.6rem"}}>
                        Are you sure you want to change this user's role to Admin?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
    <Button 
        onClick={handleClose} 
        sx={{
            backgroundColor: "primary.main", 
            color: "#fff", 
            fontSize: "1.2rem",
            '&:hover': {
                backgroundColor: "primary.dark",
                color: "#fff"
            }
        }}
    >
        Cancel
    </Button>
    <Button 
        onClick={handleConfirmRoleChange} 
        sx={{
            backgroundColor: "#ff6d18",
            color: "#fff", 
            fontSize: "1.2rem",
            '&:hover': {
                backgroundColor: "#e65b00",
                color: "#fff"
            }
        }} 
        autoFocus
    >
        Confirm
    </Button>
</DialogActions>

            </Dialog>
        </div>
    )
}
