import React from 'react';
import {Link} from 'react-router-dom';

export default function Input(props) {
    return (
            <button className="btn btn-primary w-100 mt-3"
                  type={props.type}>
                      {props.text}     
            </button>
    )
}