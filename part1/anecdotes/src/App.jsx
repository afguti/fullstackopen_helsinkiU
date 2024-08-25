import { useState } from 'react'

const Button = ({smash,text}) => (
  <button onClick={smash}>{text}</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(
    {
      phrase: 0,
      score: Array(anecdotes.length).fill(0),
    }
  )

  const random = () => {
    const num = Math.floor(Math.random() * anecdotes.length)
    setSelected({...selected, phrase: num})
  }

  const vote = () => {
    selected.score[selected.phrase] += 1
    setSelected({...selected, score: selected.score})
  }

  const favorite = Math.max(...selected.score)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected.phrase]}</p>
      <p>has {selected.score[selected.phrase]} votes</p>
      <Button smash={vote} text="vote" />
      <Button smash={random} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[selected.score.indexOf(favorite)]}</p>
      <p>has {favorite} votes</p>
    </div>
  )
}

export default App