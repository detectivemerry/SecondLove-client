import React, { Component, useEffect } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { registerUser } from '../Redux/Actions/userAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Signup extends Component {

    constructor(props){
        super(props)
        this.state = {
            email : '',
            password : '',
            confirmPassword : '',
            handle : '',
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.ui.errors){
            this.setState({errors : nextProps.ui.errors})
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
          });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            loading : true
        })
        const userData = {
            email : this.state.email,
            password : this.state.password,
            confirmPassword : this.state.confirmPassword,
            handle : this.state.handle
        }
        this.props.registerUser(userData, this.props.history)
    }

    render() {

        const {
            ui : {loading}
        } = this.props
        const { errors } = this.state

        return (
            <MDBContainer >
                <MDBRow >
                    <MDBCol size= '12' >
                        <h1>Create a new account!</h1>
                    </MDBCol>
                    <MDBCol md="6">
                        { <form>
                        <div className="grey-text">
                            {errors.handle && <p>{errors.handle}</p>}
                            {errors.email && <p>{errors.email}</p>}
                            {errors.password && <p>{errors.password}</p>}
                            {errors.general && <p>{errors.general}</p>}
                            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                            <MDBInput 
                                label="Username" 
                                icon="user-alt" 
                                group type ="text" 
                                validate 
                                name = "handle"
                                value={this.state.handle} 
                                onChange={this.handleChange} />

                            <MDBInput 
                                label="Email Address" 
                                icon="envelope" 
                                group type="email" 
                                name = "email"
                                validate  
                                value={this.state.email} 
                                onChange={this.handleChange}/>

                            <MDBInput 
                                label="Password" 
                                icon="lock" 
                                group type="password" 
                                name = "password"
                                validate  
                                value={this.state.password} 
                                onChange={this.handleChange}/>

                            <MDBInput 
                                label="Confirmed Password" 
                                icon="lock" 
                                group type="password" 
                                name = "confirmPassword"
                                validate  
                                value={this.state.confirmPassword} 
                                onChange={this.handleChange}/>
                        </div>
                        <div className="text-center">
                            <MDBBtn 
                                onClick={this.handleSubmit} 
                                color = "red" 
                                size = "lg">
                                    Sign Up
                            </MDBBtn>
                        </div>
                        </form> }
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            
        )
    }
}
const mapStateToProps = state => {
    return {
        user : state.user,
        ui : state.ui
    }
}
const mapDispatchToProps = dispatch => bindActionCreators({registerUser} , dispatch);

//export default Signup
export default connect(mapStateToProps, mapDispatchToProps)(Signup)