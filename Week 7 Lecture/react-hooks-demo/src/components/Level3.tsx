import { useContext } from "react"
import ThemeContext from "../context/ThemeContext"

export default function Level3() {

    const theme = useContext(ThemeContext)
    
    return <p>Current Theme: {theme}</p>
}