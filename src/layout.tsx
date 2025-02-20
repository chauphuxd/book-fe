import { Outlet } from "react-router-dom";
import AppHeader from "./components/layout/app.header";
import { fetchAccountAPI } from "services/api";
import { useCurrentApp } from "components/context/app.context";
import { useEffect } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

function Layout() {
    const { setUser, setIsAuthenticated, isAppLoading, setIsAppLoading } = useCurrentApp();

    useEffect(() => {
        const fectchAccount = async () => {
            const res = await fetchAccountAPI();
            if (res.data) {
                setUser(res.data.user)
                setIsAuthenticated(true)
            }
            setIsAppLoading(false)
        }

        fectchAccount();
    }, [])
    return (
        <>
            {isAppLoading === false ?
                <div>
                    <AppHeader />
                    <Outlet />

                </div> :
                <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <PacmanLoader
                        color="#36d6b4"
                        size={30}
                    />
                </div>}
        </>
    );
}

export default Layout;
