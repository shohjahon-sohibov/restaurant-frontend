import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { BRANCHES } from "../../Query";
import { Context } from "../../Context/context";

const Branch = () => {
  const { items, setItems } = useContext(Context);

  const { data } = useQuery(BRANCHES, {
    variables: { restaurantId: items },
  });

  const handleClick = (e) => {
    setItems(e.target.id);
  };
  return (
    <>
      <ul className="container list-branch">
        <li>
          <div>
            {data &&
              data.getBranches.map((e, i) => (
                <div  key={i} className="card">
                  <div className="card-body">
                    <div>
                      <Link
                      className="text"
                        to="/menu"
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

export default Branch;
