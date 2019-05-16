import React, { Component } from 'react'
import api from '../../api';
import { Table, Button } from 'reactstrap';
import {Link } from 'react-router-dom';


export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      streetArt: [],
      isVisited: false
    }
    this.changeStatus = this.changeStatus.bind(this)

  }
  componentDidMount() {
    api.getStreetArts()
      .then(streetArt => {
        this.setState({
          streetArt:streetArt
        })
      })
      .catch(err => console.log(err))
    }
  changeStatus() {
    this.setState({
      isVisited: true
    })
  }

  render() {
    return (
      <div className="List">
      <div>
        <h1>List of Street Arts</h1>
        <Table>
          <thead>
            <tr>
            <th></th>
              <th>Picture</th>
              <th>Google Maps Direction</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
          {this.state.streetArt.map((art,i) => (
              <tr>
                <th scope=" "></th>
                <td><img src={art.pictureUrl} alt="" height="60" width="50" /></td>
                <td><a href={`https://www.google.com/maps/dir//${art.location.coordinates[1]},${art.location.coordinates[0]}/@${art.location.coordinates[1]},${art.location.coordinates[0]},15z`} >{art.location.coordinates}</a></td>
                <td>
                {api.isLoggedIn() && 
                <Button onClick={this.changeStatus}tag={Link} to="/" outline color="primary">Add Visit / Remove Visit</Button>}
                </td>
                <td><Button tag={Link} to={"/street-art-detail/"+art._id }outline color="primary" >Detail</Button></td>
              </tr>
            ))}
          </tbody>
          </Table>        
        </div>
      </div>
    )
  }
}
