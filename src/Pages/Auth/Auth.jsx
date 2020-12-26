import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/Loader/Loader";
import ProtectedRoute from '../../components/ProtectedRoute'

const Auth = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

};

export default Auth;