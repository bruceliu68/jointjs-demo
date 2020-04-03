import "./index.less";
import "jointjs/dist/joint.css";
import React from "react";
import { init } from "@rematch/core";
import * as models from "./models";
import { Route, Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { routes } from "./router";
import Error from "@/pages/Error";

window.$ = require("jquery");
window.joint = require("jointjs");

const store = init({
	models
});

const history = createBrowserHistory();

const { dispatch } = store;
window.dispatch = dispatch;

class App extends React.Component {

	render() {
		return (
			<Provider store={store}>
				<Router history={history}>
					<Switch>
						{
							routes.map(route => (
								<Route key={route.path} path={route.path} component={route.component} exact={route.exact} />
							))
						}
						<Route component={Error} />
					</Switch>
				</Router>
			</Provider>
		);
	}
}

export default App;
