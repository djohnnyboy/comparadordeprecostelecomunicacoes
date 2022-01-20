import React from 'react';
import {Link} from 'react-router-dom';

export default function Edit(props) {
    return (
            <Link className="btn btn-primary float-right "
                  to={props.url}>{props.name}      
            </Link>
    )
}