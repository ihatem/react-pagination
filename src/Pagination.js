import React, { useContext, useState } from "react";
import Pagination from "react-js-pagination";
import { Context } from "./context";

const PaginationPage = props => {
  const [activePage, setActivePage] = useState(props.match.params.pageNum);
  const [state] = useContext(Context);
  return (
    <div id="pagination" className="row d-flex justify-content-center">
      <Pagination
        className="pagination"
        itemClass="page-item"
        linkClass="page-link"
        activePage={activePage}
        itemsCountPerPage={10}
        totalItemsCount={state.totalPosts}
        pageRangeDisplayed={5}
        onChange={page => {
          setActivePage(page);
          props.history.push(`/${page}`);
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
        }}
      />
    </div>
  );
};

// const Pagination = () => {
//   const [state, setState] = useContext(Context);
//   const arr = new Array(state).fill(null).map((x, i) => i + 1);

//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     setTimeout(setIsLoading(false), 1000);
//   }, []);

//   return (
//     <div id="pagination">
//       {isLoading ? (
//         <span>Loading...</span>
//       ) : (
//         arr.map(page => {
//           return (
//             <NavLink to={`/${page}`} key={page}>
//               {page}
//             </NavLink>
//           );
//         })
//       )}
//     </div>
//   );
// };

export default PaginationPage;
