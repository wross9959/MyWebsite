import { BrowserRouter } from "react-router-dom";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";


function App() {


  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div >
          <Navbar/>
          <Hero/>
          {/* to get space theme */}
          {/* className="bg-hero-pattern bg-cover bg-no-repeat bg-center" */}
        </div>

        <About/>
        <Experience/>
        <Tech/>
        <Works/>
        <Feedbacks/>
        
        <div className="relative z-0">
          <Contact/>
          <StarsCanvas/>
        </div>
      </div>
      
    </BrowserRouter>
  )
}

export default App
