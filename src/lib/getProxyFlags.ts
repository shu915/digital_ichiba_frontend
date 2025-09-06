export default function getProxyFlags(proxy: string[], method: string) {
  let setJWT = false;
  let setCookie = false;
  const path = proxy.join("/");

  switch (true) {
    case path === "shop" && method === "POST":
      setJWT = true;
      setCookie = true;
      break;
    
    case path === "shop" && method === "GET":
      setJWT = true;
      break;
    case path === "shop" && method === "PATCH":
      setJWT = true;
      setCookie = true;
      break;
    
    case path === "products" && method === "POST":
      setJWT = true;
      break;

    case path.startsWith("orders"):
      setJWT = true;
      break;
  }

  return { setJWT, setCookie };
}