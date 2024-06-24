import React from 'react';
import classes from "./HeaderAurora.module.css";

const HeaderAurora = () => {
    return (
        <div className={classes.auroraGradient}>
            <div className={classes.headerBody}>
                <div className={classes.auroraContent}>
                    <h1 className={classes.auroraTitle}>
                        Stock Valuation
                        <div className={classes.aurora}>
                            <div className={classes.auroraItem}></div>
                            <div className={classes.auroraItem}></div>
                            <div className={classes.auroraItem}></div>
                            <div className={classes.auroraItem}></div>
                        </div>
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default HeaderAurora;
