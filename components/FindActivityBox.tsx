import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export default function FindActivityBox() {
    const [inputState, setInputState] = useState<string>('')
    const handleClick = () => {
                
    }

    const fetchTest = async () => {
        const res = await fetch('/api/hello')
        const data = await res.json()
        return data
    }

    const { data, isLoading, error } = useQuery(['test'], fetchTest)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputState(e.target.value)
    }

    return (
        <div>
            <h3>Enter an activity ID in the search box below to generate a story</h3>
            <input type="text" onChange={handleInputChange} value={inputState} />
            <button onClick={handleClick} type="button">Generate Story</button>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error</p>}
            {data && <p>{data.name}</p>}
        </div>
    )
}