// PROBE SUMBER A1 — cek bursa mana yang listing ELSA & publikasi data akun/OI
const t = (p) => `=== ${p}`;
async function cek(nama, url, opts = 8000) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), opts);
  try {
    const res = await fetch(url, { signal: ac.signal, cache: 'no-store', headers: { accept: 'application/json' } });
    const txt = await res.text();
    let ringkas = txt.slice(0, 260).replace(/\s+/g, ' ');
    console.log(t(nama), res.status, ringkas);
  } catch (e) {
    console.log(t(nama), 'GAGAL', String(e).slice(0, 80));
  } finally {
    clearTimeout(timer);
  }
}

const jobs = [
  // Bitget perp
  cek('Bitget ticker ELSAUSDT', 'https://api.bitget.com/api/v2/mix/market/tickers?productType=usdt-futures&symbol=ELSAUSDT'),
  cek('Bitget LSR akun', 'https://api.bitget.com/api/v2/mix/market/long-short-ratio?symbol=ELSAUSDT&productType=usdt-futures'),
  cek('Bitget OI history', 'https://api.bitget.com/api/v2/mix/market/contract-interest-history?symbol=ELSAUSDT&productType=usdt-futures&limit=5'),
  cek('Bitget funding', 'https://api.bitget.com/api/v2/mix/market/current-fund-rate?symbol=ELSAUSDT&productType=usdt-futures'),
  // MEXC contract
  cek('MEXC contract detail', 'https://contract.mexc.com/api/v1/contract/detail?symbol=ELSA_USDT'),
  cek('MEXC LSR', 'https://contract.mexc.com/api/v1/contract/long_short_ratio?symbol=ELSA_USDT'),
  cek('MEXC funding', 'https://contract.mexc.com/api/v1/contract/funding_rate/ELSA_USDT'),
  // HTX
  cek('HTX contract info', 'https://api.hbdm.com/linear-swap-api/v1/swap_contract_info?contract_code=ELSA-USDT'),
  cek('HTX elite position', 'https://api.hbdm.com/linear-swap-api/v1/swap_elite_position_ratio?contract_code=ELSA-USDT&period=60min'),
  // BingX
  cek('BingX ticker', 'https://open-api.bingx.com/openApi/swap/v2/quote/ticker?symbol=ELSA-USDT'),
  cek('BingX LSR', 'https://open-api.bingx.com/openApi/swap/v2/market/longShortRatio?symbol=ELSA-USDT'),
  // XT
  cek('XT ticker', 'https://fapi.xt.pub/future/market/v3/public/symbol/ticker?symbol=ELSA_USDT'),
  cek('XT LSR', 'https://fapi.xt.pub/future/market/v3/public/symbol/long-short-ratio?symbol=ELSA_USDT'),
  // spot exchanges
  cek('Gate spot ELSA', 'https://api.gateio.ws/api/v4/spot/tickers?currency_pair=ELSA_USDT'),
  cek('Bitget spot', 'https://api.bitget.com/api/v2/spot/market/tickers?symbol=ELSAUSDT'),
  cek('BitMart spot', 'https://api-cloud.bitmart.com/spot/v1/ticker?symbol=ELSA_USDT'),
  cek('LBank spot', 'https://api.lbkex.com/v2/ticker/24h.do?symbol=elsa_usdt'),
  cek('MEXC spot', 'https://api.mexc.com/api/v3/ticker/24hr?symbol=ELSAUSDT'),
  cek('HTX spot', 'https://api.huobi.pro/v1/historical/trade?symbol=elsausdt&size=1'),
  cek('XT spot', 'https://api.xt.pub/v4/public/ticker?symbol=elsa_usdt'),
  cek('CoinW spot', 'https://api.coinw.com/api/v1/public?command=returnTicker'),
  // agregator
  cek('CoinGecko search', 'https://api.coingecko.com/api/v3/search?query=ELSA'),
  cek('CoinPaprika search', 'https://api.coinpaprika.com/v1/search?q=ELSA&c=currencies&limit=5'),
];
await Promise.all(jobs);
