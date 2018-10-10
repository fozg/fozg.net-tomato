import React from 'react';
import styled from 'styled-components';
import Scrollbars from 'react-custom-scrollbars';

import Checkbox from './Checkbox';

export default class SubTomatoTasksInput extends React.Component {

  /**
   *  subTasks: [{
   *    taskName: String,
   *    isDone: Bool,
   *    updated: DateTime
   *  }]
   */

  componentDidMount () {
    this.input.focus();
  }

  state = {
    subTasks: this.props.defaultValue || [],
    newTaskInput: ''
  }

  _onCheckboxChange = (isChecked, idx) => {
    let subTasks = [...this.state.subTasks];
    subTasks[idx].isDone = isChecked;
    this.updateSubTasks(subTasks);
  }

  _onInputChange = (e, idx) => {
    let subTasks = [...this.state.subTasks];
    subTasks[idx].taskName = e.target.value;
    console.log(subTasks)
    this.updateSubTasks(subTasks);
  }

  _onNewTaskSubmit = e => {
    e.preventDefault();
    let subTasks = [...this.state.subTasks];
    this.setState({newTaskInput: ''})
    this.updateSubTasks(subTasks.concat({
      taskName: this.state.newTaskInput,
      isDone: false,
      updated: new Date()
    }));
  }

  updateSubTasks = (subTasks) => {
    this.setState({subTasks}, () => {
      if (this.props.onChange) {
        this.props.onChange(subTasks);
      }
    });
  }

  render() {
    const {
      subTasks
    } = this.state;

    return (
      <div style={{ margin: '10px 0' }}>
          
        <Scrollbars style={{ maxHeight: 200, }} autoHeight >
            {subTasks.map((item, idx) => (
              <div key={idx} className="row" style={{   marginBottom: 5, marginLeft: 0, marginRight: 0}}>
                <div className="col-auto" style={{ paddingTop: 7, paddingLeft: 20, width: 50 }}>
                  <Checkbox isChecked={item.isDone} onChange={(isChecked) => { this._onCheckboxChange(isChecked, idx) }} />
                </div>
                <div className="col" style={{ flex: 1, padding: 0 }}>
                  <InputStyled
                    defaultValue={item.taskName}
                    className={"added " + (item.isDone ? "done" : '')} onChange={e => { this._onInputChange(e, idx) }} spellCheck={false}
                  />
                </div>
              </div>
            ))}
        </Scrollbars>
          
        <div className="row" style={{ marginBottom: 5 }}>
          <div className="col-auto" style={{ width: 50 }}>

          </div>
          <div className="col" style={{ flex: 1 }}>
            <form onSubmit={this._onNewTaskSubmit}>
              <InputStyled
                placeholder="Enter new Sub task"
                value={this.state.newTaskInput}
                onChange={e => { this.setState({ newTaskInput: e.target.value }) }}
                innerRef={comp => this.input = comp}
              />
            </form>
          </div>
        </div>

      </div>
    )
  }
}

const InputStyled = styled.input`
  border: none;
  width: 100%;
  background: rgba(255,255,255,.3);
  padding: 10px;
  transition: background .3s;
  border-radius: 5px;
  font-size: 16px;
  :focus {
    outline: none;
  }
  :hover {
    background: rgba(255,255,255,.4);
  }
  &.added {
    background: rgba(255,255,255,.01);
    padding: 5px 10px;
  }
  :focus {
    background: rgba(255,255,255,.5);
  }
  &.done {
    text-decoration: line-through;
    color: #4caf50;
  }
`