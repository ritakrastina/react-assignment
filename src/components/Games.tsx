import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGameList } from "../store/slices/dashboardSlice";
import { DashboardState } from "../types/dashboardState";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Loading from "./Loading";
import ErrorAlert from "./ErrorAlert";
import Tooltip from "@mui/material/Tooltip";

function Games() {

  const dispatch = useDispatch();
  const { loading, gameList, error } = useSelector((state: DashboardState) => state);

  useEffect(() => {
    dispatch(getGameList());
  }, []);

  return (
    <Fragment>
      <Loading loading={loading} />
      <ErrorAlert error={error} />

      <Grid container spacing={{ xs: 2 }}>
        {
          gameList
            .filter(game => game.enabled)
            .sort((a, b) => { return a.orderIndex - b.orderIndex; })
            .map(
              game => (
                <Grid item xs={12} sm={4} md={2} key={game.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={game.imageUrl || "https://placekitten.com/640/360"}
                      alt={game.title}
                    />
                    <CardContent>
                      <Tooltip title={game.title}>
                        <Typography noWrap>
                          {game.title}
                        </Typography>
                      </Tooltip>
                    </CardContent>
                  </Card>
                </Grid>
              )
            )
        }
        {
          !gameList.filter(game => game.enabled).length &&
          (
            <Grid item xs={12}>
              <Box
                sx={{
                  color: "gray",
                  fontSize: 14,
                  padding: "10px",
                  backgroundColor: "#f8f8f8",
                  borderRadius: "10px"
                }}
              >
                No games to display
              </Box>
            </Grid>
          )
        }
      </Grid>
    </Fragment>
  );
};

export default Games;