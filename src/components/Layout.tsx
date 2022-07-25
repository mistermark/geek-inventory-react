import React from "react";
import Navigation from "./Navigation";

function Layout(props: { children: any }) {
  return (
    <div className="min-h-full">
      <Navigation />
      {props.children}
    </div>
  );
}

export default Layout;
