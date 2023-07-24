import React from 'react';
//import { useAuth } from "../hooks/useAuth";
import { createContext, useContext, useState } from "react";
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: () => {},
  onLogout: () => {},
});

export default AuthContext;

