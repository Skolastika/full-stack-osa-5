import React from 'react'
import blogService from '../services/blogs'

class Blogform extends React.Component {

  constructor(props) {
    super(props)

    this.onAddBlog = props.onAddBlog

    this.state = {
      title: '',
      author: '',
      url: ''
    }
  }


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addBlog = (event) => {
    event.preventDefault()

    if (this.state.title.length > 0 && this.state.url.length > 0) {

      const blogObject = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      }

      blogService
        .create(blogObject)
        .then(newBlog => {
          this.setState({
            title: '',
            author: '',
            url: ''
          })
          this.onAddBlog(newBlog)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  render() {
    return (
      <form onSubmit={this.addBlog}>
      <div>
        title:
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          name="author"
          value={this.state.author}
          onChange={this.handleChange}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          name="url"
          value={this.state.url}
          onChange={this.handleChange}
        />
      </div>
      <button type="submit">Add blog</button>
      </form>
    )
  }
}

export default Blogform