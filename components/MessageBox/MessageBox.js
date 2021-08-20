import React from "react";
import classes from "./MessageBox.module.scss";

export default function MessageBox(props) {
    return (
        <div className={`${classes.alert} ${props.variant === 'danger' ? classes.alertDanger : classes.alertInfo}`}>
            {props.children}
        </div>
    );
}
