import React, { useState } from "react";
import Track from "./Track";
import Login from "./Login";
import { Tabs, Tab } from "@mui/material";

function App() {
  const [tab, setTab] = useState("one");
  const handleTabChange = (event, value) => setTab(value);

  const views = {
    one: Track,
    two: Login,
  };
  const CurrentView = views[tab];

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-between">
      <div className="flex flex-col items-center basis-[75%] max-w-[50%] min-w-[50%] justify-center min-h-[95vh]">
        <div className="flex flex-col w-full justify-items-center px-[24px] bg-white rounded-xl">
          <Tabs
            value={tab}
            onChange={handleTabChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="tabs"
            sx={{
              display: "flex",
              "& .MuiTabs-flexContainer": {
                justifyContent: "center",
              },
            }}
          >
            <Tab value="one" label="Track" />
            <Tab value="two" label="Login" />
          </Tabs>
          <CurrentView />
        </div>
      </div>
      <div>
        <footer className="text-white text-center text-sm">
          Created by Derek Mackey.
        </footer>
      </div>
    </div>
  );
}

export default App;
