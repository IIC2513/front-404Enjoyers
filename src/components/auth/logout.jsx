import React, {useContext, useState} from "react";
import { AuthContext } from "./AuthContext";

const LogoutButton = () => {
    const {logout} = useContext(AuthContext);
    const [msg, setMsg] = useState("");

    const handleLogout = () => {
        logout();
        setMsg("Succesfully logged out");
    }

    return (
        <>
            {msg.length > 0 && msg}
            <button onClick={handleLogout}> Log out </button>
        </>
    );
}

export default LogoutButton