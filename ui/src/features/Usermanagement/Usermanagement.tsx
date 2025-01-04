import React, { useEffect, useState } from 'react';
import { api } from '../../api/api'; // Assuming api.ts is in ../api directory

interface User {
    id?: string;
    email: string;
    password?: string; // Optional for editing users
    confirmPassword?: string; // Optional for editing users
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [formData, setFormData] = useState<User>({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
    });

    // Fetch users on component load
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await api.get<User[]>('/users'); // Updated endpoint
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreateOrUpdateUser = async () => {
        try {
            if (selectedUser?.id) {
                // Update User
                await api.put(`/users/${selectedUser.id}`, formData); // PUT endpoint
            } else {
                // Create User
                await api.post('/users', formData); // POST endpoint
            }
            fetchUsers();
            resetForm();
        } catch (error) {
            console.error('Error creating/updating user:', error);
        }
    };

    const handleDeleteUser = async (id: string) => {
        try {
            await api.delete(`/users/${id}`); // DELETE endpoint
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setFormData(user);
    };

    const resetForm = () => {
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
        });
        setSelectedUser(null);
    };

    return (
        <div>
            <h1>User Management</h1>

            {/* User Form */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateOrUpdateUser();
                }}
            >
                <h2>{selectedUser ? 'Edit User' : 'Add User'}</h2>
                <input
                    name="email"
                    value={formData.email}
                    placeholder="Email"
                    onChange={handleInputChange}
                    required
                />
                <input
                    name="password"
                    value={formData.password || ''}
                    placeholder="Password"
                    onChange={handleInputChange}
                    type="password"
                />
                <input
                    name="confirmPassword"
                    value={formData.confirmPassword || ''}
                    placeholder="Confirm Password"
                    onChange={handleInputChange}
                    type="password"
                />
                <input
                    name="firstName"
                    value={formData.firstName}
                    placeholder="First Name"
                    onChange={handleInputChange}
                    required
                />
                <input
                    name="lastName"
                    value={formData.lastName}
                    placeholder="Last Name"
                    onChange={handleInputChange}
                    required
                />
                <input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    placeholder="Phone Number"
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">{selectedUser ? 'Update User' : 'Create User'}</button>
                {selectedUser && (
                    <button
                        type="button"
                        onClick={resetForm}
                    >
                        Cancel
                    </button>
                )}
            </form>

            {/* User List */}
            <h2>User List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <strong>{user.email}</strong> ({user.firstName} {user.lastName}) - {user.phoneNumber}
                        <button onClick={() => handleEditUser(user)}>Edit</button>
                        <button onClick={() => handleDeleteUser(user.id!)}>Deactivate</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
