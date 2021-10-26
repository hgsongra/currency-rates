const NodeCache = require("node-cache");
const cron = require("node-cron");
const axios = require('axios').default;

// Better approach for caching is Redis, this is for demonstration purpose and hustle free setup
const currencyCache = new NodeCache();

interface ICurrency{
  base: string;
  target: string;
  rates: {
    [key: string]: number;
  }
}
export const getRate = async (base: string, target: string): Promise<ICurrency> => {
  const loopupKey = `${base}-${target}`;
  const currency: ICurrency = {
    base,
    target,
    rates: {}
  }
 if(currencyCache.has(loopupKey)){
   console.info("----------Fetched from cache----------");
   currency.rates = currencyCache.get(loopupKey);
 }else{
   await fetchCurrencyRate(base, target);
   console.info("----------Fetched from API----------");
   currency.rates = currencyCache.get(loopupKey) || {};
 }
 return currency;
}

export const fetchCurrencyRate = async (base: string, target: string): Promise<void> => {
  try {
    const params = new URLSearchParams();
    params.append("access_key", process.env.ACCESS_KEY);
    params.append("base", base);
    params.append("symbols", target);
    const response = await axios.get(process.env.ENDPOINT_URL, { params });
    if (response?.data?.rates) {
      currencyCache.set(`${base}-${target}`, response.data.rates);
    }else{
      console.log("[SOMETHING WRONG]: ", response.data);
    }
  } catch (error) {
    console.error(error);
  }
}

// In Actual environment this should scheduler our side of code base 
export const scheduleCronJob = () => {
  cron.schedule("0 1 * * * *", async function () {
    // Fetching based currencies every hour.
    console.info("Updating cache")
    await fetchCurrencyRate("USD", "SGD");
    await fetchCurrencyRate("SGD", "USD");
    await fetchCurrencyRate("USD", "HKD");
    await fetchCurrencyRate("HKD", "USD");
  });
}