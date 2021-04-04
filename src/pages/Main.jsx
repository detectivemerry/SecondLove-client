import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact'
import CarouselPage from '../components/CarouselPage'
import Card from '../components/Card'
import CategoriesBtn from '../components/CategoriesBtn'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { getAvailableItems, setSearchKeyword } from '../Redux/Actions/itemAction'
import { bindActionCreators } from 'redux'
import {Link} from 'react-router-dom';
import { BounceLoader, BeatLoader } from 'react-spinners'
import { css } from '@emotion/react'

class Main extends Component {
    state = {
        FilteredPosts: '',
    }

    constructor(props){
        super(props)
        this.state = {
          keyword : ''
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentDidMount(){
        this.props.getAvailableItems()
    }

    FilterPosts = (id) => {
        //console.log(id);
        let newPosts = this.props.item;
        const result = newPosts.filter(x => x.category == id)
        this.setState(state => ({
            ...state,
            FilteredPosts: result,
        }));
    }

    submitKeyword(){
        console.log('I am pressed')
        this.props.setSearchKeyword(this.state.keyword, this.props.history)
    }

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value
        const name = target.name
        
        this.setState({
          [name] : value
        })

        e.preventDefault()
      }

    render() {

        const loaderCSS = css`
            margin-top : 25px;
            margin-bottom : 25px;
            margin-left : 550px;
        `
        return (
            <div>
            {this.props.loading &&
            <div>
                <BeatLoader 
                    loading = {this.props.loading}
                    size = {72}
                    color = 'red'
                    css = {loaderCSS}
                    />
            </div>
            }
            {!this.props.loading && 
            <MDBContainer>
                <MDBRow>
                    <MDBCol md = '8'>
                        <MDBInput 
                        label='Find your second love here!' 
                        name='keyword' 
                        type='text' 
                        size = "lg"
                        value = {this.state.keyword}
                        onChange = {this.handleInputChange}
                        />
                    </MDBCol>
                    <MDBCol md = '2'>
                    <MDBBtn color="green" onClick={()=>{this.submitKeyword()}}>
                    <MDBIcon icon="search" className="mr-1" /> Search</MDBBtn>
                    </MDBCol>
                    
                </MDBRow>
                <br />
                <br />

                <MDBRow>
                    <MDBCol>
                        <h3>Popular Listings</h3>
                        <MDBRow>
                        {this.props.item && this.props.item.map(x => {
                                return (
                                    <MDBCol lg="4">
                                        <Card post={x} />
                                    </MDBCol>
                                )
                            })}
                        </MDBRow>
                    </MDBCol>
                </MDBRow>

                <br />
                <br />

                <MDBRow>
                    <MDBCol>
                        <h3> Categories </h3>
                        <CategoriesBtn posts= {this.FilterPosts}></CategoriesBtn>
                        <MDBRow>
                        { this.state.FilteredPosts && this.state.FilteredPosts.map(x => {
                                return (
                                    <MDBCol lg="4">
                                        <Card post={x} />
                                    </MDBCol>
                                )
                            })}
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        }
        </div>
        )
    }
}
Main.propTypes = {
    getAvailableItems: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        // Assigning the state properties into our propname
        // propname  :  state.somefield
        item : state.item.items,
        loading : state.user.loading
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
        {getAvailableItems, setSearchKeyword}
    , dispatch);

//connect is a function, returns a higher order component
//higher order component is wrapping the home component
export default connect(mapStateToProps, mapDispatchToProps)(Main)