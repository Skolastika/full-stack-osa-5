import React from 'react';
import actionFor from './actionCreators'


class App extends React.Component {

  store = this.props.store

  constructor(props) {
    super(props)

    this.state = {
      content: ''
    }
  }

  vote = (event) => {
    this.store.dispatch(actionFor.voting(event.target.name))
  }

  create = (event) => {
    event.preventDefault()
    this.store.dispatch(actionFor.creating(this.state.content))
    this.setState({ content: '' })
  }

  handleChange = (event) => {
    this.setState({ content: event.target.value })
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote} name={anecdote.id}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.create}>
          <div><input type='text'
                      name='content'
                      value={this.state.content}
                      onChange={this.handleChange} /></div>
          <button type='submit'>create</button> 
        </form>
      </div>
    )
  }
}

export default App