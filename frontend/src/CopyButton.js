import React, { useState } from "react";
import { Tooltip, Button, Zoom } from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";


function CopyButton({ number }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    setCopied(true);
    navigator.clipboard.writeText(`${number}`);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <Tooltip
      arrow
      disableFocusListener
      TransitionComponent={Zoom}
      title={copied ? "Copied!!" : "Click to Copy"}
      sx={{p: 4}}
    >
      <Button
        variant="outlined"
        size="small"
        onClick={copyToClipboard}
        endIcon={<ContentPasteIcon />}
        sx={{
          fontWeight: 700,
          borderRadius: "10px",
          color: "#007FFF",
        }}
      >
        {number}
      </Button>
    </Tooltip>
  );
}

export default CopyButton;
