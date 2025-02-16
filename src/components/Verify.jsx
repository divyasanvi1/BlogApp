import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";

const Verify = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("Verifying your email...");

    useEffect(() => {
        const userId = searchParams.get("userId");
        const secret = searchParams.get("secret");

        if (!userId || !secret) {
            setMessage("Invalid verification link.");
            return;
        }

        const verifyEmail = async () => {
            try {
                await authService.account.updateVerification(userId, secret);
                setMessage("Email verified successfully! Redirecting to login...");
                setTimeout(() => navigate("/login"), 3000);
            } catch (error) {
                setMessage("Verification failed. Please try again.");
            }
        };

        verifyEmail();
    }, [searchParams, navigate]);

    return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-xl">{message}</p>
        </div>
    );
};

export default Verify;
