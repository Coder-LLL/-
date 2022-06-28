const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

class HYPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_FULFILLED
          this.value = value
          this.onFulfilledFns.forEach(fn => {
            fn(this.value)
          })
        })
      }
    }
    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = this.PROMISE_STATUS_REJECTED
          this.reason = reason
          this.onRejectedFns.forEach(fn => {
            fn(this.reason)
          })
        })
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(reject)
    }
  }

  then(onFulfilled, onRejected) {
    const defaultOnRejected = err => {
      throw err
    }
    onRejected = onRejected || defaultOnRejected
    return new HYPromise((resolve, reject) => {
      // 如果在then调用的时候 状态已经确定了下来 则直接执行
      if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        try {
          const value = onFulfilled(this.value)
          resolve(value)
        } catch (error) {
          reject(error)
        }
      }
      if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
        try {
          const reason = onRejected(this.reason)
          resolve(reason)
        } catch (error) {
          reject(error)
        }
      }

      //  then回调的时候状态还没确定 将成功回调和失败回调放入数组中
      if (this.status === PROMISE_STATUS_PENDING) {
        this.onFulfilledFns.push(() => {
          try {
            const value = onFulfilled(this.value)
            resolve(value)
          } catch (error) {
            reject(error)
          }
        })

        this.onRejectedFns.push(() => {
          try {
            const reason = onRejected(this.reason)
            resolve(reason)
          } catch (error) {
            reject(error)
          }
        })
      }

    })
  }

  catch (onRejected) {
    return this.then(undefined, onRejected)
  } finally(onFinally) {
    this.then(() => {
      onFinally()
    }, () => {
      onFinally()
    })
  }

  static resolve(value) {
    return new HYPromise((resolve, reject) => {
      resolve(value)
    })
  }

  static reject(reason) {
    return new HYPromise((resolve, reject) => {
      reject(reason)
    })
  }
  static all(promises) {
    const values = []
    return new HYPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(
          res => {
            values.push(res)
            if (values.length === promises.length) {
              resolve(values)
            }
          }, error => {
            reject(error)
          })
      })
    })
  }

  static allSettled(promises) {
    const results = []
    return new HYPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(res => {
          results.push({
            status: PROMISE_STATUS_FULFILLED,
            value: res
          })
          if (results.length === promises.length) {
            resolve(results)
          }
        }, error => {
          results.push({
            status: PROMISE_STATUS_REJECTED,
            value: error
          })
          if (results.length === promises.length) {
            resolve(results)
          }
        })
      })
    })
  }

  static race(promises) {
    return new HYPromise((resolve, reject) => {

    })
  }
}

const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(1111)
  }, 1000)
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(2222)
  }, 2000)
})
const p3 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(3333)
  }, 3000)
})

HYPromise.allSettled([p1, p2, p3]).then(res => {
  console.log(res)
})