import AppRouter from "./componentsGeneral/appRouter";
import "./App.css";
import Navbar from "./componentsGeneral/navbar";
import SupermarketItems from "./componentsItem/supermarketItems";

function App() {
  return (
    <>
      <AppRouter />
      <nav className="container">
        <h1>Supermarket</h1>
        <p>Here you can see the list of items available in the supermarket</p>
      </nav>
      <SupermarketItems />
    </>
  );
}

export default App;
