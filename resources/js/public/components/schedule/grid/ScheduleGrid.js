import axios from 'axios'
import React, { Component } from 'react'
import ScheduleGridRoom from './ScheduleGridRoom'
import $ from 'jquery'

class ScheduleGrid extends Component {
  constructor (props) {
    super(props)

    this.state = {
      schedule: []
    }

    this.lineWidth = 154
    this.defaultBlockHeight = 72
    this.moveLabels = this.moveLabels.bind(this)
  }

  componentDidMount () {
    // Get Event Start Time from DB
    axios.get('/api/setting/event_start_time').then(response => {
      if (response.data != null) {
        this.setState({
          eventStartTime: response.data
        })
      }
    })

    // Get all events for schedule from DB
    axios.get('/api/schedule/byGrid').then(response => {
      this.setState({
        schedule: response.data
      })
    })

    $('#grid').on('scroll', this.moveLabels)
    setTimeout(() => {
      $('.schedule-grid__label > span').each((index, element) => {
        $(element).data('initialLeft', parseFloat($(element).css('left')))
      })
    })
  }

  componentWillUnmount () {
    $('#grid').off('scroll')
  }

  componentDidUpdate () {
    this.updateLines()
  }

  moveLabels () {
    const scrollLeftAmt = $('#grid').scrollLeft()
    const scrollTopAmt = $('#grid').scrollTop()

    $('#labels-bg').css('left', scrollLeftAmt)
    $('.schedule-grid__label > span').each((index, element) => {
      $(element).css('left', $(element).data('initialLeft') + scrollLeftAmt)
    })
    $('.schedule-grid__grid__item__header').css('top', scrollTopAmt)
  }

  updateLines () {
    const gridItemCount = document.querySelectorAll('.schedule-grid__grid__item').length
    const newLineWidth = gridItemCount * this.lineWidth
    const labelLines = document.querySelectorAll('.schedule-grid__label__line')
    labelLines.forEach((ele, index) => {
      ele.style.width = newLineWidth + 'px'
    })
  }

  render () {
    const schedule = this.state.schedule
    return (
      <div>
        <div id='grid' className='schedule-grid'>
          <div className='schedule-grid__container'>
            <div id='labels-bg' style={{ flex: 'none', position: 'absolute', height: '100%', width: '62px', zIndex: '4', backgroundColor: '#f2f2f2' }} />
            <div className='schedule-grid__labels'>
              <div className='schedule-grid__label' />
              <div className='schedule-grid__label'>
                <span>10AM</span>
                <span>10:30AM</span>
                <div className='schedule-grid__label__line' />
              </div>
              <div className='schedule-grid__label'>
                <span>11AM</span>
                <span>11:30AM</span>
                <div className='schedule-grid__label__line' />
              </div>
              <div className='schedule-grid__label'>
                <span>12PM</span>
                <span>12:30PM</span>
                <div className='schedule-grid__label__line' />
              </div>
              <div className='schedule-grid__label'>
                <span>1PM</span>
                <span>1:30PM</span>
                <div className='schedule-grid__label__line' />
              </div>
              <div className='schedule-grid__label'>
                <span>2PM</span>
                <span>2:30PM</span>
                <div className='schedule-grid__label__line' />
              </div>
              <div className='schedule-grid__label'>
                <span>3PM</span>
                <span>3:30PM</span>
                <div className='schedule-grid__label__line' />
              </div>
              <div className='schedule-grid__label'>
                <span>4PM</span>
                <span>4:30PM</span>
                <div className='schedule-grid__label__line' />
              </div>
              <div className='schedule-grid__label'>
                <span>5PM</span>
                <span>5:30PM</span>
                <div className='schedule-grid__label__line' />
              </div>
              <div className='schedule-grid__label'>
                <span>6PM</span>
                <span>6:30PM</span>
                <div className='schedule-grid__label__line' />
              </div>
              <div className='schedule-grid__label'>
                <span>7PM</span>
                <span>7:30PM</span>
                <div className='schedule-grid__label__line' />
              </div>
              <div className='schedule-grid__label'>
                <span>8PM</span>
                <span>8:30PM</span>
                <div className='schedule-grid__label__line' />
              </div>
              <div className='schedule-grid__label'>
                <span>9PM</span>
                <span>9:30PM</span>
                <div className='schedule-grid__label__line' />
              </div>
              <div className='schedule-grid__label'>
                <span>10PM</span>
                <div className='schedule-grid__label__line' />
              </div>
            </div>
            <div className='schedule-grid__grid'>
              { this.state && this.state.eventStartTime && schedule
                ? (Object.entries(schedule).map((k, index) => {
                  const room = k[0]
                  const roomList = k[1]

                  return (
                    <div className='schedule-grid__grid__item' key={room}>
                      <div className='schedule-grid__grid__item__header'><span>{room}</span></div>
                      <ScheduleGridRoom
                        key={room}
                        rooms={roomList}
                        eventStartTime={this.state.eventStartTime}
                        defaultBlockHeight={this.defaultBlockHeight}
                      />
                    </div>
                  )
                })) : (
                  <div className='preloader-wrapper big active'>
                    <div className='spinner-layer spinner-blue-only'>
                      <div className='circle-clipper left'>
                        <div className='circle' />
                      </div><div className='gap-patch'>
                        <div className='circle' />
                      </div><div className='circle-clipper right'>
                        <div className='circle' />
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ScheduleGrid
