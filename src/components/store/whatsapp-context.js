import React from "react";
const WhatsappContext = React.createContext({
  login: () => {},
  user: null,
});

export default WhatsappContext;
