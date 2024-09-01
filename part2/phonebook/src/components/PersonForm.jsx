const PersonForm = ({name,handlename,number,handlenumber,add}) => {
  return (
    <form onSubmit={add}>
    <div>
      name: <input value={name} onChange={handlename} />
    </div>
    <div>
      number: <input value={number} onChange={handlenumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

export default PersonForm