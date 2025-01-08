import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Paper,
    Typography,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Switch,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { api } from '../../api/api';

type User = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: string;
    isActive: boolean;
};

export const UserManagement = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const { control, handleSubmit, reset } = useForm<User>();

    // Fetch users
    const fetchUsers = async () => {

        try {
            const { data } = await api.get('/users');
            setUsers(data);
            const updatedUser = { ...user, isActive: !user.isActive };

            // Update the UI optimistically
            setUsers((prevUsers) =>
                prevUsers.map((u) => (u.id === user.id ? updatedUser : u))
            );
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddUser = () => {
        setEditingUser(null);
        reset({
            email: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            role: '',
            isActive: true,
        });
        setIsDialogOpen(true);
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user);
        reset(user);
        setIsDialogOpen(true);
    };

    const handleDeleteUser = async (id: number) => {
        try {
            await api.delete(`/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const toggleUserStatus = async (user: User) => {
        const updatedUser = { ...user, isActive: !user.isActive }; // Optimistically toggle the status

        // Update state immediately for smoother UI
        setUsers((prevUsers) =>
            prevUsers.map((u) => (u.id === user.id ? updatedUser : u))
        );

        try {
            // Send updated user data to the API
            await api.put(`/users/${user.id}/toggle-status`, { isActive: !user.isActive });
        } catch (error) {
            console.error('Error toggling user status:', error);

            // Revert the status in case of API failure
            setUsers((prevUsers) =>
                prevUsers.map((u) =>
                    u.id === user.id ? { ...updatedUser, isActive: user.isActive } : u
                )
            );
        }
    };

    const onSubmit = async (user: User) => {
        try {
            if (editingUser) {
                await api.put(`/users/${editingUser.id}`, user);
            } else {
                await api.post('/users', user);
            }
            setIsDialogOpen(false);
            fetchUsers();
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h5">User Management</Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleAddUser}
                >
                    Add User
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>IsActive</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.phoneNumber}</TableCell>
                                <TableCell>{user.role}</TableCell>


                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Switch
                                            checked={user.isActive}
                                            onChange={() => toggleUserStatus(user)}
                                            color="primary"
                                        />
                                        <Typography variant="body2">
                                            {user.isActive ? 'Active' : 'Not Active'}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleEditUser(user)}
                                        color="primary"
                                    >
                                        <Edit />
                                    </IconButton>
                                    {/*<IconButton*/}
                                    {/*    onClick={() => handleDeleteUser(user.id)}*/}
                                    {/*    color="error"*/}
                                    {/*>*/}
                                    {/*    <Delete />*/}
                                    {/*</IconButton>*/}
                                </TableCell>
                            </TableRow>
                        ))}
                        {!users.length && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <Typography color="text.secondary" py={3}>
                                        No users available
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog for User Creation/Editing */}
            <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    {editingUser ? 'Edit User' : 'Add New User'}
                </DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ mt: 2 }}>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                            )}
                        />
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="First Name"
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                            )}
                        />
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Last Name"
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="password"
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                            )}
                        />
                        <Controller
                            name="phoneNumber"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Phone Number"
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                            )}
                        />
                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    label="Role"
                                    fullWidth
                                    margin="normal"
                                    required
                                >
                                    <MenuItem value="SYSTEM_ADMIN">System Admin</MenuItem>
                                    <MenuItem value="COMPANY_ADMIN">Company Admin</MenuItem>
                                    <MenuItem value="COMPANY_WORKER">Company Worker</MenuItem>
                                    <MenuItem value="USER">User</MenuItem>
                                </TextField>
                            )}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit(onSubmit)} variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
