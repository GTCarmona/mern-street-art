import React, { Component } from "react";
import api from "../../api";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import mapboxgl from "mapbox-gl/dist/mapbox-gl"; // NEW

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ3RjYXJtb25hIiwiYSI6ImNqdWwxYzZwOTAzeWE0NGxsbjJ0ZnJ0aDYifQ.GIzsIahO6WNQFMg486tFkA"; // NEW

export default class StreetArtDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streetArt: {},
      isVisited: false,
    };
    this.mapRef = React.createRef(); // NEW
    this.map = null; // NEW
    this.marker = null; // NEW
    this.toggleVisit = this.toggleVisit.bind(this)
  }
  initMap(lng, lat) {
    // NEW METHOD
    // Embed the map where "this.mapRef" is defined in the render
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 10
    });

    // Add zoom control on the top right corner
    this.map.addControl(new mapboxgl.NavigationControl());

    // Create a marker on the map with the coordinates ([lng, lat])
    this.marker = new mapboxgl.Marker({ color: "red" })
      .setLngLat([lng, lat])
      .addTo(this.map);
  }

  toggleVisit() {
    this.setState({
      isVisited: !this.state.isVisited
    })
    if(this.state.isVisited)
    api.createVisit({
      _streetArt: this.props.match.params
    })
      
    }
 
  

  render() {
    console.log("NOTICE MEEEEEEE", this.props.match);
    return (
      <div className="StreetArtDetail">
        <h1>Street Art Detail</h1>
        <img src={this.state.streetArt.pictureUrl} alt="" />
      <h2>Have you visited this art</h2>
      {this.state.isVisited ? <Button outline color="primary" onClick={this.toggleVisit}>true</Button> : <Button outline color="primary" onClick={this.toggleVisit}>false</Button>}
        <h2>Map location</h2>
          <div className="mapbox"ref={this.mapRef} style={{ height: 400 }} />
      </div>
    );
  }
  componentDidMount() {
    api.getStreetArt(this.props.match.params.streetArtId)
    .then(streetArt => {
      this.setState({
        streetArt: streetArt
      });
      let [lng, lat] = streetArt.location.coordinates; // NEW
      this.initMap(lng, lat); // NEW
    })

  }
}