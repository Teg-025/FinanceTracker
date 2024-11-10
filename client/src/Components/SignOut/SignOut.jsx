import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

export default function SignOut(){
    localStorage.removeItem("authToken")
    const navigate = useNavigate();
    navigate("/login")
}