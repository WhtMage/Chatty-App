import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor() {
    super();
    this.state= {
        currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [
          {
            username: 'Bob',
            content: 'Has anyone seen my marbles?',
          },
          {
            username: 'Anonymous',
            content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
          }
        ]
    };
    this.newChat = this.newChat.bind(this);
  }

  newChat = function(value){
    const newMessage = {username: this.state.currentUser.name, content: value};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    setTimeout(() => {
      console.log('Simulating incoming message');
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    console.log('Rendering <App/>');
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <main className="messages">
          <MessageList messages={this.state.messages}/>
        </main>
        <ChatBar username={this.state.currentUser.name} newChat={this.newChat}/>
      </div>
    );
  }
}
export default App;
