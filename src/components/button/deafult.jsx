import React from "react";
import PropTypes from "prop-types";

const Button = (props) => {
    const { label, onClick, type } = props;

    const typeClasses = {
        add: "",
        modify: "Button_modify",
        delete: "Button_delete",
    };
    return (
        <button className={`Button ${typeClasses[type]}`} onClick={onClick}>
            {label}
        </button>
    );
}

export default Button;

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.oneOf(["add", "modify", "delete"]).isRequired,
};