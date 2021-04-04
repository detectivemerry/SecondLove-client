import { MDBCol, MDBContainer, MDBRow, MDBInput, MDBBtn, MDBCard, MDBCardBody} from 'mdbreact'
import React, { Component, useState } from 'react'
import { donateItem, uploadItemImage, clearSelectedItem } from '../Redux/Actions/itemAction'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { clearMessage, clearError } from '../Redux/Actions/uiAction'
import { BounceLoader, BeatLoader, PulseLoader } from 'react-spinners'
import { css } from '@emotion/react'
import Message from '../components/Message'
import {Link} from 'react-router-dom';

 class Donation extends Component {
    constructor(props){
        super(props)
        this.state = {
          file: null,
          itemName : '',
          description : '',
          category : 'home and living',
          itemCondition : 'New',
          imageUrl : '',
          location : 'Cash Converters@Ang Mo Kio',
          errors : {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //When component receives new props
    componentWillReceiveProps(nextProps){
      if(nextProps.ui.errors){
          this.setState({errors: nextProps.ui.errors})
      }
    }

    componentDidMount(){
      this.props.clearMessage()
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

    handleSubmit() {
      console.log("handle sumbit button is clicked clacked")
      const itemData =  {
        itemName : this.state.itemName,
        description : this.state.description,
        category : this.state.category,
        itemCondition : this.state.itemCondition,
        imageUrl :this.props.ui.uploadImgLink.message,
        location : this.state.location
      }
      this.props.donateItem(itemData, this.props.history) 
    }

    handleImageChange = (event) => {
      console.log("handle image change is called")
      this.setState({
        file: URL.createObjectURL(event.target.files[0])
      })

      const image = event.target.files[0];
      const formData = new FormData();
      formData.append('image', image, image.name);
      this.props.uploadItemImage(formData);
    };

    togglePopup = () => {
      //TO-DO add another togglePopup for error handling in the future
      this.props.clearError()
      this.props.clearMessage()
      this.props.history.push(`/itemDetails/${this.props.selectedItem.itemId}`)
    }

    render() {
      const { errors } = this.state
      const imgLoaderCSS = css`
        margin-top : 25px;
        margin-bottom : 25px;
        margin-left : 150px;
        `
      const donateLoaderCSS = css`
        margin-top : 25px;
        margin-bottom : 25px;
        margin-left : 450px;
      `
        return (
            <MDBContainer>
               {this.props.ui.newMessage && !this.props.donateLoading &&
                <Message content = {this.props.ui.message.message} handleClose = {this.togglePopup} buttonText = "View item" />  
              }
              
              {this.props.ui.newError && 
                <Message content = {errors.error} handleClose = {this.togglePopup} buttonText = "Ok" />
              }

              {this.props.donateLoading ? 
                <BeatLoader 
                    loading = {this.props.loading}
                    size = {72}
                    color = 'pink'
                    css = {donateLoaderCSS}
                    /> : 
                <MDBRow>
                    <MDBCol>
                        <h3>Donate your item to SecondLove!</h3>
                        <MDBCol col-md-1>
                          <form>
                            <MDBRow>
                              <label>
                                Enter Item name:
                                <input type= "text" name = "itemName" value = {this.state.itemName} onChange = {this.handleInputChange}/>
                              </label>
                            </MDBRow>
                            <MDBRow>
                              <label>
                                Enter description:
                                <input type= "textarea" name = "description" value = {this.state.description} onChange = {this.handleInputChange}/>
                            </label>
                            </MDBRow>
                            <MDBRow>
                              <label>
                                Select Category:
                                <select value={this.state.category} onChange={this.handleInputChange} name = "category">
                                  <option value = "home and living">Home and Living</option>
                                  <option value = "sports">Sports</option>
                                  <option value = "electronic">Electronic</option>
                                  <option value = "toys">Toys</option>
                                  <option value = "clothes">Clothes</option>
                                  <option value = "luxury">Luxury</option>
                                  <option value = "automobile">Automobile</option>
                                </select>
                              </label>
                            </MDBRow>
                            <MDBRow>
                              <label>
                                  Select your item's Condition:
                                  <select value={this.state.itemCondition} onChange={this.handleInputChange} name = "itemCondition">
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
                            
                            {
                              /**for when your testing */
                              /**<h2>your item name is {this.state.itemName}</h2>
                            <h2>your description is {this.state.description}</h2>
                            <h2>your category is {this.state.category}</h2>
                            <h2>your item condition is {this.state.itemCondition}</h2>
                            <h2>your item location is {this.state.location}</h2>*/
                            
                            }
                            <MDBRow>
                            <h6>Upload Image</h6>
                            <p>
                            <input type = "file" id = "imageInput" onChange = {this.handleImageChange} />
                            </p>
                            </MDBRow>
                            <MDBRow>
                            {this.props.ui.loading &&
                              <div>
                                <p>Uploading image ...</p>
                                <PulseLoader 
                                        loading = {this.props.loading}
                                        size = {12}
                                        color = 'pink'
                                        css = {imgLoaderCSS}
                                        />
                              </div>     
                                }
                            </MDBRow>
                            <MDBRow>
                              <p><img src={this.state.file} width='300' height='300'/></p>
                            </MDBRow>
                          <MDBBtn color="pink" 
                          onClick = {() => {this.handleSubmit()}}
                          disabled = {(this.props.ui.loading || this.props.donateLoading)}>Donate item!</MDBBtn>
                        </form>
                        </MDBCol>
                            
                    </MDBCol>
                </MDBRow>  
              }       
            </MDBContainer>
        )
    }
}

const mapStateToProps = state => {
  return {
      item : state.item.items,
      ui : state.ui,
      donateLoading : state.item.loading,
      selectedItem : state.item.selectedItem
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
      {uploadItemImage, donateItem, clearSelectedItem, clearMessage, clearError}
  , dispatch);


  export default connect(mapStateToProps, mapDispatchToProps)(Donation)