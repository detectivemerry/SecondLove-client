import React, { Component, useEffect } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { loginUser } from '../Redux/Actions/userAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'; 
import { PulseLoader } from 'react-spinners'
import { Link } from 'react-router-dom'

class LoginPage extends Component {

    constructor(props){
        super(props)
        this.state = {
            email : '',
            password : '',
            errors: {}
        }
    }
    //When component receives new props
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors})
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
          });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email : this.state.email,
            password : this.state.password
        }
        this.props.loginUser(userData, this.props.history)
    }

    render() {
        if(this.props.user.authenticated)this.props.history.push('/')

        const {
            user : { loading }
        } = this.props
        const { errors } = this.state

        return (

            <MDBContainer >
                <MDBRow >
                    <MDBCol size= '12' >
                        <h1>Welcome, User!</h1>
                    </MDBCol>
                    <MDBCol md="6">
                        <form noValidate onSubmit = {this.handleSubmit}>
                            <div className="grey-text">
                            
                            {errors.email && <p>{errors.email}</p>}
                            {errors.password && <p>{errors.password}</p>}
                            {errors.general && <p>{errors.general}</p>}
                            
                            <MDBInput  
                                label="Email Address" 
                                name = "email"
                                icon="envelope" 
                                group type="email" 
                                validate error="wrong"
                                success="right"
                                value={this.state.email} 
                                onChange={this.handleChange}
                                disabled = {loading}
                                required/>
                                
                            <MDBInput 
                                label="Password" 
                                name = "password"
                                icon="lock" 
                                group type="password"  
                                value={this.state.password} 
                                onChange={this.handleChange}
                                required/>

                            </div>
                            <div className="text-center">
                            <MDBBtn 
                                color = "red" 
                                size = "lg" 
                                type = "submit"
                            >
                                Login
                            </MDBBtn>
                            {loading ?
                            <p>Logging in and setting up user data...
                                <PulseLoader 
                                    loading = "true"
                                    size = {12}
                                    color = 'pink'
                                />
                            </p>
                            : null}
                            
                            <p></p>
                            <p> Don't have an account ? Sign up <Link to = "/signup">here</Link></p>
                            </div>
                        </form>
                        </MDBCol>

                </MDBRow>
            </MDBContainer>
            
        )
    }
}
const mapStateToProps = state => {
    return {
        user : state.user,
        UI : state.ui
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({loginUser} , dispatch);

//export default LoginPage
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage))