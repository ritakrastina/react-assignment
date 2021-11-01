import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

const ErrorAlert = ({ error }: { error: string }) => {

  const [showError, setShowError] = useState(false);
  useEffect(() => {
    setShowError(!!error.length);
  }, [error]);

  return (
    <Collapse in={showError}>
      <Alert
        severity="error"
        onClose={() => { setShowError(false); }}
        style={{ marginBottom: 20 }}
      >
        {error}
      </Alert>
    </Collapse>
  )
};

export default ErrorAlert;