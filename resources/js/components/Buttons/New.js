import React from 'react';
import {Link} from 'react-router-dom';

export default function New(props) {
    return (
        <div>
            <Link className="text-center btn btn-success float-right" 
                  to={props.url}>New {props.name}</Link>
        </div>
    )
}
