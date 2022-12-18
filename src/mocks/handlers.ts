import { rest } from "msw";

const verifyCard = [
  rest.get("https://lookup.binlist.net/*", (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        number: {},
        scheme: "mastercard",
      })
    )
  ),
];

export const handlers = verifyCard;
