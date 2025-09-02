"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

type Shop = {
  id: string;
  name: string;
  description: string;
  icon_url : string;
  header_url: string;
};

export default function ShopPage() {
  const { id } = useParams<{ id: string }>();
  const [shop, setShop] = useState<Shop | null>(null);
  useEffect(() => {
    fetch(`/shops/${id}/api`, {
      method: "GET",
      cache: "no-store",
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setShop(data.shop);
      });
  }, [id]);
  return <div>
    <h1>{shop?.name}</h1>
    <p>{shop?.description}</p>
    <img src={shop?.icon_url} alt={shop?.name} />
    <img src={shop?.header_url} alt={shop?.name} />
  </div>;
}