import { message } from "antd";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const LoginPage = () => {
    const location = useLocation();

    useEffect(() => {
        const successMessage = localStorage.getItem("successMessage");
        if (successMessage) {
            message.success(successMessage);
            localStorage.removeItem("successMessage");
        }
    }, []);
    return (
        <div>
            <h1>Login Page</h1>
        </div>
    );
};
export default LoginPage;
