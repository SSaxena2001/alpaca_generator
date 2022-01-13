import React from "react";

const Alpaca = ({ design }) => {
  const imagePath = process.env.PUBLIC_URL + "/alpaca";

  return (
    <div id="alpaca" className="container flex items-center justify-around">
      <div className="w-[500px] h-[500px] relative md:w-[300px] md:h-[300px] md:relative rounded-xl bg-cover">
        {Object.keys(design).map((key) => {
          return (
            <img
              src={`${imagePath}/${key}/${design[key][0]}.png`}
              alt={key}
              key={key}
              className="absolute w-[500px] h-[500px] md:w-[300px] md:h-[300px] block rounded-xl"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Alpaca;
