import React from "react";
import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import { LocalShipping, CheckCircle, Attachment } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";

const FirstEventDot = () => (
  <TimelineDot sx={{ alignSelf: "center" }}>
    <LocalShipping />
  </TimelineDot>
);
const RegularDot = () => <TimelineDot sx={{ alignSelf: "center" }} />;
const LastEventDot = () => (
  <TimelineDot
    sx={{
      borderColor: "#1aa251",
      alignSelf: "center",
      backgroundColor: "transparent",
    }}
  >
    <CheckCircle sx={{ color: "rgb(76,187,135)" }} />
  </TimelineDot>
);

function Event({ status, info, i, eventsLength }) {
  const {
    state,
    location,
    country,
    city,
    timestamp,
    tracking_code,
    tracking_code_vendor,
  } = info;
  const countryCity = state
    ? state + ", " + city + ", " + country.isoCode
    : location + ", " + country.isoCode;
  const description =
    tracking_code === null
      ? tracking_code_vendor.tracking_code.tracking_code_locales[0].description
      : tracking_code.tracking_code_locales[0].description;

  const firstEvent = i === eventsLength - 1;
  const lastEvent = i === 0;

  let Dot;
  if (firstEvent) {
    Dot = FirstEventDot;
  } else if (lastEvent && status === "delivered") {
    Dot = LastEventDot;
  } else {
    Dot = RegularDot;
  }

  return (
    <TimelineItem>
      <TimelineOppositeContent sx={{ margin: "auto 0px" }}>
        <Typography
          sx={{
            color: "rgb(53, 53, 53)",
            fontWeight: "bold",
            fontSize: "13px",
          }}
        >
          {new Date(timestamp).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Typography>
        <Typography
          variant="caption"
          component="span"
          sx={{
            color: "rgb(149, 165, 166)",
            fontSize: "10px",
            lineHeight: 1.5,
          }}
        >
          {new Date(timestamp).toLocaleString("en-US", {
            hour: "numeric",
            hour12: true,
            minute: "numeric",
          })}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator
        sx={{ width: "33px", alignItems: "center", flex: "0 1 auto" }}
      >
        <Dot />
        {firstEvent ? null : (
          <TimelineConnector
            sx={{
              ...(lastEvent && {
                backgroundColor: "secondary.main",
              }),
            }}
          />
        )}
      </TimelineSeparator>
      <TimelineContent sx={{ margin: "auto 0px" }}>
        <div className="flex flex-col">
          <Typography
            variant="h6"
            component="span"
            sx={{
              fontSize: "16px",
              lineHeight: 1.6,
              color: "#20262D",
            }}
          >
            {description}
          </Typography>
          <Typography
            variant="overline"
            component="span"
            sx={{
              textTransform: "uppercase",
              lineHeight: 2.66,
              color: "#20262D",
              letterSpacing: "0px",
            }}
          >
            {countryCity}
          </Typography>
          {description === "Awaiting payment" ? (
            <div>
              <Button
                variant="outlined"
                startIcon={<Attachment />}
                target="_blank"
                href="https://apps.correios.com.br/cas/login?service=https%3A%2F%2Fapps.correios.com.br%2Fportalimportador%2Fpages%2FpesquisarRemessaImportador%2FpesquisarRemessaImportador.jsf"
                sx={{
                  padding: "5px 15px",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  textTransform: "none",
                  lineHeight: 1.75,
                  borderRadius: "10px",
                }}
              >
                Go to Pay Taxes
              </Button>
            </div>
          ) : null}
        </div>
      </TimelineContent>
    </TimelineItem>
  );
}

export default Event;