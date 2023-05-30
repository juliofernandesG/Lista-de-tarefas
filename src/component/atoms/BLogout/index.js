import React from 'react';

const BLogout = ({onClick, login}) => {
    if(login){
        return <button onClick={onClick} className="lot">Deseja sair?</button>
    }
    else{
        return <div></div>
    }
}

export default BLogout;