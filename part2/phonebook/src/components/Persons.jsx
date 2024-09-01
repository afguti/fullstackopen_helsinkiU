const Persons = ({names}) => {
  return (
    <>
      {names.map(x => <p key={x.name}>{x.name} {x.number}</p>)}
    </>
  )
}

export default Persons