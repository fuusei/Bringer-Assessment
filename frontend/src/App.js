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
    <div className="w-full min-h-screen flex flex-col items-center justify-between px-[20%]">
      <div className="flex flex-col justify-center min-h-[95vh]">
        <div className="grid justify-items-center p-9 bg-light-gray rounded-xl">
          <Tabs
            value={tab}
            onChange={handleTabChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="tabs"
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
