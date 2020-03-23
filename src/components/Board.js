import React from 'react'
import Square from './Square'

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 先設置9個index的array: null for each index
      squares: Array(9).fill(null),
      xIsNext: true
    }
  }

  // i值來自於render裡renderSquare(i)中的parameter
  handleClick(i) {
    const squares = this.state.squares.slice()
    // 如果勝負已經揭曉，或某個 Square 已經被填滿了，可透過忽略點擊的方式來提早回傳
    if (this.calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext //Boolen反轉
    })
  }

  renderSqure(i) {
    // send value's prop to Square
    return <Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />
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

  render() {
    const winner = this.calculateWinner(this.state.squares)
    let status
    if (winner) {
      status = `The Winner is: ${winner}`
    } else {
      status = `Next Player: ${this.state.xIsNext ? 'X' : 'O'}`
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSqure(0)}
          {this.renderSqure(1)}
          {this.renderSqure(2)}
        </div>
        <div className="board-row">
          {this.renderSqure(3)}
          {this.renderSqure(4)}
          {this.renderSqure(5)}
        </div>
        <div className="board-row">
          {this.renderSqure(6)}
          {this.renderSqure(7)}
          {this.renderSqure(8)}
        </div>
      </div>
    )
  }
}

export default Board