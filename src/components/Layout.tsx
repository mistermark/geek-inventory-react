import React from "react";
import Navigation from "./Navigation";

import './Layout.css';

function Layout(props: { children: any }) {
  return (
    <div className="main-layout h-screen grid relative">
      <Navigation />
      {props.children}
    </div>
  );
}

export default Layout;
