import { useCurrentApp } from "components/context/app.context";
import { useEffect } from "react";
import { fetchAccountAPI } from "services/api";

const AppHeader = () => {

  const { user } = useCurrentApp();



  return (
    <header>
      <h1>App Header</h1>
      <div className="">
        {JSON.stringify(user)}
      </div>
    </header>
  );
}
export default AppHeader;