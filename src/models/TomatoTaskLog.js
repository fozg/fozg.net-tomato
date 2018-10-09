import {_fetchPOST, _fetchPUT} from '../api';
import {API} from '../CONST';
/**
 * @class TomatoTaskLog
 */
export default class TomatoTaskLog {
  constructor({
    id = null,
    // userId = null,
    taskName,
    timeStart,
    timeStop,
    subTasks = null
  }) {
    this.id = id;
    // this.userId = userId;
    this.taskName = taskName;
    this.timeStart = timeStart;
    this.timeStop = timeStop;
    this.subTasks = subTasks;
  }

  async save (){
    let ttl = this.toObject();
    
    delete ttl.id;
    delete ttl.timeStop;
    delete ttl.userId;
  
    let res = await _fetchPOST(API.TOMATO_WORK_LOG, ttl )
    this.id = res._id;
    this.timeStart = res.timeStart;
    this.timeStop = res.timeStop;
    this.subTasks = res.subTasks;
    this.userId = res.userId;
    return this;
  
  }

  async stop () {    
    let res = await _fetchPUT(API.TOMATO_WORK_LOG, {id: this.id, timeStop: this.timeStop});
    
    this.timeStop = res.timeStop;
    
    return this;
  }

  async update () {
    let res = await _fetchPUT(API.TOMATO_WORK_LOG, {id: this.id, taskName: this.taskName, subTasks: this.subTasks});
    return this;
  }

  toObject () {
    return {
      id: this.id,
      userId: this.userId,
      taskName: this.taskName,
      timeStart: this.timeStart,
      timeStop: this.timeStop,
      subTasks: this.subTasks
    }
  }
}
