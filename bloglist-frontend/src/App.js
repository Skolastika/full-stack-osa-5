import React from 'react'
import Blog from './components/Blog'
import Blogform from './components/Blogform'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      message: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
    }
  } 

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
  
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch(exception) {
      this.setState({
        message: 'Wrong username or password',
      })
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)
    }
  }

  logout = () => {
    this.setState({ user: null })
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBloglistUser')
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onAddBlog = (newBlog) => {
    if (newBlog) {
      blogService.getAll().then(blogs => {
        this.setState({ blogs,
          message: `A new blog '${newBlog.title}' was added.` })
        setTimeout(() => {
          this.setState({message: null})
        }, 5000)
      })
    } else {
      this.setState({ message: `Couldn't add blog.` })
      setTimeout(() => {
        this.setState({message: null})
      }, 5000)
    }
  }

  updateBlogs = () => {
    blogService.getAll().then(blogs => {
      this.setState({ blogs })
    })
  }



  render() {
    const blogs = this.state.blogs
    blogs.sort((a, b) => b.likes - a.likes)

    if (this.state.user === null) {
      return (
        <div>
          <h2>Log in to application</h2>
          <Notification message={this.state.message} />
          <Togglable buttonLabel="Log in">
            <LoginForm
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleLoginFieldChange}
              handleSubmit={this.login}
            />
          </Togglable>
        </div>
      )
    }
  
    return (
      <div>
        <h2>Blogs</h2>
        <Notification message={this.state.message} />
        <p>{this.state.user.name} logged in. <button onClick={this.logout}>Log out</button></p>
        <h3>Create new</h3>
        <Blogform onAddBlog={this.onAddBlog} />
        {this.state.blogs.map(blog =>
          <Blog key={blog._id}
                blog={blog}
                user={this.state.user}
                onUpdateBlog={this.updateBlogs}
                onRemoveBlog={this.updateBlogs} />
        )}
      </div>
    )
  }
}

export default App;
