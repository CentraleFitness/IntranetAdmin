import React from "react"


const row = (object, id) => {
  return <div key={id} style={{width : "99%", display : "flex", border : "1px solid black"}}>
    <div style={{width: "10%"}}>Email : {object.email}</div>
    <div style={{width: "10%"}}>Version: {object.version}</div>
    <div style={{width: "70%"}}>{object.content}</div>

  </div>
}

export default class FeedBackList extends React.PureComponent{

  getContent(){
    return this.props.feedbacks.map((item, index) => {
      return row(item, index);
    })
  }

  render(){
    return(
      <div style={{ flex : 1,  width : "100%", height : 600, overflow : "auto"}}>
        {this.getContent()}
      </div>
    )
  }

}
