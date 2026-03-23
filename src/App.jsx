import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Menu from "./components/Menu";
import FoodDetails from "./components/FoodDetails";
import CartPage from "./components/CartPage";
import Checkout from "./components/Checkout";
import About from "./components/About";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import FAQ from "./components/FAQ";
import Shipping from "./components/Shipping";
import Returns from "./components/Returns";
import Privacy from "./components/Privacy";

function App(){
return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Home/>}/>
<Route path="/menu" element={<Menu/>}/>
<Route path="/food/:id" element={<FoodDetails />} />
<Route path="/cart" element={<CartPage />} />
<Route path="/checkout" element={<Checkout/>}/>
<Route path="/about" element={<About/>}/>
<Route path="/contact" element={<Contact/>}/>
<Route path="/profile" element={<Profile/>}/>
<Route path="/faq" element={<FAQ/>}/>
<Route path="/shipping" element={<Shipping/>}/>
<Route path="/returns" element={<Returns/>}/>
<Route path="/privacy" element={<Privacy/>}/>
</Routes>

</BrowserRouter>

)
}

export default App;