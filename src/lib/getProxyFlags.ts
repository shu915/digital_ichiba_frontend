export default function getProxyFlags(proxyPaths: string[], method: string) {
  let setJwtFlag: boolean = false;
  let setCookieFlag: boolean = false;
  const path = proxyPaths.join("/");

  switch (true) {
    case path === "shop" && method === "POST":
      setJwtFlag = true;
      setCookieFlag = true;
      break;

    case path === "shop" && method === "GET":
      setJwtFlag = true;
      setCookieFlag = true;
      break;
    case path === "shop" && method === "PATCH":
      setJwtFlag = true;
      setCookieFlag = true;
      break;

    // products 配下の作成・更新・削除はJWT必須
    case path.startsWith("products") &&
      ["POST", "PATCH", "PUT", "DELETE"].includes(method):
      setJwtFlag = true;
      break;

    case path.startsWith("orders"):
      setJwtFlag = true;
      break;

    case path === "stripe_accounts" && method === "POST":
      setJwtFlag = true;
      break;

    case path === "stripe_checkouts" && method === "POST":
      setJwtFlag = true;
      break;
  }

  return { setJwtFlag, setCookieFlag };
}
