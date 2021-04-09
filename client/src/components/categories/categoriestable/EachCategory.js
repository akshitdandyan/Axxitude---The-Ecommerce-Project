import React from 'react';
function EachCategory(props){
    return(
        <div className="eachcategory">
            <h2>{props.type}</h2>
        </div>
    )
}
export default EachCategory;