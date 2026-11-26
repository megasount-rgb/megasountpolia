// PROBE RONDE 2 — detail akun/OI per venue + CoinGecko tickers
async function cek(nama, url, timeoutMs = 8000) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: ac.signal, cache: 'no-store', headers: { accept: 'application/json' } });
    const txt = await res.text();
    console.log(`=== ${nama}`, res.status, txt.slice(0, 400).replace(/\s+/g, ' '));
    return txt;
  } catch (e) {
    console.log(`=== ${nama}`, 'GAGAL', String(e).slice(0, 80));
    return '';
  } finally {
    clearTimeout(timer);
  }
}

// Bitget uppercase productType + variasi endpoint
await cek('Bitget ticker USDT-FUTURES', 'https://api.bitget.com/api/v2/mix/market/tickers?productType=USDT-FUTURES&symbol=ELSAUSDT');
await cek('Bitget LSR uppercase', 'https://api.bitget.com/api/v2/mix/market/long-short-ratio?symbol=ELSAUSDT&productType=USDT-FUTURES');
await cek('Bitget OI open-interest', 'https://api.bitget.com/api/v2/mix/market/open-interest?symbol=ELSAUSDT&productType=USDT-FUTURES');
await cek('Bitget funding hist', 'https://api.bitget.com/api/v2/mix/market/funding-time?symbol=ELSAUSDT&productType=USDT-FUTURES');
// BingX variasi
await cek('BingX contracts', 'https://open-api.bingx.com/openApi/swap/v2/market/contracts?symbol=ELSA-USDT');
await cek('BingX funding hist', 'https://open-api.bingx.com/openApi/swap/v2/market/fundingRate?symbol=ELSA-USDT&limit=5');
await cek('BingX LSR v1', 'https://open-api.bingx.com/openApi/swap/v1/market/longShortRatio?symbol=ELSA-USDT');
await cek('BingX premium', 'https://open-api.bingx.com/openApi/swap/v2/market/premiumIndex?symbol=ELSA-USDT');
// CoinGecko tickers (daftar semua venue spot)
await cek('CoinGecko tickers', 'https://api.coingecko.com/api/v3/coins/elsa/tickers?include_exchange_logo=false&depth=false');
// CoinPaprika tickers
await cek('CoinPaprika tickers', 'https://api.coinpaprika.com/v1/tickers/elsa-heyelsa');
// CoinW grep ELSA
const cw = await cek('CoinW ticker penuh', 'https://api.coinw.com/api/v1/public?command=returnTicker', 12000);
try {
  const j = JSON.parse(cw);
  const rows = j?.data ? Object.entries(j.data) : [];
  const elsa = rows.filter(([k, v]) => /elsa/i.test(k) || /elsa/i.test(JSON.stringify(v).slice(0, 200)));
  console.log('=== CoinW ELSA rows', JSON.stringify(elsa).slice(0, 600));
} catch { /* abai */ }
// Gate perp ticker (OI + mark)
await cek('Gate perp ticker', 'https://api.gateio.ws/api/v4/futures/usdt/tickers?contract=ELSA_USDT');
// Gate perp funding history
await cek('Gate perp funding', 'https://api.gateio.ws/api/v4/futures/usdt/funding_rate?contract=ELSA_USDT&limit=3');
// Poloniex
await cek('Poloniex ELSA', 'https://api.poloniex.com/markets/ELSA_USDT/tick24h');
// Weex / Toobit / BTSE variasi umum coin baru
await cek('Toobit ticker', 'https://api.toobit.com/quote/v1/ticker/24hr?symbol=ELSAUSDT');
await cek('BTSE spot', 'https://api.btse.com/spot/api/v3.2/market_summary?symbol=ELSA-USDT');
