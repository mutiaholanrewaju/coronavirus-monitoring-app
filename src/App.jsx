








import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/Home/home';
import Test from './pages/ExamplePage/example';
import Update from './pages/world_update/update';

function App() {
	return (

		<Router>

			<Switch>

				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/test-page">
					<Test />
				</Route>
				<Route path="/update-page">
					<Update />
				</Route>
			</Switch>

			<Navbar />

		</Router>
	);
}

export default App;
























// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Navbar from './components/navbar';
// import Home from './pages/Home';
// import Test from './pages/ExamplePage';

// function App() {
// 	return (
// 		<Router>
// 			<Navbar />
// 			<Switch>
// 				<Route exact path="/">
// 					<Home />
// 				</Route>
// 				<Route path="/test-page">
// 					<Test />
// 				</Route>
// 			</Switch>
// 		</Router>
// 	);
// }

// export default App;
