const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => {
  const total = sum.reduce((x,y) => {
    return x + y.exercises
  },0)
  return <h4>total of {total} exercises</h4>
}

const Content = ({ parts }) => 
  <>
    {parts.map(x => <p key={x.id}>{x.name} {x.exercises}</p>)}   
  </>

const Course = ({course}) => {
  return (
    <>
      {course.map(x => <div key={x.id}>
          <Header course={x.name}/>
          <Content parts={x.parts}/>
          <Total sum={x.parts}/>
        </div>)}
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course course={courses} />
    </div>  
  )
}

export default App