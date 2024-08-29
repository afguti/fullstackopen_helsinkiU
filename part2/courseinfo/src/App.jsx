const Header = ({ course }) => <h1>{course}</h1>

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
      <Header course={course.name} />
      <Content parts={course.parts}/> 
      <Total sum={course.parts} />    
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return <Course course={course} />
}

export default App