// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {isTimerRun: false, timerElapsed: 0, timerInMinutes: 25}

  componentWillUnmount() {
    this.clearTimerIntervel()
  }

  clearTimerIntervel = () => clearInterval(this.timerID)

  onDecrement = () => {
    const {isTimerRun} = this.state
    if (isTimerRun === false) {
      this.setState(prevState => ({
        timerInMinutes: parseInt(prevState.timerInMinutes) - 1,
      }))
    }
  }

  onIncrement = () => {
    const {isTimerRun} = this.state
    if (isTimerRun === false) {
      this.setState(prevState => ({
        timerInMinutes: parseInt(prevState.timerInMinutes) + 1,
      }))
    }
  }

  onChangeIcon = () => {
    const {isTimerRun} = this.state
    if (isTimerRun) {
      this.clearTimerIntervel()
    } else {
      this.timerID = setInterval(this.tick, 1000)
    }

    this.setState(prevState => ({isTimerRun: !prevState.isTimerRun}))
  }

  tick = () => {
    const {timerElapsed, timerInMinutes} = this.state
    const isTimerComplete = timerElapsed === timerInMinutes * 60
    if (isTimerComplete) {
      this.clearTimerIntervel()
      this.setState({isTimerRun: false})
    } else {
      this.setState(prevState => ({
        timerElapsed: parseInt(prevState.timerElapsed) - 1,
      }))
    }
  }

  resetTimer = () => {
    this.setState({timerElapsed: 0, timerInMinutes: 25, isTimerRun: false})
    this.clearTimerIntervel()
  }

  getElapsedInSeconds = () => {
    const {timerElapsed, timerInMinutes} = this.state
    const remainingSeconds = timerInMinutes * 60 - timerElapsed
    const minute = Math.floor(remainingSeconds / 60)
    const seconds = Math.floor(remainingSeconds % 60)

    const stringFiedMinutes = minute > 9 ? minute : `0${minute}`
    const stringFiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringFiedMinutes}:${stringFiedSeconds}`
  }

  render() {
    const {isTimerRun, timerInMinutes} = this.state
    const timerIcon = isTimerRun
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const iconName = isTimerRun ? 'Pause' : 'Start'
    const timerRun = isTimerRun ? 'Running' : 'Paused'
    const altIcon = isTimerRun ? 'pause icon' : 'play icon'
    return (
      <div className="bg-container">
        <div className="timer-container">
          <h1>Digital Timer</h1>
          <div className="timer-image-container">
            <div className="timer-image-box">
              <div className="timer-image">
                <h1 className="timer">{this.getElapsedInSeconds()}</h1>
                <p>{timerRun}</p>
              </div>
            </div>
            <div>
              <div className="reset-play-box">
                <div className="play-box">
                  <button
                    type="button"
                    className="button"
                    onClick={this.onChangeIcon}
                  >
                    <img src={timerIcon} alt={altIcon} className="image" />
                    <p>{iconName}</p>
                  </button>
                </div>
                <div className="reset-box">
                  <button
                    type="button"
                    className="button"
                    onClick={this.resetTimer}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      alt="reset icon"
                      className="image"
                    />
                    <p>Reset</p>
                  </button>
                </div>
              </div>
              <div>
                <p>Set Timer Limit</p>
                <div className="minus-plus_box">
                  <button
                    type="button"
                    className="decrement"
                    onClick={this.onDecrement}
                  >
                    -
                  </button>
                  <p className="paragraph">{timerInMinutes}</p>
                  <button
                    type="button"
                    className="decrement"
                    onClick={this.onIncrement}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
