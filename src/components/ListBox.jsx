import React from "react";

// export default function ListBox({setIsOpen1,isOpen1,movies}) {
//   return (
//     <div className="box">
      // <button
      //   className="btn-toggle"
      //   onClick={() => setIsOpen1((open) => !open)}
      // >
      //   {isOpen1 ? "–" : "+"}
      // </button>
      // {isOpen1 && (
      //   <ul className="list">
      //     {movies?.map((movie) => (
      //       <li key={movie.imdbID}>
      //         <img src={movie.Poster} alt={`${movie.Title} poster`} />
      //         <h3>{movie.Title}</h3>
      //         <div>
      //           <p>
      //             <span>🗓</span>
      //             <span>{movie.Year}</span>
      //           </p>
      //         </div>
      //       </li>
      //     ))}
      //   </ul>
      // )}
//     </div>
//   );
// }
export default function ListBox({ children }) {
  return <div className="box">{children}</div>;
}
