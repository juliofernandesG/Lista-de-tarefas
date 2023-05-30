import React, {Component} from "react";
import { connect } from "react-redux";
import BLogout from "../../atoms/BLogout";
import { logOut } from "../../../config/redux/action";
import './Header.css';
import { withRouter } from 'react-router-dom';

class Header extends Component{

    logout = async () =>{
        const res = await this.props.logOut().catch(err => err)
        const {history} = this.props;
        if(res){
            localStorage.clear();
            history.push('/login');
        }
      
    }

    render(){
        return(
            <header>
                <div className="container">
                <div className="row">
                    <div class="col-8 col-md-9 brand">
                            Minha lista de tarefas
                    </div>
                    <div className="col-4 col-md-3 logout">
                        <div>
                            {/* <button className="lot">Logout</button> */}
                            <BLogout login={this.props.isLogin} onClick={this.logout} />
                        </div>
                       
                    </div>
                </div>
                </div>
             
                
         </header>
        );
    }
}

const reduxState = (state) => ({
    isLogin: state.isLogin
})

const reduxDispatch = (dispatch) => ({
    logOut: () => dispatch(logOut())
})

export default withRouter(connect(reduxState,reduxDispatch) (Header));