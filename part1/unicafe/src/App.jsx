import { useState } from 'react'

const StatisticLine = ({text,value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({stat}) => {
  if (stat[3].value === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text={stat[0].name} value={stat[0].value} />
        <StatisticLine text={stat[1].name} value={stat[1].value} />
        <StatisticLine text={stat[2].name} value={stat[2].value} />
        <StatisticLine text={stat[3].name} value={stat[3].value} />
        <StatisticLine text={stat[4].name} value={stat[4].value} />
        <StatisticLine text={stat[5].name} value={stat[5].value + " %"} />
      </tbody>
    </table>
  )
}

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

  const cafe = {
    title_one: "give feedback",
    title_two: "statistcs",
    statistics: [
      { name: "good", value: clicks.good },
      { name: "neutral", value: clicks.neutral },
      { name: "bad", value: clicks.bad },
      { name: "all", value: clicks.all },
      { name: "average", value: clicks.avg },
      { name: "positive", value: clicks.pos }
    ]
  }

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
      <h1>{cafe.title_one}</h1>
      <Button smash={goodClick} text="good" />
      <Button smash={neutralClick} text="neutral" />
      <Button smash={badClick} text="bad" />
      <h1>{cafe.title_two}</h1>
      <Statistics stat={cafe.statistics} />
    </div>
  )
}

export default App