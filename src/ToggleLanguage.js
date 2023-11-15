import * as React from "react";
import { useToggle } from "@uidotdev/usehooks";

export default function ToggleLanguage({ on, toggle, handleToggle }) {
  return (
    <div>
      <label
        className="toggle"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <input
          onChange={toggle}
          className="toggle-checkbox"
          type="checkbox"
          checked={on}
          onClick={handleToggle}
        />

        <span
          style={{ display: "flex", flexDirection: "row" }}
          className="toggle-label"
        >
          {on ? "arabic" : "arabic"}
        </span>
      </label>
    </div>
  );
}
