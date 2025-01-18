import React, { useState } from "react";
import PropTypes from "prop-types";

function Star({ selected, onSelect, onHover, size, index, color }) {
  return (
    <svg
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(0)}
      onClick={onSelect}
      height={`${size}px`}
      width={`${size}px`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-4.79 -4.79 57.52 57.52"
      fill="#000000"
      stroke="#000000"
      strokeWidth="2.06142"
      style={{ cursor: "pointer" }}
    >
      <g>
        <path
          style={{ fill: selected ? color : "#CCCCCC" }}
          d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 
          c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 
          c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 
          c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 
          c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 
          C22.602,0.567,25.338,0.567,26.285,2.486z"
        ></path>
      </g>
    </svg>
  );
}

export default function StarRating({
  maxRating = 5,
  sizeStar = 24,
  color = "gold",
  buttonText = "Submit",
  onButtonClick,
  onRatingChange,
  ...props
}) {
  const [rate, setRate] = useState(0);
  const [hoverRate, setHoverRate] = useState(0);

  const handleSelect = (selectedRate) => {
    setRate(selectedRate); // ذخیره امتیاز
    if (onRatingChange) onRatingChange(selectedRate); // ارسال امتیاز به والد
  };

  const handleButtonClick = () => {
    if (onButtonClick) onButtonClick(rate); // ارسال مقدار نهایی به والد یا اکشنی دیگر
  };

  return (
    <div className="boxStar" {...props}>
      <div style={{ display: "flex", gap: "5px" }}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            selected={i < (hoverRate || rate)}
            onSelect={() => handleSelect(i + 1)}
            onHover={(value) => setHoverRate(value)}
            size={sizeStar}
            color={color}
            index={i + 1}
          />
        ))}
        <span style={{ color: color,fontSize:`${sizeStar}px` }}>{hoverRate || rate}</span>
      </div>
      <button className="btn-add" onClick={handleButtonClick}>
        {buttonText}
      </button>
    </div>
  );
}

StarRating.propTypes = {
  maxRating: PropTypes.number,
  sizeStar: PropTypes.number,
  color: PropTypes.string,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
  onRatingChange: PropTypes.func,
};
