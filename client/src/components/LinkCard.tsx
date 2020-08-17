import React from "react";
import { Card } from "@blueprintjs/core";
import { ILink } from "../../../models/Link";

export const LinkCard = (link: ILink): JSX.Element => (
  <Card>
    <p>Full link: {link.from}</p>
    <p>Short link: {link.to}</p>
    <p>
      Link clicks left: {link.clicksLeft === -1 ? "Unlimited" : link.clicksLeft}
    </p>
    <p>Creation date: {new Date(link.date).toLocaleDateString()}</p>
  </Card>
);
