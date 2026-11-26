// ============================================================
// MICAPROFITA-ELSA · OTAK SELARAS — pemusnah kontradiksi.
// Kelahiran: pemilik menangkap KEKELIRUAN MEMATI — panel menampilkan
// vonis BUY sementara rencana terkunci berarah SELL, dan TIDAK ADA
// satu pun gerbang yang mencocokkan keduanya. Hukum yang ditegakkan
// otak ini: SETIAP label, formula, dan angka yang tampil di panel
// wajib saling selaras; yang tidak selaras wajib TERLIHAT, TERJELAS,
// dan DIKELUARKAN putusannya oleh aturan tertulis — bukan diam.
//
// 15 pemeriksaan (SL-1..SL-15), setiap cek berstatus:
//   LOLOS · PERINGATAN · GAGAL · INFO
// statusUmum: SELARAS | PERINGATAN | KONFLIK | KRITIS
// ============================================================

export type StatusCek = 'LOLOS' | 'PERINGATAN' | 'GAGAL' | 'INFO';
export type CekSelaras = { id: string; label: string; status: StatusCek; detail: string };
export type KonflikArah = {
  rencanaArah: 'BUY' | 'SELL';
  vonisHidup: 'BUY' | 'SELL';
  sentuhTarget: boolean;
  keputusan: string;
} | null;

export type SelarasData = {
  at: string;
  statusUmum: 'SELARAS' | 'PERINGATAN' | 'KONFLIK' | 'KRITIS';
  ringkas: string;
  cek: CekSelaras[];
  konflikArah: KonflikArah;
};

// -------- input: struktur tipis (hindari siklus impor runtime) --------
export type MasukanSelaras = {
  hari: string;
  hargaLive: number;
  vonisHidup: { vonis: 'BUY' | 'SELL'; kepastian: number };
  aktif: {
    hari: string; arah: 'BUY' | 'SELL'; keyakinan: number;
    entry: number; target: number; stop: number; ambisius: number;
    hash: string; nomor: number; knobSaatKunci?: boolean;
  } | null;
  aktifStatus: {
    sentuhTarget: boolean; sentuhStop: boolean; jarakTargetPct: number; jarakStopPct: number;
    urutan: 'TARGET' | 'STOP' | null; urutanSumber: 'candle-1j' | 'konservatif' | '—';
    jamTarget: string | null; jamStop: string | null; nCandle60: number;
    hasilSementara: 'CUAN_MENGAMBANG' | 'KALAH_SEMENTARA' | 'MENANG_SEMENTARA' | 'BERJALAN'; netSementaraPct: number;
  } | null;
  rencana: {
    entry: number; stop: number; target: number; highAmbisius: number;
    stopPct: number; targetPct: number; ambisiusPct: number;
    netUntungPct: number; targetMediana: boolean;
    pTarget: number; pStop: number;
  } | null;
  mcLive: { pTarget: number; pStop: number; pAmbisius: number; pNaik: number } | null;
  modal: { vonis: string; skor: number; squeezeSkor: number; squeezeAktif: boolean; drivePct: number } | null;
  aliran: { korban: 'SHORT' | 'LONG' | null; arah: 'NAIK' | 'TURUN'; alarmLevel: string } | null;
  peta?: { arahDominan: 'NAIK' | 'TURUN' | 'RAGU'; marginArah: number; legPertamaPeluang: number | null; kakiTurunAda: boolean } | null;
  sellOn: boolean;
  ledgerOk: boolean;
  keyakinanTampil: number;
  penaltiRincian: { dari: string; poin: number; teks: string }[];
  feePct: number;
  sumber: {
    unlockHari: number | null;
    unlockPctVsBeredar: number | null;
    unlockUsd: number | null;
    unlockTanggal: string | null;
    sumberHidup: number;
    sumberTerwakili: number;
    sumberTerkunci: number;
  } | null;
};

const FEE_TOLERANSI = 0.02; // toleransi pembulatan net vs (target − fee)

export function auditSelaras(inp: MasukanSelaras): SelarasData {
  const cek: CekSelaras[] = [];
  const push = (id: string, label: string, status: StatusCek, detail: string) => cek.push({ id, label, status, detail });
  const q = (v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`;
  const h = (v: number) => (v < 0.01 ? v.toFixed(6) : v.toFixed(5));
  const arahV = inp.vonisHidup.vonis;
  const a = inp.aktif;
  const r = inp.rencana;

  // SL-1 — arah rencana terkunci ↔ vonis hidup (hukum tertinggi) — VERIFIKASI-HASIL:
  // "sasaran tersentuh" hanya sah bila urutan nyata menguntungkan rencana; sentuhan
  // pra-kunci / stop-duluan TIDAK boleh membelai rencana dengan julukan "sudah menang"
  let konflikArah: KonflikArah = null;
  if (a && a.arah !== arahV) {
    const st = inp.aktifStatus;
    const urutanSah = st?.urutan ?? null; // dijawab candle 1j pasca-kunci
    const keputusan = urutanSah === 'STOP'
      ? `VERIFIKASI-HASIL MENGADILI: TP & SL keduanya tersentuh tapi urutan nyata candle 1j pasca-kunci = STOP duluan (pukul ${st?.jamStop} UTC, sumber ${st?.urutanSumber}) — sasaran ${st?.jamTarget ? `tersentuh ${st.jamTarget} TIDAK mengubah vonis` : 'hanya tersentuh sebelum/saat kunci, tak diakreditasi'}. Rencana ${a.arah} #${a.nomor} dihakimi KALAH ${st?.netSementaraPct}% after-fee saat tutup; vonis hidup ${arahV} selaras dengan realisasi. Dilarang menumpangi posisi baru; pelajaran ditulis ke ingatan.`
      : urutanSah === 'TARGET'
        ? `DOKTRIN SASARAN-TERSENTUH (terverifikasi): sasaran rencana ${a.arah} kena DULUAN pukul ${st?.jamTarget} UTC (urutan nyata candle 1j) — rencana TIDAK dibatalkan (tidak boleh melukis-ulang rencana yang sudah menang); dinilai jujur di tutup hari. Vonis hidup ${arahV} ditampilkan sebagai PERINGATAN pembalikan; dilarang membuka posisi arah baru menumpangi rencana.`
        : inp.aktifStatus?.sentuhTarget && !inp.aktifStatus?.sentuhStop
          ? `DOKTRIN SASARAN-TERSENTUH: sasaran rencana ${a.arah} tersentuh intraday tanpa stop tersentuh — rencana TIDAK dibatalkan; dinilai jujur di tutup hari. Vonis hidup ${arahV} ditampilkan sebagai PERINGATAN pembalikan; dilarang membuka posisi arah baru menumpangi rencana.`
          : inp.vonisHidup.kepastian >= 60
            ? `PEMBATALAN SELARAS: vonis hidup ${arahV} (kepastian ${inp.vonisHidup.kepastian}%) berlawanan rencana ${a.arah} — sasaran BELUM tersentuh; rencana dibatalkan di harga hidup, dicatat ledger SEBELUM candle tutup, slot dikunci-ulang searah vonis (maks 1×/hari).`
            : `KONFLIK DITAMPILKAN JUJUR: vonis hidup ${arahV} kepastian ${inp.vonisHidup.kepastian}% < 60 — terlalu lemah untuk membatalkan; rencana ${a.arah} tetap berjalan sampai horizon, panel wajib menampilkan konflik ini.`;
    konflikArah = { rencanaArah: a.arah, vonisHidup: arahV, sentuhTarget: !!inp.aktifStatus?.sentuhTarget, keputusan };
    push('SL-1', 'arah rencana terkunci ↔ vonis hidup', 'GAGAL',
      `rencana terkunci #${a.nomor} berarah ${a.arah} (kepastian saat kunci ${a.keyakinan}%) tapi vonis hidup sekarang ${arahV} (${inp.vonisHidup.kepastian}%) — dua arah berlawanan pernah bisa tampil TANPA kata-kata; kini aturan putusnya tertulis: ${keputusan}`);
  } else if (a) {
    push('SL-1', 'arah rencana terkunci ↔ vonis hidup', 'LOLOS',
      `rencana #${a.nomor} ${a.arah} selaras vonis hidup ${arahV} (kepastian ${inp.vonisHidup.kepastian}%)`);
  } else {
    push('SL-1', 'arah rencana terkunci ↔ vonis hidup', 'INFO', 'tidak ada rencana terkunci — hanya vonis hidup yang tampil');
  }

  // SL-2 — geometri E/T/S (tanda arah pada harga)
  if (r) {
    const okGeometri = arahPlanOk(r);
    const dT = r.targetPct - pctJarak(r.entry, r.target, r.targetPct >= 0);
    const dS = Math.abs(r.stopPct) - Math.abs(pctJarak(r.entry, r.stop, r.stopPct >= 0));
    const okAngka = Math.abs(dT) <= 0.05 && Math.abs(dS) <= 0.05;
    if (!okGeometri || !okAngka) {
      push('SL-2', 'geometri E/T/S searah arah rencana', 'GAGAL',
        `geometri ${okGeometri ? 'benar' : 'RUSAK'} — E ${h(r.entry)}, T ${h(r.target)} (${q(r.targetPct)}), S ${h(r.stop)} (${q(r.stopPct)}); persentase tampilan vs harga: selisih target ${(dT).toFixed(3)}pp, stop ${(dS).toFixed(3)}pp`);
    } else {
      push('SL-2', 'geometri E/T/S searah arah rencana', 'LOLOS',
        `T dan S berada di sisi yang benar untuk arah rencana, dan % tampilan = % harga (selisih ≤ 0.05pp)`);
    }
  } else {
    push('SL-2', 'geometri E/T/S searah arah rencana', 'INFO', 'tanpa rencana — geometri tak dinilai');
  }

  // SL-3 — net after-fee jujur
  if (r) {
    const netHarapan = r.targetPct - inp.feePct;
    const selisih = r.netUntungPct - netHarapan;
    push('SL-3', 'net untung = target − fee (after-fee 0.4%)',
      Math.abs(selisih) <= FEE_TOLERANSI ? 'LOLOS' : 'GAGAL',
      `net tampil ${q(r.netUntungPct)} vs target ${q(r.targetPct)} − fee ${inp.feePct}% = ${q(netHarapan)} (selisih ${selisih.toFixed(3)}pp)`);
  } else {
    push('SL-3', 'net untung = target − fee (after-fee 0.4%)', 'INFO', 'tanpa rencana');
  }

  // SL-4 — label squeeze ↔ arah rencana (kasus persis yang ditangkap pemilik)
  if (inp.modal && a) {
    const squeezeNaik = inp.modal.squeezeAktif || inp.modal.squeezeSkor >= 60;
    if (squeezeNaik && a.arah === 'SELL') {
      push('SL-4', 'label SHORT SQUEEZE ↔ arah rencana', 'GAGAL',
        `squeeze skor ${inp.modal.squeezeSkor} AKTIF = bensin harga NAIK (short dibakar), tapi rencana terkunci ${a.arah} — inilah kekeliaruan yang ditangkap pemilik: label dan rencana menarik dua arah berlawanan`);
    } else if (squeezeNaik && a.arah === 'BUY') {
      push('SL-4', 'label SHORT SQUEEZE ↔ arah rencana', 'LOLOS',
        `squeeze skor ${inp.modal.squeezeSkor} = bensin naik; rencana ${a.arah} searah bahan bakar`);
    } else {
      push('SL-4', 'label SHORT SQUEEZE ↔ arah rencana', 'INFO',
        `squeeze skor ${inp.modal.squeezeSkor} (${inp.modal.squeezeAktif ? 'aktif' : 'tidak aktif'}) — tidak menopang arah mana pun secara eksplisit`);
    }
  } else {
    push('SL-4', 'label SHORT SQUEEZE ↔ arah rencana', 'INFO', inp.modal ? 'tanpa rencana' : 'otak modal belum terbaca');
  }

  // SL-5 — label pondasi dana (otak modal) ↔ arah rencana
  if (inp.modal && a) {
    const mv = inp.modal.vonis;
    const dukungNaik = mv === 'PUMP_NYATA' || mv === 'AKUMULASI' || mv === 'SHORT_SQUEEZE';
    const dukungTurun = mv === 'JEBAKAN_BULL' || mv === 'DISTRIBUSI';
    if (dukungNaik && a.arah === 'SELL') {
      push('SL-5', 'pondasi dana ↔ arah rencana', 'GAGAL',
        `otak modal vonis ${mv} (skor ${inp.modal.skor}) menopang NAIK, rencana ${a.arah} melawannya`);
    } else if (dukungTurun && a.arah === 'BUY') {
      push('SL-5', 'pondasi dana ↔ arah rencana', 'PERINGATAN',
        `otak modal vonis ${mv} (skor ${inp.modal.skor}) menopang TURUN sementara rencana ${a.arah} — serangan tim merah sudah dipangkas otomatis`);
    } else {
      push('SL-5', 'pondasi dana ↔ arah rencana', 'LOLOS',
        `otak modal ${mv} (skor ${inp.modal.skor}, futures ${inp.modal.drivePct.toFixed(0)}%) tidak berlawanan rencana ${a.arah}`);
    }
  } else {
    push('SL-5', 'pondasi dana ↔ arah rencana', 'INFO', inp.modal ? 'tanpa rencana' : 'otak modal belum terbaca — panel dilarang mengaku "berdiri di atas pondasi dana"');
  }

  // SL-6 — korban kaskade (otak aliran) ↔ arah rencana
  if (inp.aliran && a) {
    const k = inp.aliran.korban;
    if (k === 'SHORT' && a.arah === 'SELL') {
      push('SL-6', 'korban kaskade ↔ arah rencana', 'PERINGATAN',
        `model kaskade: sisi SHORT berisiko dilikuidasi 6j (alarm ${inp.aliran.alarmLevel}) = bensin harga NAIK; rencana ${a.arah} menabrak jadwal squeeze`);
    } else if (k === 'LONG' && a.arah === 'BUY') {
      push('SL-6', 'korban kaskade ↔ arah rencana', 'PERINGATAN',
        `model kaskade: sisi LONG berisiko dilikuidasi 6j (alarm ${inp.aliran.alarmLevel}) = bensin harga TURUN; rencana ${a.arah} menabrak jadwal flush`);
    } else {
      push('SL-6', 'korban kaskade ↔ arah rencana', 'LOLOS',
        k ? `korban kaskade ${k} searah rencana ${a.arah} (bensin di sisi lawan)` : 'tanpa sisi korban menonjol — kaskade tidak dijadikan dasar');
    }
  } else {
    push('SL-6', 'korban kaskade ↔ arah rencana', 'INFO', inp.aliran ? 'tanpa rencana' : 'otak aliran belum terbaca');
  }

  // SL-7 — knob sellOn ↔ rencana SELL
  if (a && a.arah === 'SELL') {
    push('SL-7', 'knob sellOn ↔ rencana SELL terkunci', inp.sellOn ? 'LOLOS' : 'PERINGATAN',
      inp.sellOn
        ? 'knob sellOn AKTIF — rencana SELL legal penuh'
        : `knob sellOn MATI sekarang; rencana SELL dikunci saat knob ${a.knobSaatKunci ? 'ON (legal saat kunci)' : 'tanpa catatan'} — rencana tetap berjalan sampai horizon (tidak dilukis-ulang), TAPI SELL baru dilarang; status dicakup eksplisit di kartu slot`);
  } else {
    push('SL-7', 'knob sellOn ↔ rencana SELL terkunci', 'INFO',
      a ? `rencana ${a.arah} — knob hanya mengatur SELL` : `knob sellOn ${inp.sellOn ? 'ON' : 'OFF'} — tanpa rencana`);
  }

  // SL-8 — probabilitas Monte Carlo waras
  // (pT dan pS BUKAN kejadian saling-mengesampingkan — jumlahnya boleh > 1 secara sah;
  //  yang ditandai: nilai mustahil, jalur sentuh-dua yang dominan, dan target fantasi)
  if (r) {
    const probsOk = [r.pTarget, r.pStop].every((v) => Number.isFinite(v) && v >= 0 && v <= 1);
    const overlapTipis = r.pTarget + r.pStop > 1.1;
    const fantasi = r.pTarget < 0.38 && !r.targetMediana;
    if (!probsOk) {
      push('SL-8', 'probabilitas MC waras', 'GAGAL', `pTarget ${r.pTarget} / pStop ${r.pStop} di luar [0,1] — MC rusak sungguhan`);
    } else if (overlapTipis || fantasi) {
      push('SL-8', 'probabilitas MC waras', 'PERINGATAN',
        overlapTipis
          ? `pT ${(r.pTarget * 100).toFixed(0)}% + pS ${(r.pStop * 100).toFixed(0)}% — jalur yang menyentuh KEDUANYA dominan: hasil bergantung urutan sentuhan (doktrin: dihitung KALAH konservatif)${fantasi ? '; pTarget di bawah tangga guard 38%' : ''}`
          : `pTarget ${(r.pTarget * 100).toFixed(0)}% di bawah tangga guard 38% tanpa mediana — target fantasi`);
    } else {
      push('SL-8', 'probabilitas MC waras', 'LOLOS',
        `pTarget ${(r.pTarget * 100).toFixed(0)}% · pStop ${(r.pStop * 100).toFixed(0)}%${r.targetMediana ? ' · target = mediana MC (guard)' : ''}${inp.mcLive ? ` · MC hidup (vonis ${arahV}): pNaik ${(inp.mcLive.pNaik * 100).toFixed(0)}%` : ''}`);
    }
  } else {
    push('SL-8', 'probabilitas MC waras', 'INFO', 'tanpa rencana');
  }

  // SL-9 — progres harga vs rencana & kesegaran rencana — VERIFIKASI-HASIL:
  // status ganda TP+SL wajib dijawab urutannya (candle 1j nyata), dilarang diam
  if (a && inp.aktifStatus) {
    const st = inp.aktifStatus;
    const segar = a.hari === inp.hari;
    if (!segar) {
      push('SL-9', 'progres harga & kesegaran rencana', 'PERINGATAN',
        `rencana hari ${a.hari} masih aktif padahal candle berjalan ${inp.hari} — penilaian kemarin belum jalan`);
    } else if (st.sentuhTarget && st.sentuhStop && st.urutan) {
      push('SL-9', 'progres harga & kesegaran rencana', st.urutan === 'STOP' ? 'GAGAL' : 'LOLOS',
        st.urutan === 'STOP'
          ? `VERIFIKASI-HASIL: TP & SL keduanya tersentuh — urutan nyata STOP duluan pukul ${st.jamStop} UTC (sumber ${st.urutanSumber}; sasaran tersentuh ${st.jamTarget} tak mengubah vonis) — rencana dinilai KALAH ${st.netSementaraPct}% after-fee`
          : `VERIFIKASI-HASIL: TP & SL keduanya tersentuh — urutan nyata TARGET duluan pukul ${st.jamTarget} UTC (sumber ${st.urutanSumber}) — rencana dinilai MENANG ${st.netSementaraPct}% after-fee`);
    } else if (st.sentuhStop) {
      push('SL-9', 'progres harga & kesegaran rencana', 'GAGAL', `stop tersentuh intraday (${h(inp.hargaLive)} vs stop ${h(a.stop)}) — tunggu tutup hari untuk penilaian jujur`);
    } else {
      push('SL-9', 'progres harga & kesegaran rencana', 'LOLOS',
        `harga hidup ${h(inp.hargaLive)} · sasaran ${st.sentuhTarget ? `SUDAH tersentuh pukul ${st.jamTarget} (cuan mengambang ${st.netSementaraPct}%)` : `masih ${q(st.jarakTargetPct)} menuju target`} · stop ${q(st.jarakStopPct)}`);
    }
  } else {
    push('SL-9', 'progres harga & kesegaran rencana', 'INFO', 'tanpa rencana terkunci');
  }

  // SL-10 — keyakinan tampilan = kepastian dasar − semua penalti (rincian terbuka)
  const totalPenalti = inp.penaltiRincian.reduce((s, x) => s + x.poin, 0);
  const harapanKek = Math.max(5, Math.min(97, Math.round(inp.vonisHidup.kepastian - totalPenalti)));
  push('SL-10', 'keyakinan tampilan = dasar − semua penalti',
    Math.abs(harapanKek - inp.keyakinanTampil) <= 1 ? 'LOLOS' : 'GAGAL',
    `tampil ${inp.keyakinanTampil}% = dasar ${inp.vonisHidup.kepastian}% − penalti ${totalPenalti} (${inp.penaltiRincian.map((x) => `${x.dari} ${x.poin}`).join(' + ') || 'tanpa penalti'})`);

  // SL-11 — rantai ledger SHA-256
  push('SL-11', 'rantai ledger SHA-256 utuh', inp.ledgerOk ? 'LOLOS' : 'GAGAL',
    inp.ledgerOk ? 'semua hash beruntun dan terverifikasi' : 'RANTAI RUSAK — ada entri yang dipalsukan atau rusak');

  // SL-12 — klaim fundamental hanya boleh tampil kalau datanya benar-benar ada
  const adaModal = !!inp.modal;
  const adaAliran = !!inp.aliran;
  push('SL-12', 'klaim "pondasi dana" hanya dengan data nyata',
    adaModal && adaAliran ? 'LOLOS' : 'PERINGATAN',
    adaModal && adaAliran
      ? `otak modal + otak aliran hidup — sensus, OI, jumlah orang, whale, kaskade semua dari data nyata (sumber ditulis di tiap kartu)`
      : `belum lengkap: otak modal ${adaModal ? 'hidup' : 'MATI'}, otak aliran ${adaAliran ? 'hidup' : 'MATI'} — kartu yang bersangkutan dilarang mengaku fundamental`);

  // SL-13 — overhang unlock ↔ arah rencana (cliff & vesting = tekanan jual terjadwal)
  if (inp.sumber?.unlockHari !== null && inp.sumber?.unlockHari !== undefined) {
    const s = inp.sumber;
    const besar = (s.unlockPctVsBeredar ?? 0) >= 5; // ≥5% dari beredar = overhang besar
    const dekat = s.unlockHari <= 7;
    const sangatDekat = s.unlockHari <= 2;
    const ket = `unlock ${s.unlockTanggal} (hari ke-${s.unlockHari} lagi), ${(s.unlockPctVsBeredar ?? 0).toFixed(1)}% dari beredar (~$${Math.round(s.unlockUsd ?? 0).toLocaleString('id-ID')})`;
    if (sangatDekat && besar) {
      push('SL-13', 'overhang unlock ↔ arah rencana', 'GAGAL',
        `${ket} — cliff sangat dekat & besar: BUY menjelang unlock besar adalah menumpang tekanan jual terjadwal; SELL/sekuritas wajib dibahas terbuka`);
    } else if (dekat && besar && a?.arah === 'BUY') {
      push('SL-13', 'overhang unlock ↔ arah rencana', 'PERINGATAN',
        `${ket} — rencana BUY berjalan menjelang cliff besar; bumbukan jual bisa terjadi SEBELUM tanggal unlock (pasar mengantisipasi)`);
    } else {
      push('SL-13', 'overhang unlock ↔ arah rencana', 'LOLOS',
        `${ket} — tidak menempel jendela berbahaya ${a ? `untuk rencana ${a.arah}` : '(tanpa rencana terkunci)'}`);
    }
  } else {
    push('SL-13', 'overhang unlock ↔ arah rencana', 'INFO',
      'jadwal unlock belum terbaca — cliff & vesting tetap diawasi manual');
  }

  // SL-14 — matriks sumber: kejujuran cakupan informasi tampil (hukum "gali sumber lain")
  if (inp.sumber) {
    const s = inp.sumber;
    const hidupCukup = s.sumberHidup + s.sumberTerwakili >= 6;
    push('SL-14', 'matriks sumber informasi tersaji jujur', hidupCukup ? 'LOLOS' : 'PERINGATAN',
      `${s.sumberHidup} sumber HIDUP + ${s.sumberTerwakili} TERWAKILI (setara dibaca langsung dari asalnya) · ${s.sumberTerkunci} TERKUNCI/mati diakui terbuka — dilarang mengaku "info lengkap" padahal ada titik buta (holder on-chain, label dompet, OTC)`);
  } else {
    push('SL-14', 'matriks sumber informasi tersaji jujur', 'PERINGATAN',
      'otak sumber belum terbaca — panel dilarang mengaku punya cakupan sumber lengkap');
  }

  // SL-15 — peta waktu (arah dominan jalur) ↔ vonis hidup: kartu "arah sedang
  // digerakan" dan kartu vonis TIDAK BOLEH menarik dua arah berlawanan diam-diam
  if (inp.peta) {
    const p = inp.peta;
    const vonisArah = inp.vonisHidup.vonis === 'BUY' ? 'NAIK' : 'TURUN';
    if (p.arahDominan !== 'RAGU' && p.arahDominan !== vonisArah && (p.legPertamaPeluang ?? 0) >= 0.5) {
      push('SL-15', 'arah dominan peta waktu ↔ vonis hidup', 'PERINGATAN',
        `peta waktu bilang arah digerakan ${p.arahDominan} (margin bensin ${p.marginArah}, peluang kaki pertama ${(100 * (p.legPertamaPeluang ?? 0)).toFixed(0)}%) tapi vonis hidup ${inp.vonisHidup.vonis} — DUA KARTU HARUS TAMPIL BERSAMAAN di panel; bila bertolak belakang, keyakinan vonis jujur dipertanyakan, bukan salah satunya disembunyikan${p.kakiTurunAda ? ' · skenario risiko berlawanan tetap tersaji di tab Peta Waktu' : ''}`);
    } else if (p.arahDominan !== 'RAGU' && p.arahDominan === vonisArah) {
      push('SL-15', 'arah dominan peta waktu ↔ vonis hidup', 'LOLOS',
        `peta waktu & vonis hidup searah ${p.arahDominan} (margin bensin ${p.marginArah > 0 ? '+' : ''}${p.marginArah} poin) — kartu arah dan kartu vonis menopang satu sama lain`);
    } else {
      push('SL-15', 'arah dominan peta waktu ↔ vonis hidup', 'INFO',
        `peta waktu RAGU (bensin naik-turun selisih ${p.marginArah} poin) — jalur dua arah tampil; vonis ${inp.vonisHidup.vonis} berdiri di bukti teknisnya sendiri`);
    }
  } else {
    push('SL-15', 'arah dominan peta waktu ↔ vonis hidup', 'INFO',
      'otak peta waktu belum terbaca — estimasi tanggal kedatangan belum tersedia');
  }

  // -------- status umum --------
  const gagal = cek.filter((c) => c.status === 'GAGAL');
  const warn = cek.filter((c) => c.status === 'PERINGATAN');
  let statusUmum: SelarasData['statusUmum'];
  if (konflikArah) statusUmum = 'KONFLIK';
  else if (gagal.length) statusUmum = 'KRITIS';
  else if (warn.length) statusUmum = 'PERINGATAN';
  else statusUmum = 'SELARAS';

  const ringkas =
    statusUmum === 'SELARAS'
      ? `SEMUA SELARAS — ${cek.length} pemeriksaan lolos; setiap label, formula, dan angka saling menopang.`
      : statusUmum === 'KONFLIK'
        ? `KONFLIK ARAH TERDETEKSI & DIKELUARKAN PUTUSNYA — rencana ${konflikArah?.rencanaArah} vs vonis hidup ${konflikArah?.vonisHidup}. ${gagal.length} gagal · ${warn.length} peringatan.`
        : statusUmum === 'KRITIS'
          ? `KRITIS — ${gagal.length} pemeriksaan GAGAL (${gagal.map((g) => g.id).join(', ')}) · ${warn.length} peringatan; dilarang dipakai ambil posisi sebelum dibereskan.`
          : `PERINGATAN — ${warn.length} peringatan (${warn.map((w) => w.id).join(', ')}); tidak ada yang gagal, tapi kejujuran penuh ditampilkan.`;

  return { at: new Date().toISOString(), statusUmum, ringkas, cek, konflikArah };
}

function arahPlanOk(r: NonNullable<MasukanSelaras['rencana']>): boolean {
  // arah rencana dibaca murni dari geometri harga: target di ATAS entry = BUY, di BAWAH = SELL;
  // stop wajib di sisi lawan. (targetPct tersimpan sebagai magnitudo — jangan pakai tandanya.)
  const buy = r.target > r.entry;
  const stopBenar = buy ? r.stop < r.entry : r.stop > r.entry;
  return stopBenar && Math.abs(r.targetPct) > 0 && Math.abs(r.stopPct) > 0;
}

// jarak % harga entry→level; tanda mengikuti tanda pct sumber
function pctJarak(entry: number, level: number, positif: boolean): number {
  const raw = ((level - entry) / entry) * 100;
  return positif ? Math.abs(raw) : -Math.abs(raw);
}
