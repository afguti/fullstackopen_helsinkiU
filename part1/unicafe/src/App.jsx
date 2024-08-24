import { useState } from 'react'

const Button = ({smash,text}) => (
  <button onClick={smash}>{text}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [clicks, setClicks] = useState(
    { 
      good: 0, neutral: 0, bad: 0, all: 0, avg: 0, pos: 0
    }
  )

  const goodClick = () => {
    const goodc = clicks.good + 1
    const allc = goodc + clicks.neutral + clicks.bad
    const avgc = (goodc-clicks.bad)/allc
    const positive = goodc/allc
    setClicks({...clicks, good: goodc, all: allc, avg: avgc, 
      pos: positive * 100})
  }

  const neutralClick = () => {
    const neutralc = clicks.neutral + 1
    const allc = neutralc + clicks.good + clicks.bad
    const avgc = (clicks.good-clicks.bad)/allc
    const positive = clicks.good/allc
    setClicks({...clicks, neutral: neutralc, all: allc, avg: avgc, 
      pos: positive * 100})
  }

  const badClick = () => {
    const badc = clicks.bad + 1
    const allc = badc + clicks.neutral + clicks.good
    const avgc = (clicks.good-badc)/allc
    const positive = clicks.good/allc
    setClicks({...clicks, bad: badc, all: allc, avg: avgc, 
      pos: positive * 100})
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button smash={goodClick} text="good" />
      <Button smash={neutralClick} text="neutral" />
      <Button smash={badClick} text="bad" />
      <h1>statistics</h1>
      <p>good {clicks.good}</p>
      <p>neutral {clicks.neutral}</p>
      <p>bad {clicks.bad}</p>
      <p>all {clicks.all}</p>
      <p>average {clicks.avg}</p>
      <p>positive {clicks.pos} %</p>
    </div>
  )
}

export default App