import { useState, type ChangeEvent } from "react";

export default function InteractiveGreeting() {
    const [name, setName] = useState('No Name');

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }

    return (
        <div>
            <h2>Interactive Greeting</h2>
            <input type="text" value={name} onChange={handleChange} />
            <div>Hello {name}</div>
        </div>
    );
}