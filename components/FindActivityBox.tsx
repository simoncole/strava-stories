import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"

export default function FindActivityBox({ name }: any) {
    const [inputState, setInputState] = useState<string>('')
    const handleClick = () => {
        mutation.mutate()    
    }

    const mutation = useMutation(async () => {
        console.log('inputState', inputState)
        const response = await fetch('/api/createActivityStory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: inputState, name: name})
        })
        const data = await response.json()
        return data
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputState(e.target.value)
    }

    return (
        <div>
            <h3>Enter an activity ID in the search box below to generate a story</h3>
            <input type="text" onChange={handleInputChange} value={inputState} />
            <button onClick={handleClick} type="button">Generate Story</button>
            {mutation.isLoading && <h3>Generating Story...</h3>}
            {mutation.isError && <h3>Something went wrong</h3>}
            {mutation.data && <p>{mutation.data.story}</p>}
        </div>
    )
}