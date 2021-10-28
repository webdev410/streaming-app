import React, { Component } from 'react'
import { Segment, Card } from 'semantic-ui-react';
import moment from 'moment'

export class MessagesBody extends Component {

  componentDidMount(){
    this.scrollDown()
  }
  
  componentDidUpdate( a, b ){
    this.scrollDown()
  }

  scrollDown(){
    const { contaniner } = this.refs
    contaniner.scrollTop = contaniner.scrollHeight
  }

  render() {
    let { messages , user, typingUser } = this.props
    return (
      <Segment style={{ height: 'calc( 100vh - 56px - 55px - 139px )'}}>
        <div ref='contaniner' style={{  height:'calc( 100vh - 56px - 55px - 35px - 129px )', overflowY: 'auto'}}>
          <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '.1em', paddingRight: '.5em' }}>
            {
              messages.length > 0 && (
                messages.map( message => (
                  <Card key={ message.id } fluid style={{ marginTop: '0px'}}>
                    <Card.Content
                      style={{ padding: '3px 10px' }} 
                      textAlign={ message.sender === user.nickname ? 'right' : 'left' }>
                      <h3>{message.message}</h3>
                      {message.sender} sent @ { moment(message.timef).fromNow()}
                    </Card.Content>
                  </Card>
                ))
              )
            }
            { 
              typingUser && typingUser.map( name => (
                <div key={name} className="typing-user">
									{`${name} is typing . . .`}
								</div>
              ))
            }
          </div>
        </div>
      </Segment>
    )
  }
}

export default MessagesBody
