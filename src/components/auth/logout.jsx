import React, {useContext, useState} from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";




const LogoutButton = () => {
    const {logout} = useContext(AuthContext);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        setMsg("Succesfully logged out");
        navigate("/");
    }

    return (
        <>
            {msg.length > 0 && msg}
            <button onClick={handleLogout}> Log out </button>
        </>
    );
}

export default LogoutButton