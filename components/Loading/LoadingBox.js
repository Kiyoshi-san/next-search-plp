import React from "react";
import classes from "./LoadingBox.module.scss";

export default function LoadingBox() {
    return (
        <div className={classes.loading}>
            <i className="fa fa-spinner fa-spin"></i>
            <span>Loading...</span>
        </div>
    );
}
