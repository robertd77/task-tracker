export function taskCreated(task: any) {
  return {
    type: "task.created",
    timestamp: new Date().toISOString(),
    data: task,
  };
}

export function taskUpdated(task: any) {
  return {
    type: "task.updated",
    timestamp: new Date().toISOString(),
    data: task,
  };
}

export function taskDeleted(task: any) {
  return {
    type: "task.deleted",
    timestamp: new Date().toISOString(),
    data: task,
  };
}
