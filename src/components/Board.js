import React from 'react'
import Square from './Square'

class Board extends React.Component {
  renderSqure(i) {
    // send value's prop to Square
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />
  }

  render() {
    return (
      <div>
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