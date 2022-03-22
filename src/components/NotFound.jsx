import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="errorpage">
            <h1 className="text-center text-danger ">
                404 page Not Found!
            </h1>
            <Link type="button" className="btn btn-outline-primary" to="/">
              go to login page
            </Link>
        </div>
    )
}

export default NotFound
