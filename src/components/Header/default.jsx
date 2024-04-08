import React from "react";
import PropTypes from "prop-types";

const Header = (props) => {
    const { title } = props;
    return (
        <header className="Header">
            <h1 className="Header-Title">{title}</h1>
        </header>
    );
};

export default Header;

Header.propTypes = {
    title: PropTypes.string.isRequired,
};