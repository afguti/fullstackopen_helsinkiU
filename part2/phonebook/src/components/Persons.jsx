const Persons = ({names,onSmash}) => {
  return (
    <>
      {names.map(x => <p key={x.name}>
        {x.name} {x.number + " "}
        <button onClick={() => onSmash(x.id)}>delete</button>
      </p>)}
    </>
  )
}

export default Persons;

