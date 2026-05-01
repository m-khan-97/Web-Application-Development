import ThemeContext from "./context/ThemeContext";
import Level1 from "./components/Level1";
import SpecialOffers from "./components/SpecialOffers";
import Timer from "./components/Timer";
import LeafletApp from "./components/LeafletApp";

function App() {
    return (
        <ThemeContext.Provider value="dark">
        <div>
            <h1>React Effects, Refs and Context</h1>
            <SpecialOffers />
            <hr />
            <Level1 />
            <hr />
            <Timer />
            <LeafletApp />
        </div>
        </ThemeContext.Provider>
    )
}

export default App;