import { useState } from "react"

export default function FindActivityBox() {
    const [inputState, setInputState] = useState<string>('')
    const handleClick = () => {
        
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputState(e.target.value)
    }

    return (
        <div>
            <h3>Enter an activity ID in the search box below to generate a story</h3>
            <input type="text" onChange={handleInputChange} value={inputState} />
            <button onClick={handleClick} type="button">Generate Story</button>
        </div>
    )
}