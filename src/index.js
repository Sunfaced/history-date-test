import "./styles/main.scss";
import React from "react";
import { createRoot } from "react-dom/client";
import Timeline from "./TimeLine";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Timeline />);
