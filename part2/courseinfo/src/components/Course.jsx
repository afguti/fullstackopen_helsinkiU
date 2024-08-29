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

export default Course