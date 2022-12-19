import { rest } from "msw";

const verifyCard = [
  rest.get("https://lookup.binlist.net/*", (req, res, ctx) => {
    const pathname = req.url.pathname;
    if (pathname.includes("/00000000000000")) {
      return res(ctx.status(400));
    }

    return res(
      ctx.status(200),
      ctx.json({
        number: {},
        scheme: "mastercard",
      })
    );
  }),
];

export const handlers = verifyCard;
