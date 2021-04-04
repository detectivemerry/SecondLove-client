import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact'
import CarouselPage from '../components/CarouselPage'
import Card from '../components/Card'
import CategoriesBtn from '../components/CategoriesBtn'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { getCollectionPoint } from '../Redux/Actions/itemAction'
import { bindActionCreators } from 'redux'
import {Link} from 'react-router-dom';

class Map extends Component {

    componentDidMount(){
        this.props.getCollectionPoint()
    }
    render() {
        
        return (
            <div>
            {this.props.collectionPoint.map(cp => (
                            <h1 key = {cp.collectionPointId}>
                                {cp.name}
                                </h1>
                        ))
                        }
            </div>
            
        )
    }
}
Map.propTypes = {
    getCollectionPoint: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        collectionPoint : state.item.collectionPoints
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
        {getCollectionPoint}
    , dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Map)