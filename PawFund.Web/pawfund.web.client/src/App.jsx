import React from 'react';
import ReactDOM from 'react-dom';
import {OpenApiAdmin } from '@api-platform/admin';

const Admin = () => <OpenApiAdmin
    docEntrypoint="https://localhost:7187/swagger/index.html" // Replace with your own OpenAPI documentation entrypoint
    entrypoint="https://localhost:7187" // Replace with your own API entrypoint
/>;

ReactDOM.render(<Admin />, document.getElementById('root'));

export default App;