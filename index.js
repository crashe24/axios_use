console.log('primera prueba1')

   //https://jsonplaceholder.typicode.com/users
  //  axios.get('https://jsonplaceholder.typicode.com/users')
  // url: 'https://jsonplaceholder.typicode.com/users?_limit=2',
 
const getUsers_old = () => {
  axios({
    url: 'https://jsonplaceholder.typicode.com/users',
    method:'GET',
    params: { _limit:3}
  }).then( res => console.log('res', res))
  .catch(err => console.log('err', err))
}

const getUsers = () => {
  axios.get('https://jsonplaceholder.typicode.com/users',{ params: {_limit:3}})
  .then( res => console.log('res', res))
  .catch(err => console.log('err', err))

}

/*const postUsers = () => {
    axios.post({
        method: 'POST',
        url: 'https://reqres.in/api/register',
        data: {
            email: "eve.holt@reqres.in",
            password: "pistol"
            }
    }) .then( res => console.log('res', res))
    .catch(err => console.log('err', err))
}*/

const postUsers =() => axios.post('https://reqres.in/api/register', {
    email: "eve.holt@reqres.in",
    password: "pistol"
}) .then( res => console.log('res', res))
.catch(err => console.log('err', err))

// se pierden los campos
const updateUsers = () => axios.put('https://jsonplaceholder.typicode.com/users/1',{
    name: "Jorge Leon",
    username: "crashe24",
}).then( res => console.log('res', res))
.catch(err => console.log('err', err))


const pathUsers = () => axios.patch('https://jsonplaceholder.typicode.com/users/1',{
    name: "Jorge Leon",
    username: "crashe24",
}).then( res => console.log('res', res))
.catch(err => console.log('err', err))


const deleteUsers = () => axios.delete('https://jsonplaceholder.typicode.com/users/1')
.then( res => console.log('res', res))
.catch(err => console.log('err', err))


const deleteUsersAsyncAwait = async() => {
    const res = await axios.delete('https://jsonplaceholder.typicode.com/users/1')
    console.log('res', res)
}

const dosPericionesAsyncAwait = async() => {
    const userURL = 'https://jsonplaceholder.typicode.com/users'
    const postURL = 'https://jsonplaceholder.typicode.com/posts'

    const res = await axios.get(userURL)
    const resPost = await axios.get(postURL)

    console.log('res', res.data)
    console.log('resPost', resPost.data)

}

// PromiseAll
const dosPericionesPromiseAll = () => {
    const userURL = 'https://jsonplaceholder.typicode.com/users'
    const postURL = 'https://jsonplaceholder.typicode.com/posts'

    Promise.all([axios.get(userURL), axios.get(postURL)])
    .then( res => console.log('res', res))
    .catch(err => console.log('err', err))

}

const dosPericionesAsyncAwaitPromiseAll = async () => {
    const userURL = 'https://jsonplaceholder.typicode.com/users'
    const postURL = 'https://jsonplaceholder.typicode.com/posts'

    const res = await Promise.all([axios.get(userURL), axios.get(postURL)])
    console.log('res', res[0].data)
    console.log('res', res[1].data)

}

// interceptores 
// para añadir cookie o data 

const interceptorAxios = async () => {
    axios.interceptors.request.use( (config) => {
        //config.url = 'https://jsonplaceholder.typicode.com/post/1'
        config.headers['Authorization'] = 'Bearer xyz'
        return config 
    })

    const res = await axios.get('https://jsonplaceholder.typicode.com/users/1')
    console.log('res', res)
}


const headersAxios = async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users/1', {
        'headers': {
            'jorge': '123'
        }
    })
    console.log('res', res)
}

const headersPostAxios = async () => {
    const res = await axios.post('https://jsonplaceholder.typicode.com/users',{
        name: 'Jorge Luis'
    }, {
        'headers': {
            'jorge': '123'
        }
    })
    console.log('res', res)
}

const headersTransformResponseAxios = async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users',{
       transformResponse: axios.defaults.transformResponse.concat( data =>{
        console.log('data', data)
        data = data.map(user => {
            return {
             ...user, 
            mycustomTitle: `${user.name} - ${user.username}`
            }
            
        })

        return data 
       })
    }, {
        'headers': {
            'jorge': '123'
        }
    })
    console.log('res', res)
}


const globalsAxios = async () => {
    axios.defaults.headers.common['Jorgexyz'] = 'Hello world'
    const res = await axios.get('https://jsonplaceholder.typicode.com/users')
     
    console.log('res', res)
}


// manejo de errores con axios 
const getUsersWithError = async () => {
  try {
    const res = await axios.post('https://regres.in/api/login', {
        email:'peter@klaven'
    })
    console.log('res', res)
  } catch (err) {
      console.log('err2', err)
    if (err.response.status === 404) {
        alert('No se encontro la petision')
    } 
    if (err.response.status === 400) {
        console.log('Datos ')
        alert (err.response.data.error)
    }
  }
  
   
  
  
  }
  
  const getAxiosInstance = async() => {
    const axiosInstance = axios.create({
        baseURL : 'https://jsonplaceholder.typicode.com'
    })

    const resPost = await axiosInstance.get('/posts/1')
    console.log('resPost', resPost)
    
    const resUser = await axiosInstance.get('/users/1')
    console.log('res2', resUser)
  }


  const getAxiosInstanceTimeOut = async() => {
    const axiosInstance = axios.create({
        baseURL : 'https://jsonplaceholder.typicode.com'
    })

    const resPost = await axiosInstance.get('/posts/1', {timeout:600})
    console.log('resPost', resPost)
    
    const resUser = await axiosInstance.get('/users/1')
    console.log('res2', resUser)
  }
//getUsers()
//postUsers()
//updateUsers()
//pathUsers()
//deleteUsers()
//dosPericionesAsyncAwait()
//dosPericionesPromiseAll()
//dosPericionesAsyncAwaitPromiseAll()
//interceptorAxios()
//headersAxios()
//headersTransformResponseAxios()
//globalsAxios()
//getUsersWithError()

//getAxiosInstance()
getAxiosInstanceTimeOut()