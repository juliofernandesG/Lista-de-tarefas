import React from "react";

const Button = ({onClick, title, loading}) => {
    if(loading){
        return <button className="disable">Carregando...</button>
    }
    return(
        <button className="btn" onClick={onClick}>{title}</button>
    )
}


export default Button;