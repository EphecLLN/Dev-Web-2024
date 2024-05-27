import React from 'react'
import "./DropdownItem.css"

const DropdownItem = ({children}) => {
    return (
        <div className="dropdown-item">
            {children}
        </div>
    );
}

export default DropdownItem;