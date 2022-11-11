import { Redirect, Route, Switch } from 'react-router';
import { BoomiInventory } from 'views/Boomi';
import { privateRoute } from 'routes';

const Inventory = () => {
  return (
    <Switch>
      <Route path={privateRoute.projectInventory.urlBoomi} component={BoomiInventory} />
      <Redirect from='/' to={privateRoute.home.path} />
    </Switch>
  );
};

export default Inventory;
