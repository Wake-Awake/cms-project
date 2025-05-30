import { createContext, useContext, useEffect, useState } from "react";
// import mockToys from "../mocks/toysMock";

import AuthContext from "./AuthContext";
import storageService from "../service/storageService";
import mockToys from "../mocks/toysMock";

// Helper functions for user storage
const USER_STORAGE_KEY = "users";

function getStoredUsers() {
    return storageService.getItem(USER_STORAGE_KEY) || [];
}

function saveUsers(users) {
    storageService.setItem(USER_STORAGE_KEY, users);
}

function findUserByEmail(email) {
    const users = getStoredUsers();
    return users.find(user => user.email === email);
}

function loginOrCreateUser(email, password) {
    let users = getStoredUsers();
    let user = users.find(u => u.email === email);
    if (user) {
        // Try login
        if (user.password === password) {
            return { success: true, user };
        } else {
            return { success: false, error: "Incorrect password" };
        }
    } else {
        // Create new account
        user = { email, password };
        users.push(user);
        saveUsers(users);
        return { success: true, user };
    }
}


const STORAGE_KEY = "toys";
const StorageContext = createContext();

function StorageProvider({ children }) {
    const [items, setItems] = useState([]);
    const { userEmail } = useContext(AuthContext);

    useEffect(() => {
        // Initialize storage if empty
        if (!storageService.hasItem(STORAGE_KEY)) {
            storageService.setItem(STORAGE_KEY, mockToys);
        }
        setItems(storageService.getItem(STORAGE_KEY) || []);
    }, []);

    function syncItems(newItems) {
        storageService.setItem(STORAGE_KEY, newItems);
        setItems(newItems);
    }

    function addNewItem(newItem) {
        if(newItem.isPrivate) {
            newItem['ownedBy'] = userEmail;
        }
        const newItems = [...items, newItem];
        syncItems(newItems);
        console.log(newItem);
    }

    function getAllItem() {
        return items;
    }

    function getItemByCondition(condition) {
        return items.filter(condition);
    }

    function updateItem(itemIndex, newData) {
        const newItems = [...items];
        newItems[itemIndex] = { ...newItems[itemIndex], ...newData };
        syncItems(newItems);
    }

    function deleteItem(deleteIndex) {
        const newItems = [...items];
        newItems.splice(deleteIndex, 1);
        syncItems(newItems);
    }

    return (
        <StorageContext.Provider value={{
            addNewItem,
            getAllItem,
            getItemByCondition,
            updateItem,
            deleteItem,
            items
        }}>
            {children}
        </StorageContext.Provider>
    );
}

export default StorageContext;
export { StorageProvider };