import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const SignUpButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button variant="contained" onClick={() => loginWithRedirect({
    screen_hint: 'signup',
    appState: {
      returnTo: "/verify-email",
    },
  })}>Sign Up</Button>;
};

export default SignUpButton;