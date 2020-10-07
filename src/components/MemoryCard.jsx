
import React, {Component} from "react";
import './MemoryCard.css';
import ReactDOM from 'react-dom';


class MemoryCard extends React.Component {
    
  
  
    
    render() {
        let memoryCardInnerClass = 'MemoryCardInner';
        // if(this.state.isFlipped == false){
        //     memoryCardInnerClass = memoryCardInnerClass + 'flipped'
        // }
        this.props.isFlipped == false ? memoryCardInnerClass = memoryCardInnerClass + 'flipped' : memoryCardInnerClass = 'MemoryCardInner';

      return (
        <div className="MemoryCard" onClick={this.props.pickCard}>
            <div className={memoryCardInnerClass}>

                <div className="MemoryCardBack">
                <img src="https://www.digitalcrafts.com/img/digitalcrafts-logo-white-y.png"></img>
                </div>

                <div className="MemoryCardFront">
                {this.props.symbol}
                </div>

            </div>
        </div>
      );
    }
  }

   
//   ReactDOM.render(
//     <MemoryCard />,
//     document.getElementById('root')
//   );
  export default MemoryCard;