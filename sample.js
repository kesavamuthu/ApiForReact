function minimumChangeToMakeAllElementsEqual(arr, k) {
  let flag = false;
  arr.slice(k - 1).forEach((e) => {
    if (e != arr[k - 1]) flag = true;
  });
  if (flag) console.log("val");
}

minimumChangeToMakeAllElementsEqual([1, 2, 3, 4], 3);

function person(a, b) {
  return { name: a, time: b };
}

class priorityQueue {
  constructor(size) {
    this.size = size;
    this.arr = [];
    this.contain = false;
  }

  enqueue(person) {
    if (!this.contain) {
      person.time += new Date().getTime();
      this.arr.push(person);
      this.contain = true;
    } else {
      for (let i = 0; i < this.size; ++i)
        if (
          !this.arr[i] ||
          this.arr[i]["time"] > new Date().getTime() + person.time
        ) {
          // console.log("in ");
          person.time += new Date().getTime();
          this.arr.splice(i, 0, person);
          break;
        } else if (i + 1 == this.max) {
          person.time += new Date().getTime();
          this.arr.splice(i + 1, 0, person);
        }
    }
    return this.isSpace();
  }

  isSpace() {
    return this.arr.length < this.size;
  }

  dequeue(output) {
    this.arr.forEach((e, i) => {
      if (e.time <= new Date().getTime())
        output.push(this.arr.splice(this.arr.indexOf(e), 1)[0].name);
    });
    if (!this.arr.length) this.contain = false;
    // console.log("in dequeue", this.arr.length, this.contain);
    return this.isSpace();
  }
}

function counter() {
  let processingQueue = [];
  let max = 5;
  let fullQueue = [];
  let waitingQueue = [];
  for (let i = 0; i < max; ++i) processingQueue.push(new priorityQueue(2));
  // processingQueue.length = 2;
  // processingQueue.fill(new priorityQueue(2));
  let name = [];
  let nameI = 0;
  let output = [];
  for (let i = 0; i < 20; ++i) {
    let tmp = " a " + Math.random() * 200;
    if (!name.includes(tmp)) name.push(tmp);
    else i--;
  }
  function add() {
    let input = person(name[nameI++], Math.floor(Math.random() * 10000));
    // console.log(input);
    debugger;
    if (fullQueue.length == max) {
      waitingQueue.push(input);
    } else {
      for (let i = 0; i < max; ++i)
        if (!fullQueue.includes(processingQueue[i])) {
          if (!processingQueue[i].enqueue(input))
            fullQueue.push(processingQueue[i]);
          break;
        }
    }
    // console.log("processingQueue", processingQueue.length);
    // processingQueue.forEach((e) => {
    //   console.log(e.arr);
    // });
    // console.log("fullQueue", fullQueue);
    // console.log("waitingQueue", waitingQueue, waitingQueue.length);
    // console.log("-------------------------------------------");
  }

  function check() {
    processingQueue.forEach((e) => {
      if (fullQueue.includes(e))
        if (e.dequeue(output)) {
          fullQueue.splice(fullQueue.indexOf(e), 1);
        }
    });

    if (waitingQueue.length)
      processingQueue.forEach((e) => {
        if (!fullQueue.includes(e) && !e.enqueue(waitingQueue.pop())) {
          fullQueue.push(e);
        }
      });
  }

  for (let i = 0; i < 20; ++i) {
    add();
    check();
  }
  while (waitingQueue.length) check();
  // console.log(waitingQueue);
  // console.log("in last check ");
  // name.forEach((e) => {
  //   if (!output.includes(e)) console.log(e);
  // });
  // fullQueue.forEach((e) => console.log(e));
}

counter();
