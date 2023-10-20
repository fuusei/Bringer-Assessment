import React from "react";
import {
  Timeline as MUITimeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import { Typography } from "@mui/material";

function Timeline({ history }) {
  console.log(history);
  const { tracking_number, external_tracking_number } = history;
  return (
    <div>
      <div className="flex justify-between">
        <div className="text-lg font-bold">{tracking_number}</div>
        <div className="text-lg font-bold">{external_tracking_number}</div>
      </div>
      <div>
        <MUITimeline position="right">
          {history.parcel_tracking_items.map((stop, i) => {
            const location = stop.state
              ? stop.state + ", " + stop.city + ", " + stop.country.isoCode
              : stop.location + ", " + stop.country.isoCode;
            const description =
              stop.tracking_code === null
                ? stop.tracking_code_vendor.tracking_code
                    .tracking_code_locales[0].description
                : stop.tracking_code.tracking_code_locales[0].description;
            return (
              <TimelineItem key={i}>
                <TimelineOppositeContent>
                  <div className="flex flex-col justify-right">
                    <div className="text-sm font-bold">
                      {new Date(stop.timestamp).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="text-gray text-xs">
                      {new Date(stop.timestamp).toLocaleString("en-US", {
                        hour: "numeric",
                        hour12: true,
                        minute: "numeric",
                      })}
                    </div>
                  </div>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <div className="flex flex-col justify-left">
                    <div className="font-bold">{description}</div>
                    <div className="text-xs leading-10">
                      {location.toUpperCase()}
                    </div>
                  </div>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </MUITimeline>
      </div>
    </div>
  );
}

export default Timeline;

/*
 for each of parcel_tracking_items
    location, country.isocode

    timestamp 
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const option2 = { hour: 'numeric', hour12: true, minute: "numeric" };
    
    description = tracking_code_vendor.tracking_code.tracking_code_locales[0].description
*/
