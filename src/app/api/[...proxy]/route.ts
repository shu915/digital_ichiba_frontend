import { NextRequest } from "next/server";
import handleProxyRequest from "@/lib/handleProxyRequest";
export const dynamic = "force-dynamic";

/*
  GET, POST, PUT, DELETE, PATCH リクエストを受け取り、APIに転送する
*/
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ proxy: string[] }> }
) {
  const params = await context.params;
  const proxyPaths = params.proxy;
  
  return handleProxyRequest(request, proxyPaths, "GET");
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ proxy: string[] }> }
) {
  const params = await context.params;
  const proxyPaths = params.proxy;
  return handleProxyRequest(request, proxyPaths, "POST");
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ proxy: string[] }> }
) {
  const params = await context.params;
  const proxyPaths = params.proxy;
  return handleProxyRequest(request, proxyPaths, "PUT");
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ proxy: string[] }> }
) {
  const params = await context.params;
  const proxyPaths = params.proxy;
  return handleProxyRequest(request, proxyPaths, "DELETE");
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ proxy: string[] }> }
) {
  const params = await context.params;
  const proxyPaths = params.proxy;
  return handleProxyRequest(request, proxyPaths, "PATCH");
}
