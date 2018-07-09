import React from 'react';
import { Route, Switch, Router} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import NotFoundPage from '../components/NotFoundPage';
import Drawer from '../components/Drawer';
import LoginForm from '../components/LoginForm';

export const history = createHistory();

const AppRouter = () =>(
    <Router history={history}>
    <div>
        <Switch>
            <Route path="/" component={LoginForm} exact={true}/>
            <Route path="/calendar" component={Drawer}/>
            <Route path="/course" component={Drawer}/>
            <Route path="/deadline" component={Drawer}/>
            <Route path="/events" component={Drawer}/>
            <Route path="/conflict" component={Drawer}/>
            <Route path="/request" component={Drawer}/>
            <Route path="/room" component={Drawer}/>
            <Route path="/instructor" component={Drawer}/>
            <Route component={NotFoundPage} />
        </Switch>
    </div>
    </Router>
);

export default AppRouter;