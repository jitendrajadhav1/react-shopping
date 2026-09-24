// import './App.css';
import Basket from "./components/Basket";
import ProductList from "./components/ProductList";

function App() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">React Assignment</h1>
      <div className="grid items-start gap-6 md:grid-cols-[2fr_3fr]">
        <ProductList />
        <Basket />
      </div>
    </main>
  );
}

export default App;
