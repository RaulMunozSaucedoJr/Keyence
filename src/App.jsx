import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'boxicons'
import './frontend/assets/scss/styles.css'
import {
	SignUp,
	Login,
	NotFound,
	RecoverPassword,
	Dashboard,
} from './frontend/components/index/pages'
import { Navbar, Mobile } from './frontend/components/index/organisms/index'
import * as PrivateRouting from './frontend/features/routes/private/PrivateRoutes'
import * as PublicRouting from './frontend/features/routes/public/PublicRoutes'
import Private from './backend/security/private/private'
import { AuthContextProvider } from './backend/security/authentication/context/authContext'

const App = () => {
	return (
		<>
			<AuthContextProvider>
				<Navbar />
				<Mobile />
				<Routes>
					<Route exact path={PublicRouting.NotFound} element={<NotFound />} />
					<Route exact path={PublicRouting.SignUp} element={<SignUp />} />
					<Route exact path={PublicRouting.Login} element={<Login />} />
					<Route
						exact
						path={PublicRouting.RecoverPassword}
						element={<RecoverPassword />}
					/>
					<Route
						exact
						path={PrivateRouting.Dashboard}
						element={
							<Private>
								<Dashboard />
							</Private>
						}
					/>
				</Routes>
			</AuthContextProvider>
		</>
	)
}

export default App
