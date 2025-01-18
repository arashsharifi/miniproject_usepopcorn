import React from "react";
import ListBox from "./ListBox";
import WatchedBox from "./WatchedBox";

// export default function Main({
//   setIsOpen1,
//   isOpen1,
//   movies,
//   setIsOpen2,
//   isOpen2,
//   watched,
//   avgImdbRating,
//   avgUserRating,
//   avgRuntime,
// }) {
//   return (
//     <main className="main">
//       <ListBox isOpen1={isOpen1} setIsOpen1={setIsOpen1} movies={movies} />
//       <WatchedBox setIsOpen2={setIsOpen2} isOpen2={isOpen2} watched={watched} avgImdbRating={avgImdbRating} avgUserRating={avgUserRating} avgRuntime={avgRuntime}  />
      
//     </main>
//   );
// }
export default function Main({
children
}) {
  return (
    <main className="main">
{children}   
    </main>
  );
}
