import React, {Component} from 'react';
import './Register.css';
import {CardBody, Label, CardTitle} from 'reactstrap';
import './Register.css'
import { registerUserFirebase } from '../../../config/redux/action';
import { connect } from 'react-redux';
import Button from '../../../component/atoms/button';
import { Link } from 'react-router-dom';


const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid=false)
    );
    return valid;
}

class Register extends Component {
    constructor(props){
        super(props)
            this.state = {
                email :null,
                password : null,
                errors:{
                    email: '',
                    password: ''
                }
            };
    }
 

    handleChangeText = (e) => {
        // this.setState({
        //     [e.target.id]: e.target.value,
        // })
        e.preventDefault();
        const {name, value} = e.target;
        let errors = this.state.errors;

        switch (name){
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                    ? ''
                    : 'Email Not Valid';
                break;
            case 'password':
                errors.password = 
                    value.length < 8
                    ? 'Password harus panjang 8 karakter'
                    : '';
                break;
            default:
                break;
        }
        this.setState({
            errors, [name]: value
        });

    }

    handleRegisterSubmit = async (e) => {
        // console.log('email:', this.state.email)
        // console.log('password:', this.state.password)
        e.preventDefault();
        if(validateForm(this.state.errors)){
            const {email, password} = this.state;
            const { history } = this.props;
            console.log('Data sebelum dikirim', email, password);
            const res = await this.props.registerUser({email, password}).catch(err => err)
            if(res){
                this.setState({
                    email : '',
                    password : ''
                })
                history.push('/login')
            }
        } else {
            console.error('Invalid Form')
        }
       
    }

    render(){
        const {errors} =this.state;
        return(
            <div className="container">
                <div className="col-12 col-md-6 offset-md-3">
                
                    <CardBody className="cardbody">
                    <CardTitle>Register</CardTitle>
                        <div className="inputs">
                            <Label>Email</Label>
                            <input className="input"  type="text" id="email" name="email" onChange={this.handleChangeText} value={this.state.email} />
                            {errors.email.length > 0 &&
                            <span>{errors.email}</span>}
                        </div>
                       
                        <div className="inputs">
                            <Label>Password</Label>
                            <input className="password"  type="password" id="password" name="password" onChange={this.handleChangeText} value={this.state.password}/>
                            {errors.password.length > 0 && 
                            <span>{errors.password}</span>}
                        </div>

                        <div className="row cardfooter">
                            <div className="col-12 col-md-9 info">
                                Já tem conta? <Link to="/login">Login</Link>
                            </div>
                            <div className="col-12 col-md-3 btn">
                                {/* <button onClick={this.handleRegisterSubmit}>Register</button> */}
                                <Button onClick ={this.handleRegisterSubmit} title="Register" loading={this.props.isLoading} />
                            </div>
                        </div>
                        
                    </CardBody>

                
            </div>
            </div>
        
        )
    }
}

const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    registerUser: (data) => dispatch(registerUserFirebase(data))
})

export default connect(reduxState, reduxDispatch) (Register);