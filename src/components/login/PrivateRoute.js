import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useLocalState } from "../../util/useLocalStorage";
import grab from "../../services/fetchService";


const PrivateRoute = ({children}) => {
    const [jwt,setJwt] = useLocalState("", "jwt");
    const [isLoading, setIsLoading] = useState(true);
    const[isValid,setIsValid] = useState(null);

    if(jwt){
        grab(`/api/v1/auth/validate?token=${jwt}`,"get",jwt).then(isValid => {
            setIsValid(isValid);
            setIsLoading(false);
        });
    }
    else{
        return <Navigate to = "/login" />;
    }

    return isLoading ? <div> Loading...</div> : isValid === true ? children : <Navigate to = "/login"/>;

};

export default PrivateRoute;