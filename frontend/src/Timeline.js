import React from "react";
import { Timeline as MUITimeline } from "@mui/lab";
import Event from "./Event";
import CopyButton from "./CopyButton";

function Timeline({ history }) {
  const { label, status, parcel_tracking_items } = history;
  const { tracking_number, external_tracking_number } = label;

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <CopyButton number={tracking_number} />
        <CopyButton number={external_tracking_number} />
      </div>
      <div className="mr-8">
        <MUITimeline position="right" sx={{py: "6px", pr: "16px", pl: "0px"}}>
          {parcel_tracking_items.map((stop, i) => (
            <Event
              key={i}
              status={status}
              info={stop}
              i={i}
              eventsLength={parcel_tracking_items.length}
            />
          ))}
        </MUITimeline>
      </div>
    </div>
  );
}

export default Timeline;
