import * as React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <section className="loading">
      <section className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </section>
    </section>
  );
};

export default LoadingScreen;
