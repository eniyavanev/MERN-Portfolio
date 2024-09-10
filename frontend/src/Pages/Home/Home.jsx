import { useState } from "react";

const Home = () => {
  const [input, setInput] = useState(new Array(6).fill(""));
  console.log(Math.floor( Math.random() ));
  //console.log(typeof new Array);
  // const handleChange = (element, index) => {
  //   if (isNaN(element.value)) {
  //     return;
  //   }
  //   const data = [...input];
  //   data[index] = element.value;
  //   //console.log(data);

  //   setInput(data);
  //   if (element.nextSibling && element.value) {
  //     element.nextSibling.focus();
  //   }
  //   if (element.previousSibling && !element.value) {
  //     element.previousSibling.focus();
  //   }
  // };
  return (
    <div>
      {/* {input.map((item, index) => (
        <input
          key={index}
          type="text"
          className="border  border-red-800 mx-2 w-10 text-center focus:border-green-400"
          value={item}
          maxLength={1}
          onChange={(e) => {
            handleChange(e.target, index);
          }}
        />
      ))} */}
    </div>
  );
};

export default Home;
