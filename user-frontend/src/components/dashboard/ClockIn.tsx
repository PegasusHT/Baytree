import React from 'react';
import { Link } from 'react-router-dom';
import "../../css/dashboard/ClockIn.css"
import {IoFingerPrintOutline} from "react-icons/io5";
import { IconContext } from 'react-icons';

function ClockIn() {
    return (
        <div className={"clock-in"}>
            <h5 className={"header-component"}>
                Create Session
            </h5>
            <div className={"button-div"}>
                <Link to={'/session'}>
                    <IconContext.Provider
                        value={{ color: '#fff', size:'50px'}}>
                        <IoFingerPrintOutline />
                    </IconContext.Provider>
                </Link>
            </div>
        </div>
    )
}

export default ClockIn;