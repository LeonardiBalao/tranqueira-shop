"use client";

import generateAuthHeader from "./api";

const GRAPHQL_ENDPOINT = "https://affiliate.shopee.com.br/graphql";

export const fetchGraphQL = async (query: string) => {
  const payload = JSON.stringify({ query });
  const timestamp = Math.floor(Date.now() / 1000);
  const authHeader = generateAuthHeader(
    process.env.SHOPEE_APP_ID!,
    process.env.SHOPEE_SECRET!,
    payload,
    timestamp
  );

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: payload,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};
