import "../../Assets/Style/style.css";
import { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { NEW_ORDER, ALL_MENU, MENU } from "../../Query";
import { Context } from "../../Context/context";

const Menu = () => {
  const [orderClickId, setOrderClickId] = useState('');
  const [foods, setfoods] = useState([]);
  const { items } = useContext(Context);

  const { data } = useQuery(MENU, {
    variables: { branchId: items },
  });

  const { data: OrderMenu } = useQuery(ALL_MENU);

  const [ newOrder ] = useMutation(NEW_ORDER, {
    update: (_, data) => {
      console.log(data);
    },
  });

  const handleClick = (e) => {
    const foodsArr = [];
    let id = e.target.id;
    const savedFood = OrderMenu.getAllMenu.find((e) => e.id == id);
    let foodsInLocalStorage = JSON.parse(window.localStorage.getItem("foods"));

    if (foodsInLocalStorage) {
      for (let i of foodsInLocalStorage) {
        foodsArr.push(i);
      }
    }

    if (foodsInLocalStorage) {
      const isInLocalStorage = foodsInLocalStorage.find(
        (e) => e.id == savedFood.id
      );
      if (!isInLocalStorage) {
        foodsArr.push(savedFood);
      } else {
        alert("You save this food already");
      }
    } else {
      if (!foodsInLocalStorage) {
        foodsArr.push(savedFood);
      } else {
        alert("You save this food already");
      }
    }
    window.localStorage.setItem("foods", JSON.stringify(foodsArr));
    setfoods(JSON.parse(window.localStorage.getItem("foods")));
  };

  const handleOrder = (e) => {
    e.preventDefault();

    const { location } = e.target.elements;

    const orderInfo = OrderMenu.getAllMenu.find(e => e.id == orderClickId)
    console.log(location.value);
    console.log(orderInfo.name, orderInfo.price, orderInfo.branchId);
    newOrder({
      variables: {
        name: orderInfo.name,
        price: orderInfo.price,
        location: location.value,
        branchId: orderInfo.branchId
      }
    })

  };

  const handleCheck = (e) => {
    setOrderClickId(e.target.id);
  };

  return (
    <div className="container menu-wrapper">
      <ul className="list-menu">
        <li className="item">
          <div className="div-menu">
            {data &&
              data.getMenu.map((e, i) => (
                <div key={i} className="card mt-3 border card-menu">
                  <div className="card-body">
                    <div>
                      <h3 value={e.name} className="name" name="name">
                        {e.name}
                      </h3>
                      <p value={e.price} className="price" name="price">
                        {e.price}
                      </p>
                      <button
                        onClick={handleClick}
                        id={e.id}
                        className="btn btn-primary"
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </li>
      </ul>

      <button
        className="btn btn-primary menu-btn"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        Toggle right offcanvas
      </button>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Offcanvas right</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {foods &&
            foods.map((e, i) => (
              <form className="border border-dark mb-3" key={i} onSubmit={handleOrder}>
                <input className="p-2 w-100" name="location" type="text" placeholder="location..." />
                <div className="card mt-1">
                  <div className="card-body">
                    <h3>name: {e.name}</h3>
                    <p>price: {e.price}</p>
                    <button
                      onClick={handleCheck}
                      className="btn btn-primary"
                      id={e.id}
                      type="submit"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </form>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
