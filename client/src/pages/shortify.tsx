import React, { useState } from "react";
import { InputGroup, Button } from "@blueprintjs/core";
import { useFetch } from "../hooks/fetch";
import { ILink } from "../../../models/Link";
import { LinkCard } from "../components/LinkCard";

export const ShortifyPage = (): JSX.Element => {
  const { doFetch } = useFetch();
  const [link, setLink] = useState("");
  const [shortLinkData, setShortLinkData] = useState<ILink | null>(null);
  const [clicksAmount, setClicksAmount] = useState<number>(-1);

  const pressHandler = async () => {
    const data = await doFetch("/api/link/generate", "POST", {
      from: link,
      clicksLeft: clicksAmount,
    });
    if (data) setShortLinkData(data.link);
  };

  const changeClicksHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (e.target.value === "") return setClicksAmount(-1);

    const parsedNumber = Math.abs(Number(e.target.value));
    if (Number.isNaN(parsedNumber) || parsedNumber > 999999999)
      return setClicksAmount(clicksAmount);
    return setClicksAmount(parsedNumber);
  };

  return (
    <div>
      <InputGroup
        placeholder="Paste link here..."
        value={link}
        autoFocus
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setLink(e.target.value)
        }
      />
      <InputGroup
        placeholder="Limit link clicks. Leave empty for unlimited clicks"
        value={clicksAmount === -1 ? "" : String(clicksAmount)}
        onChange={changeClicksHandler}
      />
      <Button text="Generate link" intent="success" onClick={pressHandler} />
      {shortLinkData && LinkCard(shortLinkData)}
    </div>
  );
};
