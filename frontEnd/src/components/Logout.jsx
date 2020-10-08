import { UserRepository } from "../repository/userRepository";

import React from 'react';
import { useHistory } from "react-router-dom";


function Logout({props}) {

 const history = useHistory();
    return (
        <div>
            
            <button className="btn" onClick={(e) => {
                debugger;
                e.preventDefault();
                new UserRepository().logout();
                history.push("/login");
                    
            }}>Logout</button>
        </div>
    )
}

export default Logout;