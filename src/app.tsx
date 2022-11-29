import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import { } from 'react-dom';
import store from './store/store';
import { startSetExpenses } from './actions/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { auth } from './firebase/firebase';
import { login, logout } from './actions/auth';
import LoadingPage from './components/LoadingPage';

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('app')!);
let hasRendered = false;

const renderApp = () => {
    if (!hasRendered) {
        root.render(jsx);
        hasRendered = true;
    }
};


root.render(<LoadingPage />);

auth.onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid, user.displayName!));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/dashboard');
            }
        });
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});