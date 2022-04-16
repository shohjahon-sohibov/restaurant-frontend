import { useQuery } from "@apollo/client";
import { CATEGORIES, RESTAURANTS, BRANCHES, MENU } from "./Query";
import { Switch, Router, Route, Link } from 'react-router-dom'
import { useState } from "react";
import "./App.css";

import Category from "./Components/Category/Category";
import Restaurant from "./Components/Restaurants/Restaurant";
import Branch from "./Components/Branches/Branch";
import Menu from "./Components/Menu/Menu";

function App() {
  // USESTATE
  const [ categoryId, setCategoryId] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [branchId, setBranchId] = useState('');

  // USEQUERY
  
  const { data } = useQuery(CATEGORIES);    // getCategories

  const { data: RestaurantsData } = useQuery(RESTAURANTS, {  // getRestaurants
    variables: { categoryId }
  });    
  const { data: branchesData } = useQuery(BRANCHES, {    // getBranches
    variables: { restaurantId },
  });
  const { data: menuData } = useQuery(MENU, {     // getMenu
    variables: { branchId }
  })

  return (
    <>
      {/* <ul className="list-wrapper">
        <li className="list">
          <div>
            {
              data && data.getCategories.map((e, i) => (
                <h2 key={i} onClick={() => setCategoryId(e.id)}>{e.name}</h2>
              ))
            }
          </div>
          <div>
            {RestaurantsData &&
              RestaurantsData.getRestaurants.map((e, i) => (
                <h3 key={i} onClick={() => setRestaurantId(e.id)}>
                  {e.name}
                </h3>
              ))}
          </div>

          <div>
            {branchesData &&
              branchesData.getBranches.map((e, i) => <h4 key={i} onClick={() => setBranchId(e.id)}>{e.name}</h4>)}
          </div>
        </li>
        <div>
            {
              menuData && menuData.getMenu.map((e, i) => (
                <div key={i}>
                  <h5>{e.name}</h5>
                  <p>{e.price}</p>
                </div>
              ))
            }
          </div>
      </ul> */}

      <ul>
      <div>
         <Switch>
          <Route path="/restaurants">
            <Restaurant />
          </Route>
          <Route path="/branches">
            <Branch />
          </Route>
          <Route path="/menu">
            <Menu />
          </Route>
          <Route path="/">
            <Category />
          </Route>
        </Switch> 
    </div>

      </ul>

    </>
  );
}

export default App;
