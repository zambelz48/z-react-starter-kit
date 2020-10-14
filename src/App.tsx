import React from 'react'
import { ReactComponent as IconCheck } from "./assets/svg/IconCheck.svg"

function App(): JSX.Element {
	return (
		<div className="App">
			<div style={{ width: 100 }}>
				<IconCheck />
			</div>
			<h1>Congratulations</h1>
			<p>Your react app has been up and running</p>
		</div>
	)
}

export default App
