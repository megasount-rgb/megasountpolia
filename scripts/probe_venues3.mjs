// PROBE RONDE 3 — rasio akun Bitget v1/v2, Upbit, MEXC penuh, BingX quote, Toobit
async function cek(nama, url, timeoutMs = 9000) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: ac.signal, cache: 'no-store', headers: { accept: 'application/json' } });
    const txt = await res.text();
    console.log(`=== ${nama}`, res.status, txt.slice(0, 380).replace(/\s+/g, ' '));
    return txt;
  } catch (e) {
    console.log(`=== ${nama}`, 'GAGAL', String(e).slice(0, 80));
    return '';
  } finally {
    clearTimeout(timer);
  }
}

// Bitget variasi rasio posisi/akun
await cek('Bitget pos-ratio v2', 'https://api.bitget.com/api/v2/mix/market/position-long-short-ratio?symbol=ELSAUSDT&productType=USDT-FUTURES&period=1h');
await cek('Bitget lsr v1', 'https://api.bitget.com/api/mix/v1/market/long-short-ratio?symbol=ELSAUSDT&period=1h');
await cek('Bitget ticker full grep', 'https://api.bitget.com/api/v2/mix/market/tickers?productType=USDT-FUTURES');
// BingX quote endpoints
await cek('BingX premiumIndex quote', 'https://open-api.bingx.com/openApi/swap/v2/quote/premiumIndex?symbol=ELSA-USDT');
await cek('BingX fundingRate quote', 'https://open-api.bingx.com/openApi/swap/v2/quote/fundingRate?symbol=ELSA-USDT');
await cek('BingX klines', 'https://open-api.bingx.com/openApi/swap/v2/quote/klines?symbol=ELSA-USDT&interval=PT1H&limit=3');
await cek('BingX trades', 'https://open-api.bingx.com/openApi/swap/v2/quote/trades?symbol=ELSA-USDT&limit=5');
// Upbit
await cek('Upbit ticker KRW-ELSA', 'https://api.upbit.com/v1/ticker?markets=KRW-ELSA');
await cek('Upbit candles 60m', 'https://api.upbit.com/v1/candles/minutes/60?market=KRW-ELSA&count=3');
// MEXC spot penuh
await cek('MEXC spot ticker penuh', 'https://api.mexc.com/api/v3/ticker/24hr?symbol=ELSAUSDT');
await cek('MEXC spot aggTrades', 'https://api.mexc.com/api/v3/aggTrades?symbol=ELSAUSDT&limit=3');
await cek('MEXC spot depth', 'https://api.mexc.com/api/v3/depth?symbol=ELSAUSDT&limit=5');
// Toobit
await cek('Toobit klines', 'https://api.toobit.com/quote/v1/klines?symbol=ELSAUSDT&interval=1h&limit=3');
await cek('Toobit funding', 'https://api.toobit.com/quote/v1/fundingRate?symbol=ELSAUSDT');
await cek('Toobit OI', 'https://api.toobit.com/quote/v1/openInterest?symbol=ELSAUSDT');
// Gate spot candlesticks (untuk akumulasi spot Gate)
await cek('Gate spot candles', 'https://api.gateio.ws/api/v4/spot/candlesticks?currency_pair=ELSA_USDT&interval=1h&limit=3');
