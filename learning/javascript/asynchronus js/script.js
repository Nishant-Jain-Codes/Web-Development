const promise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve('a')
    })
  })
  
  const promise2 = new Promise((resolve,reject) => {
    resolve('b')
  })
  
  const promise3 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve('c')
    },10)
  })
  
  
  Promise.race([promise1,promise2,promise3])
  .then((msg) => {
    console.log(msg)
  })