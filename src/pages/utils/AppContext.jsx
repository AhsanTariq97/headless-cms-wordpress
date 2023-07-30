import { useState, createContext } from "react";

export const AppContext = createContext();

function AppContextProvider({ children }) {
  const [blogActiveIndex, setBlogActiveIndex] = useState(0);

  // No of blog per page
  // Note: Also change "first: 2" accordingly in GET_POSTS query in index file
  const BATCH_SIZE = 2;

  // For range in pagination when in between 1st and last, enter forward and backward value here
  let RANGE_FORWARD_BACKWARD;
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    // For screens lower than 768px
    RANGE_FORWARD_BACKWARD = 1;
  } else {
    // For screens greater than 768px
    RANGE_FORWARD_BACKWARD = 1;
  }

  const store = {
    blogActiveIndex,
    setBlogActiveIndex,
    BATCH_SIZE,
    RANGE_FORWARD_BACKWARD,
  };

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
}

export default AppContextProvider;
