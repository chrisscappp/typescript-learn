import Methods from "./components/Methods";
import ApiComponent from './components/Api'
import FetchFunctions from './components/FetchFunctions'
import TypeAliasa from './components/TypeAliasa'
import Interfaces from './components/Interfaces'
import CustomsUsers from './components/CustomsUsers'
import Optional from './components/Optional'
import Types from './components/Types'
import TypeGuard from './components/TypeGuard'
import Context from './components/Context'
import Classes from './components/Classes'
import Compiler from './components/Compiler'
import Generics from './components/Generics'
import Tasks from './components/Tasks'
import TypeManipulation from "./components/TypeManipulation";
import ServiceTypes from "./components/ServiceTypes";
import { testGetData } from './api/get/getData'
import { IUser } from './models'

function App() {

  testGetData<IUser[]>(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => {
        res.map((user) => {
          //console.log(user.name)
        })
      })
      .catch((err: unknown) => {
        const e = err as Error
        //console.log(e.message)
      })

  return (
    <div className="App">
        <ServiceTypes/>
    </div>
  );
}

export default App;
