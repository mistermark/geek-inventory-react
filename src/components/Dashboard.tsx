import { Alert, AlertTitle } from "@mui/material";

const Dashboard = ({...props}) => {
    return (
        <>
            {props.notify ? 
                <Alert severity="info" className="drop-shadow-md mb-5">
                    <AlertTitle>Verify Email</AlertTitle>
                    Check your email for the verification link.</Alert>
            : null}
            <h1>Dashboard</h1>
        </>
    )
}

export default Dashboard;