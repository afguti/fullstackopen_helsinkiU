import { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [btnLabel, setBtnLabel] = useState('view')

  const hideWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '' : 'none'}

  const showDetails = () => {
    setVisible((preVisible) => {
      const newVisible = !preVisible
      setBtnLabel(newVisible ? 'hide' : 'view')
      console.log("visible:",visible)
      console.log("button label:",btnLabel)
      return newVisible
    })
  }

  const like = () => {
    
  }
  
  return (
    <div style={blogStyle}>
      <div>{blog.title} {blog.author}
        <button onClick={showDetails}>{btnLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>likes {blog.likes}
          <button onClick={like}>like</button>
        </div>
        <div>{blog.author}</div>
      </div>
    </div>  
  )
}

export default Blog