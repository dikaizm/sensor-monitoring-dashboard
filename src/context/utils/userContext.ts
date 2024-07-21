import { createContext, useContext } from "react";

// Define the shape of the context value
interface UserContextType {
    user: UserType | null;
}

// Create the context with a default value of null
export const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}