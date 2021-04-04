import React, { Component } from 'react'
import Picture from '../components/Picture'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from "mdbreact"
import { searchItems } from '../Redux/Actions/itemAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Card from '../components/Card'
import { Link, useLocation } from 'react-router-dom'

class Search extends Component {

    constructor(props){
        super(props)
        this.state = {
            keyword : this.props.keyword,
            allowBallotItems : true,
            location : 'Cash Converters@Ang Mo Kio',
            itemCondition : 'New'
        }
        //only need to bind when you changing current state
        this.handleInputChange = this.handleInputChange.bind(this)
        this.submitSearch = this.submitSearch.bind(this)
    }

    componentDidMount(){
        let itemData = {
            keyword : this.state.keyword,
            allowBallotItems : false,
            location : '',
            itemCondition : ''
        }
        this.props.searchItems(itemData, this.props.history)
    }

    submitSearch(){
        const searchData ={
            //keyword
            //Values : string or ''
            //Description : '' if user entered no keywords
            keyword : this.state.keyword,
            //keyword : 'cotton',
            //allowBallotItems
            //Values : True or false
            //Description : True to display items that are waiting to be ballot / already donated
            allowBallotItems : this.state.allowBallotItems,
            //allowBallotItems : true,
            //location
            //Values : string or ''
            //Description : '' if user entered no location
            location : this.state.location == "Any" ? '' : this.state.location,
            //location : '',
            //itemCondition
            //Values : 'New | SlightlyUsed | WellUsed' or '' 
            //Description : '' if user entered nothing for itemCondition
            itemCondition : this.state.itemCondition == "Any" ? '' : this.state.itemCondition
            //itemCondition : ''
        }
        console.log(searchData.keyword)
        console.log(searchData.allowBallotItems)
        console.log(searchData.location)
        console.log(searchData.itemCondition)

        this.props.searchItems(searchData, this.props.history)
    }

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked :  target.value
        const name = target.name
        
        this.setState({
          [name] : value
        })

        e.preventDefault()
      }

    handleCheckBox = (e) => {
        this.setState({
            allowBallotItems : e.target.checked
        })
        console.log("is allow ballot item checked? : " + e.target.checked)
        e.preventDefault()
    }


    render() {
        
        return (
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
                    <MDBBtn color="green" onClick={this.submitSearch}>
                    <MDBIcon icon="search" className="mr-1" /> Search</MDBBtn>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <label>
                        Select your item's Condition:
                        <select value={this.state.itemCondition} onChange={this.handleInputChange} name = "itemCondition">
                        <option value = "Any">Any item condition</option>
                        <option value = "New">New</option>
                        <option value = "SlightlyUsed">SlightlyUsed</option>
                        <option value = "WellUsed">WellUsed</option>
                        </select>
                    </label>
                </MDBRow>
                <MDBRow>
                    <label>
                        Select the location to donate to:
                        <select value={this.state.location} onChange={this.handleInputChange} name = "location">
                        <option value = "Any">Any location</option>
                        <option value = "Cash Converters@Ang Mo Kio">Cash Converters@Ang Mo Kio</option>
                        <option value = "Touch Community Services: 301 Thrift Mart">Touch Community Services: 301 Thrift Mart</option>
                        <option value = "Cash Converters@Bedok">Cash Converters@Bedok</option>
                        <option value = "Cash Converters@Chinatown">Cash Converters@Chinatown</option>
                        <option value = "Cash Converters@Jurong">Cash Converters@Jurong</option>
                        <option value = "Cash Converters@Tampines">Cash Converters@Tampines</option>
                        <option value = "Cash Converters@Toa Payoh">Cash Converters@Toa Payoh</option>
                        <option value = "MINDS Shop@Margaret">MINDS Shop@Margaret</option>
                        <option value = "MINDS Shop@Woodlands">MINDS Shop@Woodlands</option>
                        <option value = "MINDS Shop@Rosyth">MINDS Shop@Rosyth</option>
                        <option value = "MINDS Shop@Napiri">MINDS Shop@Napiri</option>
                        <option value = "MINDS Shop Plus@NTUC Eldercare Silver Activity Centre">MINDS Shop Plus@NTUC Eldercare Silver Activity Centre</option>
                        <option value = "The Salvation Army@Bukit Timah">The Salvation Army@Bukit Timah</option>
                        <option value = "The Salvation Army@Tanglin">The Salvation Army@Tanglin</option>
                        <option value = "The Salvation Army@Changi">The Salvation Army@Changi</option>
                        <option value = "The Salvation Army@Bishan">The Salvation Army@Bishan</option>
                        <option value = "The Salvation Army@Pasir Panjang">The Salvation Army@Pasir Panjang</option>
                        <option value = "The Salvation Army@Jurong">The Salvation Army@Jurong</option>
                        <option value = "The Salvation Army@Mandai">The Salvation Army@Mandai</option>
                        <option value = "PC Dreams@Sim Lim Square">PC Dreams@Sim Lim Square</option>
                        <option value = "PC Dreams @Bugis Junction">PC Dreams @Bugis Junction</option>
                        </select>
                    </label>
                </MDBRow>

                <MDBRow>
                    <label>
                        Allow already ballot items in your search :
                        <input 
                            type = "checkbox"
                            name = "allowBallotItems"
                            checked = {this.state.allowBallotItems}
                            onChange = {this.handleCheckBox} />
                        {this.state.allowBallotItems && <div>'Allowed'</div>}
                        {!this.state.allowBallotItems && <div>'Not Allowed'</div>}
                    </label>
                </MDBRow>

                <MDBRow>
                    {
                        <h2>your allowBallotItem is {this.state.allowBallotItems}</h2>
                        /**
                         * FOR TESTING
                         *  <h2>your keyword is is {this.state.keyword}</h2>
                            
                            <h2>your location is {this.state.location}</h2>
                            <h2>your item condition is {this.state.itemCondition}</h2>
                         * 
                         * 
                         */
                    }
                </MDBRow>

                <MDBRow>
                    <MDBCol>
                        <h3>Search results</h3>
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
            </MDBContainer>
                
               
            
        )
    }
}
const mapStateToProps = state => {
    return {
        item : state.item.items,
        keyword : state.item.searchKeyword
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
        {searchItems}
    , dispatch);

//connect is a function, returns a higher order component
//higher order component is wrapping the home component
export default connect(mapStateToProps, mapDispatchToProps)(Search)