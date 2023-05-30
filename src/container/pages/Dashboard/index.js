import React, { Component } from 'react';
import { CardBody, Label, CardTitle, CardText } from 'reactstrap';
import './Dashboard.css';
import { addDataToFirebase, getDataFromFirebase, updateDataFirebase, deleteDataFirebase, updateStatusFirebase, logOut } from '../../../config/redux/action';
import { connect } from 'react-redux';
// import { FadeTransform } from 'react-animation-components'


class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state ={
            title : '',
            tanggal : '',
            waktuStart : '',
            waktuFinish : '',
            textButton: 'SIMPAN',
            keterangan : '',
            status: '',
            todoId: '', 
           
        };
    }
    

    componentDidMount(){
        const userData = JSON.parse(localStorage.getItem('userData'));
        this.props.getData(userData.uid);
    }

    handleTodoValue = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }


    updateData = (todo) => {
        console.log(todo);
        this.setState({
            title : todo.data.title,
            tanggal : todo.data.tanggal,
            waktuStart : todo.data.waktuStart,
            waktuFinish : todo.data.waktuFinish,
            keterangan : todo.data.keterangan,
            status: todo.data.status,
            textButton: 'UPDATE',
            todoId: todo.id
        })
    }


    handleTodoSubmit = async () => {
        const { title, tanggal, waktuStart, waktuFinish, keterangan, todoId, status } = this.state;
        const userData = JSON.parse(localStorage.getItem('userData'));
        const data = {
            title : title,
            tanggal : tanggal,
            waktuStart : waktuStart,
            waktuFinish : waktuFinish,
            status: status,
            keterangan : keterangan,
            date: new Date().getTime(),
            userId: userData.uid
        }
        if(this.state.textButton === 'SIMPAN'){
            this.props.saveData(data);        
        } else {
            data.todoId = todoId;
            this.props.updateData(data)
        }   
 
        console.log(data);
        this.cancelUpdate();

    }


    updateStatus = async (e, todo) => {
        e.stopPropagation();
        const userData = JSON.parse(localStorage.getItem('userData'));
        const data = {
            userId:userData.uid,
            todoId:todo.id
        }
        this.props.updateStatus(data);
    }

    cancelUpdate = () => {
         this.setState({
            title : '',
            tanggal : '',
            waktuStart : '',
            waktuFinish : '',
            keterangan : '', 
            textButton: 'SIMPAN'
        })
    }
   

    deleteData = (e, todo) => {
        e.stopPropagation();
        const userData = JSON.parse(localStorage.getItem('userData'));
        const data = {
            userId:userData.uid,
            todoId:todo.id
        }
        this.props.deleteDatas(data)
    }

    logout = () =>{
        const {history} = this.props;
        localStorage.clear();
        history.push('/login')
    }
      

    render(){
        const { todos } = this.props;
        return(
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }} >
            <div>
                <div className="container">
                    <div className="col-12 col-md-6 offset-md-3">
                    
                        <CardBody className="cardbody">
                            <div className="inputs">
                                <Label>Titulo</Label>
                                <input className="input"  type="text" id="title" onChange={this.handleTodoValue} value = {this.state.title} />
                            </div>

                            <div className="row inputs">
                                <div className="col-12 col-md-5 waktu">
                                    <Label>Data</Label>
                                    <input className="input"  type="date" id="tanggal" onChange={this.handleTodoValue} value={this.state.tanggal} />
                                </div>
                                <div className="col-5 col-md-3 waktu">
                                    <Label>Hora</Label>
                                    <input  className="waktuStart"  type="time" id="waktuStart" onChange={this.handleTodoValue} value={this.state.waktuStart} />
                                </div>

                                <div className="col-2 col-md-1 waktu">
                                    <Label  className="akhir">Prazo</Label>
                                <div className="hubung">-</div>
                                </div>

                                <div className="col-5 col-md-3">
                                    <Label className="akhir">s</Label>
                                    <input  className="waktuStart"  type="time" id="waktuFinish" onChange={this.handleTodoValue} value={this.state.waktuFinish} />
                                </div>
                            </div>
                        
                            <div className="inputs">
                            <Label>Informações</Label>
                            <textarea className="input"  type="keterangan" id="keterangan" onChange={this.handleTodoValue} value={this.state.keterangan} />
                            </div>

                            <div className="cardfooter">
                                <div className="row">
                                    {/* <button onClick={this.handleTodoSubmit}>Tambah</button> */}
                                    {
                                        this.state.textButton === 'UPDATE' ?(
                                            <div className="col-12 col-md-6">
                                                <button onClick={this.cancelUpdate} >Cancelar</button>
                                            </div>
                                        ) : <div className="col-12 col-md-6" />
                                    }
                                    <div className="col-12 col-md-6">
                                        <button onClick={this.handleTodoSubmit}>{this.state.textButton}</button>
                                    </div>

                                </div>
                            </div>
                        </CardBody>
                    </div>

                    <hr />
                    {
                    todos.length > 0 ? (
                        <div className="row align-items-start">
                            { todos.map(todo => {
                                return (
                                    <div className="col-12 col-md-6" key={todo.id}  >
                                        <CardBody className="cardList">
                                            <div className="row">
                                                <div className="col-9">
                                                        <CardTitle>{todo.data.title}</CardTitle>
                                                </div>
                                                <div className="col-3 edit" onClick={() => this.updateData(todo)} >
                                                    editar
                                                </div>
                                                
                                            </div> 
                                            <div className="row">
                                                <div className="col-8 cardTeks">
                                                    <CardText>{todo.data.tanggal}</CardText>
                                                </div>
                                                <div className="col-4 time cardTeks">
                                                    <CardText>{todo.data.waktuStart} - {todo.data.waktuFinish}</CardText>
                                                </div>
                                            </div>
                                            <CardText className="cardTeks">{todo.data.keterangan}</CardText>
                                            <div className="row">
                                                <div className="col-3">
                                                    <button onClick={(e) => this.deleteData(e, todo)}>Deletar</button>
                                                </div>
                                                <div className="col-4 offset-5">
                                                    {/* <button onClick={(e) => this.updateStatus(e, todo)}>{todo.data.status}</button> */}
                                                    {
                                                        todo.data.status === 'Incomplete' ?(
                                                                <div>
                                                                    <button onClick={(e) => this.updateStatus(e, todo)}>{todo.data.status}</button>
                                                                </div>
                                                        ): <div>
                                                                    <button disabled>{todo.data.status}</button>

                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </CardBody>
                                    </div>
                                )

                            })
                            
                            }
                            
                        </div> 
                    ): <div>Nenhuma atividade ainda</div>  
                    }
                </div> 
            
                    <div>
                        <button onClick={this.logout}>Logout</button>
                    </div>
            </div>
            
            
           </FadeTransform>     
        )
    }
}

const reduxState = (state) => ({
    userData: state.user,
    todos: state.todo,

})

const reduxDispatch = (dispatch) => ({
    saveData: (data) => dispatch(addDataToFirebase(data)),
    getData: (data) => dispatch(getDataFromFirebase(data)),
    updateData: (data) => dispatch(updateDataFirebase(data)),
    deleteDatas: (data) => dispatch(deleteDataFirebase(data)),
    updateStatus: (data) => dispatch(updateStatusFirebase(data)),
})

export default connect(reduxState, reduxDispatch) (Dashboard);