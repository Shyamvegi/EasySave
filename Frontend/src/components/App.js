import '../App.css';
import {Header} from './Header';
import { Counter } from './Counter';
import { Footer } from './Footer';
import {Search,Download} from './Search';
function App() {
  return (
    <div className="App">
      <Header/>
      <Download/>
      <Search/>
      <Counter val={1}/>
      <Footer/>
    </div>
  );
}

export default App;
