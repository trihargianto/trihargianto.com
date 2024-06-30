import React from "react";
import Button from "../../01-atoms/Button";

const Alert = () => {
  return (
    <div className="w-full bg-white">
      <div className="container mx-auto  flex w-full items-center justify-between py-2 text-black">
        <div className="w-4/5">
          Subscribe to my newsletter for quick tips on engineering, career
          growth, and productivity.
        </div>
        <div className="w-1/5 text-right">
          <Button variant="primary" size="sm">
            Subscribe
          </Button>

          <Button variant="tertiary" size="sm">
            Dismiss
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
