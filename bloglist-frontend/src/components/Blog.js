import React from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fullView: false
    }
  }

  increaseLikes = () => {
    const blog = this.props.blog

    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    if (blog.user !== undefined) {
      updatedBlog.user = blog.user._id.toString()
    }

    blogService.update(blog._id, updatedBlog)
    this.props.onUpdateBlog(updatedBlog)
  }

  removeBlog = async () => {
    try {
      await blogService.remove(this.props.blog._id)
      this.props.onRemoveBlog()

    } catch (exception) {
      console.log(exception)
    }
  }

  toggleFullView = () => {
    this.setState({
      fullView: !this.state.fullView
    })
  }

  render() {
    const showWhenFullView = { display: this.state.fullView ? '' : 'none' }
    const blog = this.props.blog
    const userName = blog.user ? blog.user.name : '?'

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const RemoveButton = ({blog, user}) => {
      if (!blog.user || blog.user._id === user.id) {
        return <button onClick={this.removeBlog}>Remove</button>
      }
      return null
    }

    return (
      <div className='blog' style={ blogStyle }>
        <div className='title' onClick={ this.toggleFullView }>{ blog.title } by { blog.author }</div>
        <div className='fullView' style={ showWhenFullView }>
          <div>{ blog.url }</div>
          <div>{ blog.likes }
              <button onClick={ this.increaseLikes }>Like</button></div>
          <div>added by { userName }</div>
          <RemoveButton blog={blog} user={this.props.user} />
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onUpdateBlog: PropTypes.func.isRequired,
  onRemoveBlog: PropTypes.func.isRequired
}

export default Blog