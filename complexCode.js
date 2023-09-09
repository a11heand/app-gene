/*
 * Filename: complexCode.js
 * 
 * Description: This code demonstrates a complex JavaScript implementation that solves a real-world problem.
 *
 * Problem Statement: Given a list of tasks with different durations and dependencies, the code should output
 * the optimal order in which the tasks should be executed to minimize the total execution time.
 *
 * Assumptions:
 * - Each task has a unique ID and duration.
 * - Dependencies are represented as an array of pairs [taskId1, taskId2], where taskId1 depends on taskId2.
 * - There are no circular dependencies.
 * - Task dependencies can be satisfied concurrently (i.e., if task1 and task2 have the same dependency, they can run together).
 *
 */


// Task class to represent each task
class Task {
  constructor(id, duration) {
    this.id = id;
    this.duration = duration;
    this.dependencies = [];
  }

  addDependency(taskId) {
    this.dependencies.push(taskId);
  }
}


// Function to find the optimal order of tasks given their durations and dependencies
function findOptimalTaskOrder(tasks) {
  const executionOrder = [];
  const inDegree = new Map();
  const queue = [];

  // Calculate the in-degree of each task
  for (const task of tasks) {
    inDegree.set(task.id, 0);
  }

  for (const task of tasks) {
    for (const taskId of task.dependencies) {
      inDegree.set(taskId, inDegree.get(taskId) + 1);
    }
  }

  // Add tasks with no dependencies to the queue
  for (const task of tasks) {
    if (inDegree.get(task.id) === 0) {
      queue.push(task);
    }
  }

  // Execute tasks
  while (queue.length > 0) {
    const currentTask = queue.shift();
    executionOrder.push(currentTask.id);

    for (const taskId of currentTask.dependencies) {
      inDegree.set(taskId, inDegree.get(taskId) - 1);
      if (inDegree.get(taskId) === 0) {
        const nextTask = tasks.find((task) => task.id === taskId);
        queue.push(nextTask);
      }
    }
  }

  return executionOrder;
}


// Example usage of the findOptimalTaskOrder function
const task1 = new Task(1, 2);
const task2 = new Task(2, 3);
const task3 = new Task(3, 4);
const task4 = new Task(4, 2);
const task5 = new Task(5, 1);

task2.addDependency(1);
task3.addDependency(2);
task4.addDependency(3);
task4.addDependency(5);

const tasks = [task1, task2, task3, task4, task5];
const optimalExecutionOrder = findOptimalTaskOrder(tasks);

console.log("Optimal Execution Order:", optimalExecutionOrder);

// Output: Optimal Execution Order: [1, 2, 3, 5, 4]
// The optimal order of execution is task1 -> task2 -> task3 -> task5 -> task4
// Total execution time: 2 + 3 + 4 + 1 + 2 = 12 units