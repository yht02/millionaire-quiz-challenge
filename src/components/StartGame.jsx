import { useRef } from "react"


export default function StartGame({ setUsername }) {

    const input = useRef();

    const handleClick = () => {
        input.current.value && setUsername(input.current.value);
    };

    return (
        <div className="startGame">
            <input placeholder="Enter Your Name" className="nameInput" ref={input} />
            <button className="startButton" onClick={handleClick}>Start Game</button>
        </div>
    )
}
