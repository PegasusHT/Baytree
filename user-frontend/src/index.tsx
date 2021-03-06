import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './css/dashboard/App.css';
import App from './App';
import Store from "./store/store";
import Api from './pages/api';

interface State {
    store: Store;
}

const store = new Store();

export const Context = createContext<State>({
    store,
})

const runApp = async () => {
  Api.init();

ReactDOM.render(
    <Context.Provider value={{
        store
    }}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Context.Provider>,
  document.getElementById('root')
);
}

runApp()
