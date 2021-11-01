import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import Games from './Games';
import Settings from './Settings';
import Box from '@mui/system/Box';

function Navigation() {
  const location = useLocation();

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'lightgray' }}>
        <Tabs value={location.pathname} >
          <Tab label="Games" value="/" to="/" component={Link} />
          <Tab label="Settings" value="/settings" to="/settings" component={Link} />
        </Tabs>
      </Box>
      <Box sx={{ padding: '20px' }}>
        <Switch>
          <Route exact path="/" component={Games} />
          <Route exact path="/settings" component={Settings} />
        </Switch>
      </Box>
    </div>
  );
}

export default Navigation;