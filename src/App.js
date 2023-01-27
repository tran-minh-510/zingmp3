import './App.css'
import { BrowserRouter } from 'react-router-dom';
import Main from './Components/Main/Main';
import { Provider } from 'react-redux';
import reduxConfig from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { Auth0Provider } from '@auth0/auth0-react';

const { store, persistor } = reduxConfig()

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Auth0Provider
            domain="dev-evx4cz3irghr6uwm.us.auth0.com"
            clientId="WbyKLOAgZbfnq3FHttLaH1JAna7fgJKj"
            redirectUri={window.location.origin}
          >
            <Main />
          </Auth0Provider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
