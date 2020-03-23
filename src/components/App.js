import React from 'react'
import Board from './Board'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    }
  }

  calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  // i值來自於render裡renderSquare(i)中的parameter
  handleClick(i) {
    const history = this.state.history.slice(
      0,
      this.state.stepNumber + 1 //假使「回到過去」的某個時刻，並做了跟過去不同的新動作，這會確保刪除從那一刻起所有屬於「未來」、但現在已不再正確的的歷史。
    )
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    // 如果勝負已經揭曉，或某個 Square 已經被填滿了，可透過忽略點擊的方式來提早回傳
    if (this.calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext //Boolen反轉
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = this.calculateWinner(current.squares)

    // 這裡寫each movement history & 點擊可跳到該history部分
    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move #${move}` :
        `Go to game start`
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status
    if (winner) {
      status = `The Winner is: ${winner}`
    } else {
      status = `Next Player: ${this.state.xIsNext ? 'X' : 'O'}`
    }

    return (
      <div className="game" >
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => { this.handleClick(i) }}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

export default App
