import React from 'react';
import ReactDOM from 'react-dom/client';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info.</p>}
            <WrappedComponent {...props}/>
        </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? (<WrappedComponent {...props} />) : (<p>Please log in</p>)}
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.createRoot(document.getElementById('app')).render(<AdminInfo isAdmin={false} info="Some stuff" />);
ReactDOM.createRoot(document.getElementById('app')).render(<AuthInfo isAuthenticated={false} info="Some stuff" />);