import { useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Context } from "../../Context/context";
import { RESTAURANTS } from "../../Query";

const Restaurant = () => {
  const { items, setItems } = useContext(Context);

  const { data } = useQuery(RESTAURANTS, {
    variables: { categoryId: items },
  });

  const handleClick = (e) => {
    setItems(e.target.id);
  };

  return (
    <>
     <div className="container">
      <div>
        {data &&
          data.getRestaurants.map((e, i) => (
            <div key={i} className="card">
              <div className="card-body card">
                <div>
                  <Link className="text" id={e.id} to="branches" onClick={(e) => handleClick(e)}>
                    {e.name}
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
     </div>
    </>
  );
};

export default Restaurant;
