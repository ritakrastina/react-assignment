import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGameList, reorderGameList, editGameStatus } from "../store/slices/dashboardSlice";
import { Container, Draggable, DropResult } from "react-smooth-dnd";
import { DashboardState } from "../types/dashboardState";
import { Game } from "../types/game";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/system/Box";
import Loading from "./Loading";
import ErrorAlert from "./ErrorAlert";

function Settings() {

  const dispatch = useDispatch();
  const { loading, gameList, error } = useSelector((state: DashboardState) => state);

  useEffect(() => {
    dispatch(getGameList());
  }, []);

  const onDrop = ({ removedIndex, addedIndex }: DropResult) => {
    dispatch(reorderGameList({ indexFrom: removedIndex ?? -1, indexTo: addedIndex ?? -1 }));
  };

  const handleChange = (game: Game) => {
    dispatch(editGameStatus({ gameId: game.id }));
  };

  return (
    <Fragment>
      <Loading loading={loading} />
      <ErrorAlert error={error} />

      <Box
        sx={{
          color: "gray",
          fontSize: 12,
          backgroundColor: "#f8f8f8",
          borderRadius: "10px",
          padding: "10px"
        }}
      >
        *Changes are saved automatically
      </Box>
      
      <List>
        <Container
          dragHandleSelector=".drag-handle"
          lockAxis="y"
          onDrop={onDrop}
        >
          {
            gameList &&
            [...gameList]
              .sort((a, b) => { return a.orderIndex - b.orderIndex; })
              .map(
                game => (
                  <Draggable key={game.id}>
                    <ListItem key={game.id} divider={true}>
                      <ListItemAvatar>
                        <Avatar alt={game.title} src={game.imageUrl} />
                      </ListItemAvatar>
                      <ListItemText primary={game.title} />
                      <Box
                        sx={{
                          marginRight: "5%"
                        }}
                      >
                        <Tooltip title={game.enabled ? "Disable" : "Enable"}>
                          <Switch
                            edge="end"
                            checked={game.enabled}
                            onChange={() => handleChange(game)}
                          />
                        </Tooltip>
                      </Box>
                      <Tooltip title="Reorder">
                        <ListItemIcon
                          className="drag-handle"
                          style={{ cursor: "move" }}
                        >
                          <DragIndicatorIcon />
                        </ListItemIcon>
                      </Tooltip>
                    </ListItem>
                  </Draggable>
                )
              )
          }
        </Container>
      </List>
    </Fragment>
  );
}

export default Settings;