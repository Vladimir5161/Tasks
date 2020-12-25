import React from "react";

const Preloader: React.FC<any> = (): any => {
    return (
        <div className="preloader">
            <img src="/loader.gif" alt="" />
        </div>
    );
};

export default Preloader;
