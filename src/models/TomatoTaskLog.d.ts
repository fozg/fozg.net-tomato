
export = TomatoTaskLog;
class TomatoTaskLog {
  
    constructor(object: TomatoTaskLogProps )
    taskName: String;
    timeStart: Date;
    timeStop: Date;
    subTasks: Array<SubTask>;
    parent: TomatoTaskLogObject;
  
    /**
     * @function
     * Save curent **TomatoTaskLog** to server
     */
    public save():Promise<function>
}

class SubTask {
  taskName: String;
  isDone: Boolean;
}

class TomatoTaskLogProps {
    taskName: String;
    timeStart: Date;
    timeStop: Date;
    subTasks: Array<SubTask>;
    parent: TomatoTaskLogObject;
}
