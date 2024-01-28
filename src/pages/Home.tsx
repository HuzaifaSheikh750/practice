// import React, { useEffect, useState } from "react";
// import { authService } from "../hook/auth";
// import AxiosInstance from "../axios/axiosInstance";
// import axios from "axios";
// import ReactPaginate from "react-paginate";

// const Home = () => {
//   const [data, setData] = React.useState([]);
//   const [data2, setData2] = React.useState([]);
//   const [title, setTitle] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [rowsPerPage, setRowsPerPage] = useState({
//     value: 10,
//     label: "10",
//   });
//   const [currentPage, setCurrentPage] = useState(0);


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.escuelajs.co/api/v1/products?offset=1&limit=${rowsPerPage.value}`
//         );
//         setData2(response.data);
//         setCurrentPage(0)
//         setTitle("");
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const filterBYName = (e: string) => {
//     e.preventDefault();
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.escuelajs.co/api/v1/products?title=${title}`
//         );
//         setData2(response.data);
//         console.log(response.data);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   };

//   const reset = () => {
//     setCurrentPage(0)
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.escuelajs.co/api/v1/products?offset=1&limit=${rowsPerPage.value}`
//         );
//         setData2(response.data);

//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//     setTitle("");
//   };

//   const handlePagination = (page) => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.escuelajs.co/api/v1/products?offset=${
//             page.selected + 1
//           }&limit=${rowsPerPage.value}`
//         );
//         setData2(response.data);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//     setCurrentPage(page.selected);
// };

//   return (
//     <>
//       <h1>{data.email}</h1>
//       <input
//         type="text"
//         placeholder="name"
//         name="title"
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <button
//         onClick={(e) => {
//           filterBYName(e);
//         }}
//       >
//         Filter{" "}
//       </button>
//       <button onClick={() => reset()}>Reset </button>
//       {data2.map((item: any) => {
//         return (
//           <div>
//             <ul>
//               <li>{item.title}</li>
//             </ul>
//           </div>
//         );
//       })}

//       <ReactPaginate
//         nextLabel="Next"
//         breakLabel="..."
//         previousLabel="Previous"
//         pageRangeDisplayed={2}
//         forcePage={currentPage}
//         marginPagesDisplayed={2}
//         activeClassName="active"
//         pageClassName="page-item"
//         breakClassName="page-item"
//         nextLinkClassName="page-link"
//         pageLinkClassName="page-link"
//         breakLinkClassName="page-link"
//         previousLinkClassName="page-link"
//         nextClassName="page-item next-item"
//         previousClassName="page-item prev-item"
//         pageCount={Math.ceil(data2.length / rowsPerPage.value)}
//         onPageChange={(page) => handlePagination(page)}
//         containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
//       />

//       {/* <ReactPaginate
//         previousLabel="previous"
//         nextLabel="next"
//         breakLabel="..."
//         breakClassName="break-me"
//         pageCount={Math.ceil(data2.length / rowsPerPage.value)}
//         marginPagesDisplayed={2}
//         pageRangeDisplayed={5}
//         onPageChange={(page) => handlePagination(page)}
//         containerClassName="pagination"
//         subContainerClassName="pages pagination"
//         activeClassName="active"
//       /> */}
//     </>
//   );
// };

// export default Home;

import React, { useEffect, useState } from 'react';
import AxiosInstance from '../axios/axiosInstance';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const Home = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rowsPerPage] = useState({
    value: 10,
    label: '10',
  });
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchData();
  }, [currentPage, title]); // Make sure to include currentPage and title as dependencies

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products?offset=${currentPage + 1}&limit=${rowsPerPage.value}&title=${title}`
      );
      setData2(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const filterByName = () => {
    setCurrentPage(0);
    fetchData();
  };

  const reset = () => {
    setCurrentPage(0);
    setTitle('');
    fetchData();
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  return (
    <>
      <h1>{data.email}</h1>
      <input
        type="text"
        placeholder="name"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={filterByName}>Filter</button>
      <button onClick={reset}>Reset</button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div>
          <ol>
            {data2.map((item) => (
              <li key={item.id}>{`Titla ${item.title} || Price ${item.price}`}</li>
            ))}
          </ol>
        </div>
      )}

      <ReactPaginate
        nextLabel="Next"
        breakLabel="..."
        previousLabel="Previous"
        pageRangeDisplayed={2}
        forcePage={currentPage}
        marginPagesDisplayed={2}
        activeClassName="active"
        pageClassName="page-item"
        breakClassName="page-item"
        nextLinkClassName="page-link"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextClassName="page-item next-item"
        previousClassName="page-item prev-item"
        pageCount={20}
        onPageChange={handlePagination}
        containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
      />
    </>
  );
};

export default Home;
