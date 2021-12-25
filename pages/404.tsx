import { Button } from "antd";
import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="container">
      <h1>Ooops! You were not supposed to see this.</h1>
      <p>This page unfortunately does not exist...</p>

      <Button className="btn">
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
