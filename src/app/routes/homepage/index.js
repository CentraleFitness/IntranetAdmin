import React from 'react';
import axios from "axios";
import Page from '../../components/page';
import FeedBackList from "../../components/FeedBackList";



export default class FeedBacks extends React.Component{


  constructor(props){
    super(props)

    this.state = {feedbacks : []}

    axios.get('/getfeedbacks')
      .then(response => {
        this.setState({feedbacks : response.data})
      })

  }

  render(){
    return (
      <div style={{flex : 1}}>
      <h1>Liste des feedbacks</h1>

        <FeedBackList feedbacks={this.state.feedbacks}/>

      </div>

    )
  }

}
