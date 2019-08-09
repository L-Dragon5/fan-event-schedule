import axios from 'axios'
import React, { Component } from 'react'

class Schedule extends Component {
  constructor (props) {
    super(props)

    this.state = {
      schedule: []
    }
  }

  updateLines () {
    const gridItemCount = document.querySelectorAll('.schedule__grid__item').length
    const newLineWidth = gridItemCount * 154
    const labelLines = document.querySelectorAll('.schedule__label__line')
    labelLines.forEach((ele, index) => {
      ele.style.width = newLineWidth + 'px'
    })
  }

  componentDidMount () {
    axios.get('/api/schedule').then(response => {
      this.setState({
        schedule: response.data
      })
    })
  }

  componentDidUpdate () {
    this.updateLines()
  }

  render () {
    const { schedule } = this.state
    return (
      <div>
        <div className='schedule'>
          <div className='schedule__container'>
            <div className='schedule__labels'>
              <div className='schedule__label' />
              <div className='schedule__label'><span>10AM</span><span className='schedule__label__line' /></div>
              <div className='schedule__label'><span>11AM</span><span className='schedule__label__line' /></div>
              <div className='schedule__label'><span>12PM</span><span className='schedule__label__line' /></div>
              <div className='schedule__label'><span>1PM</span><span className='schedule__label__line' /></div>
              <div className='schedule__label'><span>2PM</span><span className='schedule__label__line' /></div>
              <div className='schedule__label'><span>3PM</span><span className='schedule__label__line' /></div>
              <div className='schedule__label'><span>4PM</span><span className='schedule__label__line' /></div>
              <div className='schedule__label'><span>5PM</span><span className='schedule__label__line' /></div>
              <div className='schedule__label'><span>6PM</span><span className='schedule__label__line' /></div>
              <div className='schedule__label'><span>7PM</span><span className='schedule__label__line' /></div>
              <div className='schedule__label'><span>8PM</span><span className='schedule__label__line' /></div>
              <div className='schedule__label'><span>9PM</span><span className='schedule__label__line' /></div>
              <div className='schedule__label'><span>10PM</span><span className='schedule__label__line' /></div>
              <div className='schedule__label'><span>11PM</span><span className='schedule__label__line' /></div>
            </div>
            <div className='schedule__grid'>
              {
                Object.entries(schedule).map((k, index) => {
                  const room = k[0]
                  const roomList = k[1]

                  return (
                    <div className='schedule__grid__item' key={room}>
                      <div className='schedule__grid__item__header'><span>{room}</span></div>

                      {roomList.map((event, index) => {
                        return (
                          <div className='schedule__grid__item__item' key={event.title}>{event.title}</div>
                        )
                      })}

                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Schedule
