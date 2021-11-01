import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = ({ loading }: { loading: boolean }) => (
  <Backdrop
    sx={{
      color: "#fff",
      zIndex: (theme) => theme.zIndex.drawer + 1
    }}
    open={loading}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default Loading;