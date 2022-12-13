import { Home } from "pages/Home";
import { Navbar } from "components/Navbar";

const App = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Home />
      </main>
    </>
  );
};

export default App;