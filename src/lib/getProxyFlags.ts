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
      break;
    case path === "shop" && method === "PATCH":
      setJwtFlag = true;
      setCookieFlag = true;
      break;

    case path === "products" && method === "POST":
      setJwtFlag = true;
      break;

    case path.startsWith("orders"):
      setJwtFlag = true;
      break;
  }

  return { setJwtFlag, setCookieFlag };
}
