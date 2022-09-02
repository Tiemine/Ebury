import axios from "axios";

async function fetchData(url, params = {}, _retries = 3) {
  if (_retries === 0) throw Error("Max retries reached on endpoint:", url);

  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(error);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    fetchData(url, params, _retries - 1);
  }
}

export async function currencies() {
  const endpoint = "https://openexchangerates.org/api/currencies.json";
  const data = await fetchData(endpoint);
  return data;
}

export async function latestExangeRates() {
  const endpoint = "https://openexchangerates.org/api/latest.json";
  const params = {
    app_id: "7d34a30cfbcb46b69d804477bc5e4ecc"
  };
  const data = await fetchData(endpoint, params);
  return data;
}
