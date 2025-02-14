import './App.css';
import ApiKey from './components/ApiKey'
import Home from './components/Home';
import LogInButton from './components/LogInButton'
import Security from './okta-react/Security';
import LoginCallback from './okta-react/LoginCallback';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Login from './components/Login';
import ApolloWrapper from './components/ApolloWrapper';
import Metrics from './pages/Metrics';
import RequireAuth from './components/RequireAuth'
import { LOGIN, REDIRECT_URL, HOME, API_KEY, METRICS } from './constants/routes';
import { stripPath } from './utils/route_utils'
import { getOktaUser } from './utils/okta_utils'
const issuer = process.env.REACT_APP_OKTA_ISSUER
const restEndpoint = process.env.REACT_APP_REST_ENDPOINT || ""
//since there should be a 1-1 between client id and company, FOR NOW we will us this as the company
const clientId = process.env.REACT_APP_OKTA_ID || ""
const BASE_NAME = process.env.NODE_ENV === "production" ? "/job-coordinator" : ""
const App = () => {
  return <BrowserRouter basename={BASE_NAME}><AppWithBrowser /></BrowserRouter>
}

const OKTA_REDIRECT_URL = BASE_NAME + REDIRECT_URL

const AppWithBrowser = () => {
  const { pathname } = useLocation()
  const oktaAuth = new OktaAuth({
    issuer: issuer,
    clientId: clientId,
    redirectUri: OKTA_REDIRECT_URL,
  });
  const getUser = getOktaUser(oktaAuth)
  const navigate = useNavigate();
  const restoreOriginalUri = async (_: any, originalUri: string) => {
    navigate(toRelativeUrl(originalUri || HOME, pathname), { replace: true });
  };
  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} >
      <Routes>
        <Route path={REDIRECT_URL} element={<LoginCallback />} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={HOME} element={<Home loginElement={<LogInButton />} />}>
          <Route index element={<p>hello world</p>} />
          <Route element={<RequireAuth />}>
            <Route element={<ApolloWrapper />}>
              <Route path={stripPath(METRICS)} element={<Metrics company={clientId} />} />
              <Route path={stripPath(API_KEY)} element={<ApiKey restEndpoint={restEndpoint} company={clientId} getUser={getUser} />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Security >
  )
}
export default App;
