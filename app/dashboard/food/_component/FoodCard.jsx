import axios from "axios";
import React, { useEffect, useState } from "react";

function FoodCard({ id }) {
  const [foodList, setFoodList] = useState([]);
  const fetchData = async () => {
    try {
      const result = await axios.get(`/api/get-food/${id}`);
      setFoodList(result.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className=" flex flex-col gap-2 w-3/4 items-center justify-center ">
      {foodList.map((item, index) => (
        <div
          className=" flex flex-col w-full items-center justify-center border-2"
          key={index}
        >
          <p
            className=" bg-blue-300 w-full text-center text-xl
          "
          >
            {item.mealTime}
          </p>
          <div className=" text-center grid grid-cols-2 gap-3">
            <p>{item.mealName}</p>
            <p>{item.mealIngredients}</p>
            <p>
              <span className="font-semibold">Cook: </span> {item.cook}
            </p>
            <p>
              {" "}
              <span className="font-semibold">Delivery: </span>
              {item.deliverer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FoodCard;
