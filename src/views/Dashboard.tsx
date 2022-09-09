import { useAuth0 } from "@auth0/auth0-react";
import { Alert, AlertTitle } from "@mui/material";

const Dashboard = ({...props}) => {
    const { user, isAuthenticated, logout } = useAuth0();
    return (
        <>
            {props.notify ? 
                <Alert severity="info" className="drop-shadow-md mb-5">
                    <AlertTitle>Verify Email</AlertTitle>
                    Check your email for the verification link.</Alert>
            : null}
            <h1>Dashboard</h1>
            <pre>{ JSON.stringify(user, null, 2) }</pre>
        </>
    )
}

export default Dashboard;