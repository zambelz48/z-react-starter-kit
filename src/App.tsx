import React from 'react'
import { hot } from 'react-hot-loader'

function App(): JSX.Element {
  return (
    <div className='App'>
      <h1>Congratulations</h1>
      <p>Your react app has been up and running</p>
    </div>
  )
}

export default hot(module)(App)
