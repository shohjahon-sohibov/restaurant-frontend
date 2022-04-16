import "../../Assets/Style/style.css";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../../Query";
import { useContext } from "react";
import { Context } from "../../Context/context";

const Category = () => {
  const { data } = useQuery(CATEGORIES); // getCategories
  const { setItems } = useContext(Context);
  const handleClick = (e) => {
    setItems(e.target.id);
  };

  return (
    <>
      <ul className="container   list">
        <li className="item-first">
          <div className="d-flex item-inside-wrapper">
            {data &&
              data.getCategories.map((e, i) => (
                <div key={i} className="w-50 p-0 m-0 item-inside">
                  <div className="card w-75">
                    <div className="card-body w-100">
                      <Link
                      className="text"
                        to="/restaurants"
                        id={e.id}
                        onClick={(e) => handleClick(e)}
                      >
                        {e.name}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </li>
      </ul>
    </>
  );
};

export default Category;
