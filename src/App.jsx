import ExLayoutComponent from "./components/ExLayoutComponent";
import CustomNavbar from "./components/CustomNavbar.jsx";

// App component is essentially the top most component in a
// React-based application, from whom all other components are children of
function App() {
    return (
        <>
            <CustomNavbar/>
            <ExLayoutComponent/>
        </>
    );
}

export default App;
