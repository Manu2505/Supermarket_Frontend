import "./App.css";
import Navbar from "./componentsGeneral/navbar";
import ShoppingCart from "./pages/shopping_cart/ShoppingCart";

function App() {
  return (
    <>
      <Navbar />
      <nav className="container">
        <h1>Supermarket</h1>
        <p>Here you can see the list of items available in the supermarket</p>
      </nav>
      <ShoppingCart/>
    </>
  );
}

export default App;
