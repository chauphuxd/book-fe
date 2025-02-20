import { message } from "antd";
import { useEffect } from "react";

const HomePage = () => {


    useEffect(() => {
        const successMessage = localStorage.getItem("successMessage");
        if (successMessage) {
            message.success(successMessage);
            localStorage.removeItem("successMessage");
        }
    }, []);
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    )
}
export default HomePage;