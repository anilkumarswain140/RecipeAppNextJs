import React from "react";
import { useLoading } from "../../contexts/LoadingContext";
import "./Loading.css";
const Loader = () => {
  const { isLoading } = useLoading();

  return isLoading ? (
    <div className="loader-overlay">
      <div className="spinner">Loading...</div>
    </div>
  ) : null;
};

export default Loader;
