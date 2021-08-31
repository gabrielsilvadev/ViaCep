import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Adress from './pages/Adress';

export default function Routes(){
   return (
       <BrowserRouter>
       <Switch>
           <Route path="/" component={Adress}/>
       </Switch>
       
       </BrowserRouter>
   );


}