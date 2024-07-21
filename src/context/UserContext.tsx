// src/contexts/UserContext.tsx
import { useState, useEffect, ReactNode } from 'react';
import { UserContext } from './utils/userContext';

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        // Simulate fetching user data from an API or local storage
        const fetchUserData = () => {
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            setUser(userData);
        };        

        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
};
