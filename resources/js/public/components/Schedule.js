import React, { Component } from "react";

class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      publicFacing: props.publicFacing,
    };
    
    this.addGridItem = this.addGridItem.bind(this);
  }

  updateLines() {
    let gridItemCount = document.querySelectorAll('.schedule__grid__item').length;
    let newLineWidth = gridItemCount * 154;
    let labelLines = document.querySelectorAll('.schedule__label__line');
    labelLines.forEach((ele, index) => {
      ele.style.width = newLineWidth + 'px';
    });
  }

  addGridItem() {
    let roomName = prompt("Enter event name: ");
    this.state.items.push(roomName);
    this.forceUpdate();
  }

  componentDidMount() {    
    var dataFromAjax = ['Event Room 1', 'Event Room 2', 'Event Room 3', 'Event Room 4'];
    this.setState({
      items: this.state.items.concat(dataFromAjax)
    });
  }

  componentDidUpdate() {
    this.updateLines();
  }

  render() {
    return (
      <div>
        {(() => {
          if(this.state.publicFacing == false) {
            return (
              <div className="schedule__grid__add-item" onClick={this.addGridItem}>
                Add New Room
              </div>
            );
          }
        })()}

        <div className="schedule">
          <div className="schedule__container">
            <div className="schedule__labels">
              <div className="schedule__label"></div>
              <div className="schedule__label"><span>10AM</span><span className="schedule__label__line"></span></div>
              <div className="schedule__label"><span>11AM</span><span className="schedule__label__line"></span></div>
              <div className="schedule__label"><span>12PM</span><span className="schedule__label__line"></span></div>
              <div className="schedule__label"><span>1PM</span><span className="schedule__label__line"></span></div>
              <div className="schedule__label"><span>2PM</span><span className="schedule__label__line"></span></div>
              <div className="schedule__label"><span>3PM</span><span className="schedule__label__line"></span></div>
              <div className="schedule__label"><span>4PM</span><span className="schedule__label__line"></span></div>
              <div className="schedule__label"><span>5PM</span><span className="schedule__label__line"></span></div>
              <div className="schedule__label"><span>6PM</span><span className="schedule__label__line"></span></div>
              <div className="schedule__label"><span>7PM</span><span className="schedule__label__line"></span></div>
              <div className="schedule__label"><span>8PM</span><span className="schedule__label__line"></span></div>
              <div className="schedule__label"><span>9PM</span><span className="schedule__label__line"></span></div>
              <div className="schedule__label"><span>10PM</span><span className="schedule__label__line"></span></div>
              <div className="schedule__label"><span>11PM</span><span className="schedule__label__line"></span></div>
            </div>
            <div className="schedule__grid">
              {
                this.state.items.map((item) => {
                  return (
                    <div className="schedule__grid__item" key={item}>
                      <div className="schedule__grid__item__header"><span>{item}</span></div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Schedule;