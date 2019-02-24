import React from "react";
import Player from "./Player";

class Status extends React.Component {
  handleSetPlayer(e) {
    this.props.setPlayer(e);
  }

  renderWinner() {
    if (this.props.winner) {
      return <h2>Winner is {this.props.winner}</h2>;
    } else if(this.props.isDraw){
        return <h2>It's Draw</h2>
    } else {
        return this.props.player ? (
            <h3>Next player {this.props.player}</h3>
          ) : (
            <Player player={e => this.handleSetPlayer(e)} />
          );
    }
      
  }

  render() {
    return this.renderWinner();
  }
}

export default Status;
