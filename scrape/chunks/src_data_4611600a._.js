(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/data/papers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PAPERS",
    ()=>PAPERS,
    "paperById",
    ()=>paperById
]);
const PAPERS = [
    // ---------- FONDASI & DEFINISI ----------
    {
        id: 'turing1950',
        title: 'Computing Machinery and Intelligence',
        authors: 'A. M. Turing',
        year: 1950,
        venue: 'Mind, Vol. LIX',
        url: 'https://doi.org/10.1093/mind/LIX.236.433',
        claim: 'Mengganti pertanyaan "apakah mesin bisa berpikir" dengan tes operasional (Imitation Game / Turing Test): kecerdasan dinilai dari perilaku yang tak terbedakan dari manusia.',
        category: 'definisi'
    },
    {
        id: 'mccarthy1955',
        title: 'A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence',
        authors: 'J. McCarthy, M. Minsky, N. Rochester, C. Shannon',
        year: 1955,
        venue: 'Dartmouth Proposal',
        url: 'https://www.aaai.org/ojs/index.php/aimagazine/article/view/1904',
        claim: 'Melahirkan istilah "artificial intelligence" dan memformalkan hipotesis: setiap aspek pembelajaran/inteligensi mana pun pada prinsipnya dapat disimulasikan secara presisi oleh mesin.',
        category: 'definisi'
    },
    {
        id: 'newell1957',
        title: 'The General Problem Solver: A Program that Simulates Human Thought',
        authors: 'A. Newell, J. C. Shaw, H. A. Simon',
        year: 1957,
        venue: 'RAND Corporation / Western Joint Computer Conference',
        claim: 'Membuktikan bahwa satu mesin bisa memecahkan beragam soal formal dengan metode umum (means-ends analysis) — embrio gagasan "satu sistem, banyak domain".',
        category: 'definisi'
    },
    {
        id: 'laird1987',
        title: 'SOAR: An Architecture for General Intelligence',
        authors: 'J. E. Laird, A. Newell, P. S. Rosenbloom',
        year: 1987,
        venue: 'Artificial Intelligence, 33(1-3)',
        claim: 'Mendefinisikan kecerdasan sebagai mesin produksi (production system) dengan goal stack dan chunking; arsitektur kognitif paling berpengaruh yang mensyaratkan "general" secara eksplisit.',
        category: 'arsitektur'
    },
    {
        id: 'anderson1998',
        title: 'The Atomic Components of Thought (ACT-R)',
        authors: 'J. R. Anderson, C. Lebiere',
        year: 1998,
        venue: 'Lawrence Erlbaum Associates',
        claim: 'Mendekomposisi kognisi menjadi modul perceptual-motor, deklaratif, dan prosedural dengan produksi berbasis aktivasi — cetak biru modularitas pikiran yang kini dimitasi agen LLM.',
        category: 'arsitektur'
    },
    {
        id: 'baars1988',
        title: 'A Cognitive Theory of Consciousness (Global Workspace Theory)',
        authors: 'B. J. Baars',
        year: 1988,
        venue: 'Cambridge University Press',
        claim: 'Kognisi berpusat pada "panggung" workspace global yang menyiarkan informasi ke banyak modul spesialis — teori yang menginspirasi LIDA dan arsitektur attention-based modern.',
        category: 'arsitektur'
    },
    {
        id: 'franklin2006',
        title: 'The LIDA Architecture: Adding a Biologically Plausible Workspace to a Cognitive Agent',
        authors: 'S. Franklin, U. Ramamurthy et al.',
        year: 2006,
        venue: 'AAAI Fall Symposium',
        claim: 'Mengoperasionalkan GWT menjadi siklus kognitif (perception-action cycle) lengkap dengan memori episodal, attention codelets, dan proses bertahap (cognitive cycles ~100 ms).',
        category: 'arsitektur'
    },
    {
        id: 'legg2007',
        title: 'Universal Intelligence: A Definition of Machine Intelligence',
        authors: 'S. Legg, M. Hutter',
        year: 2007,
        venue: 'Minds and Machines 17(4)',
        url: 'https://arxiv.org/abs/0712.3329',
        claim: 'Definisi formal yang kini menjadi standar de facto: kecerdasan = performa di seluruh lingkungan yang mungkin, dibobot kesederhanaan (Occam). AGI = sistem yang skor universalnya mendekati manusia.',
        category: 'definisi'
    },
    {
        id: 'hutter2005',
        title: 'Universal Artificial Intelligence: Sequential Decisions Based on Algorithmic Probability (AIXI)',
        authors: 'M. Hutter',
        year: 2005,
        venue: 'Springer, EATCS Series',
        claim: 'Membangun agen optimal teoretis AIXI (Bayes + Solomonoff induction + sequential decision theory) — batas atas matematika untuk AGI, meski inkomputabel, menjadi tolok ukur konseptual.',
        category: 'definisi'
    },
    {
        id: 'gubrud1997',
        title: 'Nanotechnology and International Security (definisi awal AGI)',
        authors: 'M. C. Gubrud',
        year: 1997,
        venue: 'Fifth Foresight Conference on Molecular Nanotechnology',
        claim: 'Penggunaan istilah "artificial general intelligence" yang terdokumentasi paling awal: sistem AI yang mencocokkan atau melampaui kemampuan kognitif manusia di hampir semua bidang.',
        category: 'definisi'
    },
    {
        id: 'goertzel2014',
        title: 'Artificial General Intelligence: Concept, State of the Art, and Future Prospects',
        authors: 'B. Goertzel',
        year: 2014,
        venue: 'Journal of Artificial General Intelligence 5(1)',
        url: 'https://doi.org/10.2478/jagi-2014-0001',
        claim: 'Survei lapangan AGI awal: mendefinisikan AGI via generalitas lintas domain + orientasi real-world, memetakan proyek OpenCog, NuPIC, CogPrime, dan menegaskan belum ada yang mendekati generalitas manusia.',
        category: 'definisi'
    },
    // ---------- KONEKSIONIS & SCALING ----------
    {
        id: 'rumelhart1986',
        title: 'Learning representations by back-propagating errors',
        authors: 'D. E. Rumelhart, G. E. Hinton, R. J. Williams',
        year: 1986,
        venue: 'Nature 323',
        claim: 'Backpropagation membuka pelatihan multi-layer network — fondasi komputasi seluruh gelombang deep learning hingga kini.',
        category: 'arsitektur'
    },
    {
        id: 'silver2016',
        title: 'Mastering the game of Go with deep neural networks and tree search',
        authors: 'D. Silver et al. (DeepMind)',
        year: 2016,
        venue: 'Nature 529',
        claim: 'AlphaGo membuktikan kombinasi deep RL + search melampaui intuisi manusia; preseden langsung bagi jalur "belajar dari pengalaman" menuju generalitas.',
        category: 'bukti'
    },
    {
        id: 'silver2018',
        title: 'A general reinforcement learning algorithm that masters chess, shogi, and Go (AlphaZero)',
        authors: 'D. Silver et al.',
        year: 2018,
        venue: 'Science 362',
        claim: 'AlphaZero: satu algoritma, tiga permainan, tanpa data manusia — bukti kuat tabula-rasa self-play bisa mencapai level superhuman lintas domain tertutup.',
        category: 'bukti'
    },
    {
        id: 'vaswani2017',
        title: 'Attention Is All You Need',
        authors: 'A. Vaswani et al.',
        year: 2017,
        venue: 'NeurIPS 2017',
        url: 'https://arxiv.org/abs/1706.03762',
        claim: 'Arsitektur Transformer menjadi substrat universal untuk pemodelan sekuens — infrastruktur yang dipakai hampir semua kandidat AGI hari ini.',
        category: 'arsitektur'
    },
    {
        id: 'brown2020',
        title: 'Language Models are Few-Shot Learners (GPT-3)',
        authors: 'T. Brown et al. (OpenAI)',
        year: 2020,
        venue: 'NeurIPS 2020',
        claim: 'Skala parameter (175B) menghadirkan in-context learning: satu model menyelesaikan tugas bermacam-macam tanpa pelatihan ulang — generalitas perilaku pertama yang mengejutkan.',
        category: 'bukti'
    },
    {
        id: 'kaplan2020',
        title: 'Scaling Laws for Neural Language Models',
        authors: 'J. Kaplan et al. (OpenAI)',
        year: 2020,
        venue: 'arXiv:2001.08361',
        url: 'https://arxiv.org/abs/2001.08361',
        claim: 'Performa mematuhi hukum pangkat terhadap compute, data, parameter — memberi dasar kuantitatif proyeksi "menuju AGI lewat penskalaan".',
        category: 'bukti'
    },
    {
        id: 'hoffmann2022',
        title: 'Training Compute-Optimal Large Language Models (Chinchilla)',
        authors: 'J. Hoffmann et al. (DeepMind)',
        year: 2022,
        venue: 'NeurIPS 2022',
        claim: 'Mengoreksi rasio data-parameter (20 token/param): efisiensi data sama pentingnya dengan ukuran — mendasari generasi model frontier berikutnya.',
        category: 'bukti'
    },
    {
        id: 'reed2022',
        title: 'A Generalist Agent (GATO)',
        authors: 'S. Reed et al. (DeepMind)',
        year: 2022,
        venue: 'arXiv:2205.06175',
        url: 'https://arxiv.org/abs/2205.06175',
        claim: 'Satu transformer dengan bobot yang sama menjalankan 600+ tugas (teks, gambar, robotik, ATARI): bukti bahwa "generalisasi via satu bobot" mungkin, sekaligus menunjukkan kualitas per-tugas di bawah spesialis.',
        category: 'bukti'
    },
    {
        id: 'sutton2019',
        title: 'The Bitter Lesson',
        authors: 'R. Sutton',
        year: 2019,
        venue: 'Esai',
        url: 'http://www.incompleteideas.net/IncIdeas/BitterLesson.html',
        claim: '70 tahun sejarah AI: metode yang memanfaatkan compute secara umum selalu mengalahkan pengetahuan manusia yang dihand-craft — argumen utama kubu scaling, kritik utama bagi kubu simbolik.',
        category: 'bukti'
    },
    // ---------- CHOLLET & EVALUASI ----------
    {
        id: 'chollet2019',
        title: 'On the Measure of Intelligence',
        authors: 'F. Chollet',
        year: 2019,
        venue: 'arXiv:1911.01547',
        url: 'https://arxiv.org/abs/1911.01547',
        claim: 'Kecerdasan = efisiensi akuisisi keterampilan baru (skill-acquisition efficiency) atas skill belum pernah dilihat, bukan akumulasi skill; melahirkan benchmark ARC dan kerangka "skill-A vs skill-B".',
        category: 'definisi'
    },
    {
        id: 'schaeffer2023',
        title: 'Are Emergent Abilities of Large Language Models a Mirage?',
        authors: 'R. Schaeffer, B. Miranda, S. Koyejo',
        year: 2023,
        venue: 'NeurIPS 2023 (Best Paper)',
        claim: 'Menunjukkan banyak "kemampuan emergen" artefak metrik non-linier — peringatan metodologis penting agar klaim menuju AGI tidak dibangun di atas pengukuran yang bias.',
        category: 'bukti'
    },
    // ---------- LECUN / WORLD MODEL ----------
    {
        id: 'lecun2022',
        title: 'A Path Towards Autonomous Machine Intelligence',
        authors: 'Y. LeCun',
        year: 2022,
        venue: 'OpenReview (position paper)',
        url: 'https://openreview.net/forum?id=BZ5a1r-kVsf',
        claim: 'Blueprint lengkap H-JEPA: perceptron, world model prediktif di ruang representasi abstrak, cost module, actor, dan memori jangka pendek — dengan argumen eksplisit bahwa LLM-generatif autoregresif bukan jalur menuju AGI.',
        category: 'arsitektur'
    },
    {
        id: 'assran2024',
        title: 'I-JEPA: Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture',
        authors: 'M. Assran et al. (Meta AI)',
        year: 2024,
        venue: 'CVPR 2024',
        claim: 'Bukti empiris pertama JEPA: memprediksi representasi (bukan piksel) menghasilkan fitur semantik tanpa augmentasi hand-crafted — validasi pilar "world model non-generatif".',
        category: 'arsitektur'
    },
    {
        id: 'bardes2024',
        title: 'Revisiting Feature Prediction for Learning Visual Representations from Video (V-JEPA)',
        authors: 'A. Bardes et al. (Meta AI)',
        year: 2024,
        venue: 'Meta AI / arXiv',
        claim: 'V-JEPA memperluas ke video: memahami dan memprediksi dinamika fisik dunia di ruang abstrak tanpa label — langkah menuju intuisi fisika dalam world model.',
        category: 'arsitektur'
    },
    {
        id: 'v-jepa2-2025',
        title: 'V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning',
        authors: 'Meta AI (Fair team)',
        year: 2025,
        venue: 'Meta AI release / arXiv',
        claim: 'V-JEPA 2 (1.2B) + varian action-conditioned (V-JEPA 2-AC) memungkinkan perencanaan robot zero-shot di lingkungan baru: world model mulai bisa dipakai bertindak, bukan hanya memahami.',
        category: 'arsitektur'
    },
    {
        id: 'ha2018',
        title: 'World Models',
        authors: 'D. Ha, J. Schmidhuber',
        year: 2018,
        venue: 'NeurIPS 2018',
        url: 'https://arxiv.org/abs/1803.10122',
        claim: 'Agen belajar bermain di "dunia mimpi" (VAE + RNN + controller): agen dapat dilatih sepenuhnya dalam model internal dunia — preseden klasik jalur world-model.',
        category: 'arsitektur'
    },
    // ---------- NEURO-SYMBOLIC ----------
    {
        id: 'trinh2024',
        title: 'Solving olympiad geometry without human demonstrations (AlphaGeometry)',
        authors: 'T. H. Trinh et al. (DeepMind)',
        year: 2024,
        venue: 'Nature 625',
        url: 'https://www.nature.com/articles/s41586-023-06747-5',
        claim: 'Hybrid neuro-symbolic (LLM + mesin deduksi simbolik DD+AR) melatih diri dari 100 juta bukti sintetis dan menyelesaikan 25/30 soal geometri IMO — bukti kuat sinergi neural + simbolik.',
        category: 'bukti'
    },
    {
        id: 'alphaproof2025',
        title: 'Olympiad-level formal mathematical reasoning with reinforcement learning (AlphaProof)',
        authors: 'DeepMind',
        year: 2025,
        venue: 'Nature (Nov 2025)',
        url: 'https://www.nature.com/articles/s41586-025-09833-y',
        claim: 'Agen bergaya AlphaZero yang belajar menemukan bukti formal di Lean via RL atas jutaan soal terautoformalisasi — mencapai standar medali perak IMO 2024 (34/42 bersama AlphaGeometry 2).',
        category: 'bukti'
    },
    {
        id: 'goertzel2023',
        title: 'OpenCog Hyperon: A Framework for AGI at the Human Level and Beyond',
        authors: 'B. Goertzel et al.',
        year: 2023,
        venue: 'arXiv:2310.18318',
        url: 'https://arxiv.org/abs/2310.18318',
        claim: 'Arsitektur hybrid paling ambisius: MeTTa (metagraph), Distributed AtomSpace, PLN (probabilistic logic), ECAN (attention ekonomi), dan proses kognitif yang mengorganisir ulang dirinya; roadmap human-level AGI "dalam beberapa tahun" bila stack produksi tercapai.',
        category: 'arsitektur'
    },
    {
        id: 'marcus2020',
        title: 'The Next Decade in AI: Steps Towards Robust Artificial Intelligence',
        authors: 'G. Marcus',
        year: 2020,
        venue: 'arXiv:2002.06177',
        url: 'https://arxiv.org/abs/2002.06177',
        claim: 'Kritik sistematis terhadap jalur LLM-murni (fragilitas, data, kekurangan penalaran kausal) dan advokasi hybrid neuro-symbolic sebagai syarat robustness.',
        category: 'arsitektur'
    },
    // ---------- FRONTIER 2024-2026 ----------
    {
        id: 'openai-o1-2024',
        title: 'Learning to Reason with LLMs (OpenAI o1)',
        authors: 'OpenAI',
        year: 2024,
        venue: 'OpenAI blog / system card',
        url: 'https://openai.com/index/learning-to-reason-with-llms/',
        claim: 'RL untuk chain-of-thought + test-time compute scaling: meningkatkan "berpikir lebih lama" menaikkan akurasi penalaran — hukum penskalaan kedua selain parameter.',
        category: 'bukti'
    },
    {
        id: 'deepseek-r1-2025',
        title: 'DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning',
        authors: 'DeepSeek-AI',
        year: 2025,
        venue: 'arXiv:2501.12948; Nature (Sep 2025)',
        url: 'https://www.nature.com/articles/s41586-025-09422-z',
        claim: 'RL murni (GRPO) tanpa SFT manusia menginduksi refleksi, verifikasi mandiri, dan chain-of-thought panjang — kemampuan penalaran dapat di-"tumbuhkan", bukan hanya disalin dari manusia.',
        category: 'bukti'
    },
    {
        id: 'morris2023',
        title: 'Levels of AGI: Operationalizing Progress on the Path to AGI',
        authors: 'M. R. Morris et al. (Google DeepMind)',
        year: 2023,
        venue: 'arXiv:2311.02462; ICML 2024 position',
        url: 'https://arxiv.org/abs/2311.02462',
        claim: 'Kerangka standarisasi: AGI dipetakan pada dua sumbu (performance × generality) plus otonomi L0-L5; LLM frontier saat ini dinilai "Emerging AGI" (Level 1, general) dengan otonomi rendah (tool/oracle).',
        category: 'definisi'
    },
    {
        id: 'bubeck2023',
        title: 'Sparks of Artificial General Intelligence: Early experiments with GPT-4',
        authors: 'S. Bubeck et al. (Microsoft Research)',
        year: 2023,
        venue: 'arXiv:2303.12712',
        url: 'https://arxiv.org/abs/2303.12712',
        claim: 'Eksperimen sistematis menunjukkan GPT-4 mendekati performa manusia pada banyak tugas kognitif, namun gagal pada penalaran yang butuh koherensi internal — bukti dua arah yang sering dikutip dalam debat AGI.',
        category: 'bukti'
    },
    {
        id: 'chollet-arcagi2-2025',
        title: 'ARC-AGI-2 & ARC Prize 2025 Technical Report',
        authors: 'ARC Prize Foundation (F. Chollet et al.)',
        year: 2025,
        venue: 'arcprize.org; arXiv (Jan 2026)',
        url: 'https://arcprize.org',
        claim: 'ARC-AGI-2 (Mar 2025) menjatuhkan model reasoning frontier ke <5% (o3 ≈ 3%) dengan tes fluid intelligence simbolik; open-source terbaik mencapai 24% (Kaggle, Jan 2026) — ukuran jujur jarak menuju generalisasi.',
        category: 'benchmark'
    },
    {
        id: 'glazer2024',
        title: 'FrontierMath: A Benchmark for Measuring Advanced Mathematical Reasoning in AI',
        authors: 'E. Glazer et al. (Epoch AI)',
        year: 2024,
        venue: 'arXiv:2411.04872',
        url: 'https://arxiv.org/abs/2411.04872',
        claim: 'Soal matematika riset-level yang belum dipublikasikan; model awal menyelesaikan <2%, o3 mencapai ~25% (Tier 1-3) — mengukur ambang keahlian pakar, bukan recall dataset.',
        category: 'benchmark'
    },
    {
        id: 'hle2025',
        title: 'Humanity\'s Last Exam (HLE)',
        authors: 'CAIS + Scale AI (D. Hendrycks et al.)',
        year: 2025,
        venue: 'Benchmark suite (2.500 soal, revisi Mei 2025)',
        url: 'https://lastexam.ai',
        claim: 'Tes lintas 100+ disiplin pada level pakar terbaik dunia; dirancang "menghabiskan" recall dan mengukur pengetahuan/penalaran ujung — model frontier 2025 masih di angka puluhan persen.',
        category: 'benchmark'
    },
    {
        id: 'butlin2023',
        title: 'Consciousness in Artificial Intelligence: Insights from the Science of Consciousness',
        authors: 'P. Butlin et al.',
        year: 2023,
        venue: 'arXiv:2308.08708',
        url: 'https://arxiv.org/abs/2308.08708',
        claim: 'Menerjemahkan teori kesadaran (GWT, HOT, recurrent processing) menjadi indikator arsitektural yang dapat dicek — kerangka utilitarian untuk menilai apakah arsitektur AGI memiliki properti kesadaran.',
        category: 'definisi'
    },
    {
        id: 'bai2022',
        title: 'Constitutional AI: Harmlessness from AI Feedback',
        authors: 'Y. Bai et al. (Anthropic)',
        year: 2022,
        venue: 'arXiv:2212.08073',
        url: 'https://arxiv.org/abs/2212.08073',
        claim: 'Menanamkan prinsip perilaku lewat konstitusi tertulis + AI feedback: fondasi alignment yang dapat diskalakan tanpa penilaian manusia pada setiap kasus — penting untuk lapisan safety AGI.',
        category: 'safety'
    },
    {
        id: 'aschenbrenner2024',
        title: 'Situational Awareness: The Decade Ahead',
        authors: 'L. Aschenbrenner',
        year: 2024,
        venue: 'Esai panjang (open access)',
        url: 'https://situational-awareness.ai',
        claim: 'Proyeksi berbasis scaling laws: AGI mungkin tercapai ~2027, disusul superintelligence; argumen paling berpengaruh di lingkaran kebijakan AS — perlu dibaca kritis bersama penyangkalnya.',
        category: 'definisi'
    }
];
const paperById = (id)=>PAPERS.find((p)=>p.id === id);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/mod-beranda.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "modBeranda",
    ()=>modBeranda
]);
const modBeranda = {
    id: 'beranda',
    label: 'Peta Besar',
    short: 'Orientasi misi, status lapangan, dan cara memakai basis pengetahuan ini',
    tagline: 'Dari mana → ke mana: kondisi lapangan AGI per hari ini dan peran kita sebagai tim pengembang',
    color: '#f59e0b',
    sections: [
        {
            id: 'beranda-misi',
            title: 'Misi Ini: Kenapa Basis Pengetahuan Dibutuhkan',
            kicker: 'ORIENTASI',
            blocks: [
                {
                    type: 'paragraph',
                    text: 'Mengembangkan Artificial General Intelligence (AGI) bukan pekerjaan intuisi semata; ia menuntut penguasaan peta literatur yang terfragmentasi di banyak disiplin — kognitif, machine learning, neuro-symbolic, dan safety. Empat puluh tahun riset meninggalkan dua pertanyaan yang jawabannya belum sepenuhnya konvergen: definisi apa yang tepat untuk "general", dan arsitektur apa yang layak dipertaruhkan. Basis pengetahuan ini disusun sebagai alat kerja tim: setiap klaim diikat ke paper sumbernya, setiap jalur pendekatan diuji koherensinya, dan setiap gap eksplisit dicatat sebagai pekerjaan rumah riset kita sendiri.'
                },
                {
                    type: 'paragraph',
                    text: 'Struktur penalaran yang kita adopsi mengikuti lima pertanyaan yang Anda tetapkan: dari mana (akar historis dan definisional), ke mana (arah roadmap lembaga-lembaga besar), bagaimana (mekanisme arsitektural yang terbukti bekerja), mengapa (argumen dan bukti yang membuat tiap jalur kredibel atau rapuh), serta siapa dan di mana (aktor, lembaga, dan sumber daya yang benar-benar menggerakkan lapangan). Delapan modul di sebelah kiri mengalirkan kelima pertanyaan itu secara berurutan, dan modul Blueprint menjadi muara: sintesis desain arsitektur AGI yang bisa kita prototipe bertahap.'
                },
                {
                    type: 'callout',
                    tone: 'amber',
                    title: 'Kaidah kerja tim',
                    text: 'Tiga kaidah yang kita pegang: (1) bukti dulu, klaim kemudian — tidak ada komponen desain tanpa referensi paper; (2) benchmark dulu, narasi belakangan — progres diukur di ARC-AGI, FrontierMath, HLE, bukan demo; (3) safety bukan lapisan akhir — lapisan alignment direncanakan sejak diagram pertama.'
                }
            ]
        },
        {
            id: 'beranda-status',
            title: 'Status Lapangan Hari Ini (2026)',
            kicker: 'TITIK BERANGKAT',
            blocks: [
                {
                    type: 'stats',
                    items: [
                        {
                            value: 'Level 1',
                            label: 'Posisi LLM frontier menurut Levels of AGI: "Emerging AGI" (Morris dkk., 2023)'
                        },
                        {
                            value: '<5%',
                            label: 'Skor model reasoning frontier di ARC-AGI-2 (o3 ≈ 3%, Apr 2025); open-source terbaik 24% (Jan 2026)'
                        },
                        {
                            value: '~2027-2028',
                            label: 'Prediksi agresif AGI (Aschenbrenner; kesepakatan 50% Shane Legg: 2028)'
                        },
                        {
                            value: '56+',
                            label: 'Jumlah arsitektur kognitif AGI teridentifikasi dalam survei literatur (Sukhobokov, 2024)'
                        }
                    ]
                },
                {
                    type: 'paragraph',
                    text: 'Peta besar lapangan saat ini bisa diringkas dalam satu kalimat: generalitas perilaku sudah tercapai lewat LLM frontier, tetapi generalitas penalaran belum. Model-model 2024-2026 (o-series, DeepSeek-R1, Gemini, Claude) membuktikan satu mesin bisa menulis kode, menganalisis dokumen, memecahkan soal olimpiade, dan mengoperasikan alat — namun kalah telak ketika dihadapkan pada puzzle novel yang menuntut abstraksi murni (ARC-AGI-2), matematika riset-level (FrontierMath), atau pertanyaan pakar lintas disiplin (Humanity\'s Last Exam). Jurang antara "tampak umum" dan "benar-benar general" inilah medan pertempuran riset hari ini.'
                },
                {
                    type: 'paragraph',
                    text: 'Di sisi arsitektur, terbentuk empat kubu yang sedang berebut fondasi sistem: jalur LLM-as-core yang diperkaya reasoning dan alat (OpenAI, Anthropic, Google DeepMind), jalur world-model prediktif non-generatif yang dipimpin Yann LeCun (JEPA — yang kini dibawa ke startup mandiri setelah ia keluar dari Meta pada akhir 2025), jalur neuro-symbolic hibrida yang terbukti di matematika formal (AlphaGeometry, AlphaProof) dan diwujudkan penuh oleh OpenCog Hyperon, serta jalur cognitive-architecture klasik (SOAR, ACT-R, LIDA) yang kini justru menjadi kosakata desain untuk agen LLM. Bukti empiris menunjukkan setiap kubu memiliki fragmen kebenaran — dan itulah alasan blueprint kita (Modul 7) mengambil bentuk komposit, bukan monolitik.'
                },
                {
                    type: 'papers',
                    ids: [
                        'morris2023',
                        'chollet-arcagi2-2025',
                        'lecun2022',
                        'goertzel2023'
                    ]
                }
            ]
        },
        {
            id: 'beranda-cara-pakai',
            title: 'Cara Memakai Basis Pengetahuan Ini',
            kicker: 'PANDUAN',
            blocks: [
                {
                    type: 'list',
                    items: [
                        'Modul 2 (Definisi & Teori) — akar soal "apa itu AGI": dari Turing Test hingga definisi formal Legg & Hutter, ARC Chollet, dan Levels of AGI DeepMind. Modul ini menentukan target yang kita kejar sebelum memilih senjata.',
                        'Modul 3 (Arsitektur Kognitif) — inti "bagaimana": lima keluarga arsitektur dibedah satu per satu dengan mekanisme internalnya, bukti empiris, dan kegagalannya.',
                        'Modul 4 (Kronologi) — "dari mana ke mana": garis waktu 1950-2026 yang menunjukkan pola gelombang, kejayaan, dan musim dingin; pola ini penting agar tidak terjebak hype.',
                        'Modul 5 (Aktor Global) — "siapa dan di mana": lembaga, tokoh, klaim, dan sumber daya — memetakan lawan, mitra, dan literatur yang harus dipantau.',
                        'Modul 6 (Bukti & Koherensi) — "mengapa": matriks bukti pro-kontra tiap jalur, klaim yang konvergen, dan gap riset eksplisit yang menjadi pekerjaan kita.',
                        'Modul 7 (Blueprint) — muara praktis: arsitektur komposit AGI-G1 yang bisa diprototipe, lengkap dengan rencana evaluasi dan tahapan build.',
                        'Modul 8 (Referensi) — database 40 paper inti dengan pencarian dan filter; setiap chip paper di seluruh modul terhubung ke sini.'
                    ]
                },
                {
                    type: 'paragraph',
                    text: 'Konvensi membaca: istilah teknis dipertahankan dalam bahasa Inggris (world model, alignment, test-time compute) karena itulah kosakata kerja literatur internasional yang akan kita kutip dan diskusikan. Chip berwarna di dalam teks adalah tautan silang ke paper — klik untuk membuka detail, klaim kuncinya, dan tautan sumbernya. Angka dan tanggal disertakan agar setiap klaim dapat diverifikasi ulang; bila ada klaim yang kontroversial atau berbasis laporan media, disebutkan secara eksplisit.'
                }
            ]
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/mod-definisi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "modDefinisi",
    ()=>modDefinisi
]);
const modDefinisi = {
    id: 'definisi',
    label: 'Definisi & Teori',
    short: 'Apa itu AGI: dari Turing Test, universal intelligence, ARC, hingga Levels of AGI',
    tagline: 'Target yang kita kejar harus didefinisikan lebih dulu — lima generasi definisi dan implikasi desainnya',
    color: '#fbbf24',
    sections: [
        {
            id: 'def-genesis',
            title: 'Genesis: Dari "Bisa Berpikir?" ke Uji Operasional',
            kicker: '1950-1957',
            blocks: [
                {
                    type: 'paragraph',
                    text: 'Perdebatan AGI modern sebenarnya adalah kelanjutan langsung dari langkah metodologis Turing pada 1950. Alih-alih tenggelam dalam filosofi "apakah mesin dapat berpikir", Turing mengganti pertanyaan itu dengan uji perilaku yang dapat dijalankan: apakah juri tidak bisa membedakan mesin dari manusia dalam percakapan (Imitation Game). Langkah ini menetapkan dua tradisi yang bertahan hingga kini: tradisi perilaku (kecerdasan dinilai dari performa yang teramati) dan tradisi generality (kecerdasan yang dicari adalah kemampuan menangani apa pun yang bisa ditangani manusia, bukan satu spesialisasi). Turing sendiri sudah antisipatif: ia membantah sembilan keberatan klasik — dari teologis hingga keberatanLady Lovelace tentang kreativitas — dengan argumentasi yang hingga hari ini masih dipakai ulang dalam debat LLM.'
                },
                {
                    type: 'paragraph',
                    text: 'Lima tahun kemudian, proposal Dartmouth (McCarthy, Minsky, Rochester, Shannon, 1955) melahirkan istilah "artificial intelligence" dan menetapkan hipotesis fondasi seluruh lapangan: setiap aspek pembelajaran atau fitur kecerdasan mana pun, pada prinsipnya, dapat disimulasikan sepresisi itu oleh mesin — khususnya lewat program yang belajar. Simulasi ini terwujud lebih cepat dari jadwal: General Problem Solver (Newell, Shaw, Simon, 1957) menunjukkan satu program dengan satu metode umum (means-ends analysis) bisa memecahkan teorema, soal logika, dan puzzle. Dua sisi medali itu — optimisme Dartmouth dan keberhasilan GPS — mengandung benih kesalahan estimasi yang akan berulang: kemampuan memecahkan soal formal ternyata tidak langsung menjangkau kecerdasan dunia nyata yang lentur.'
                },
                {
                    type: 'papers',
                    ids: [
                        'turing1950',
                        'mccarthy1955',
                        'newell1957'
                    ]
                }
            ]
        },
        {
            id: 'def-formal',
            title: 'Definisi Formal: Universal Intelligence dan AIXI',
            kicker: '1997-2007',
            blocks: [
                {
                    type: 'paragraph',
                    text: 'Istilah "artificial general intelligence" pertama kali terdokumentasi pada makalah Mark Gubrud (1997) tentang dampak teknologi nanoperang: AI yang cocokkan atau melampaui kemampuan kognitif manusia di hampir semua bidang yang diinginkan. Definisi awal ini menetapkan tiga komponen yang bertahan sampai sekarang: pembanding (manusia), cakupan (hampir semua bidang), dan sifat pencapaian (menyamai atau melampaui). Komunitas riset kemudian memformalkan definisi ini secara matematis pada dekade berikutnya, terutama melalui kerja Shane Legg dan Marcus Hutter.'
                },
                {
                    type: 'paragraph',
                    text: 'Definisi Legg & Hutter (2007) adalah hasil akhir dari pengumpulan puluhan definisi kecerdasan dan ekstraksi komon mereka: universal intelligence suatu agen π didefinisikan sebagai rata-rata berbobot dari performa agen di seluruh lingkungan yang mungkin, dengan bobot 2^(-K(μ)) — semakin sederhana (panjang program Kolmogorov rendah) suatu lingkungan, semakin tinggi bobotnya. Rumus ini elegan karena tiga alasan: ia mengoperasionalkan "general" (rata-rata lintas lingkungan, bukan satu domain), menghadirkan prinsip Occam sebagai bobot prior, dan terhubung langsung ke agen teoretis AIXI milik Hutter (2005) — agen optimal yang menggabungkan induksi Solomonoff, teori keputusan sekuensial, dan eksplorasi. AIXI tidak dapat dihitung, tetapi berfungsi sebagai batas atas teoretis: setiap arsitektur AGI praktis dapat ditanya "seberapa jauh Anda dari AIXI dalam aspek aspek apa".'
                },
                {
                    type: 'paragraph',
                    text: 'Dua konsekuensi desain penting lahir dari tradisi formal ini. Pertama, kecerdasan adalah properti agen-interaksi — ia hanya bermakna dalam lingkaran persepsi-tindakan terhadap lingkungan, bukan properti pasif pada teks; ini argumen kuat mengapa blueprint kita butuh loop agen dan lingkungan uji, bukan hanya model bahasa. Kedua, karena rata-rata lintas lingkungan mendominasi, sistem yang sangat kuat di domain sempit (misalnya permainan) tidak memindahkan skor universalnya — generalitas harus dibangun secara eksplisit, dan itu yang membuat benchmark novel-task seperti ARC menjadi alat ukur yang lebih jujur daripada rangkaian soal akademik.'
                },
                {
                    type: 'papers',
                    ids: [
                        'gubrud1997',
                        'legg2007',
                        'hutter2005'
                    ]
                }
            ]
        },
        {
            id: 'def-chollet',
            title: 'Kritik Chollet: Kecerdasan sebagai Efisiensi Akuisisi Skill',
            kicker: '2019',
            blocks: [
                {
                    type: 'paragraph',
                    text: 'Chollet (2019) meretakan fondasi dengan satu pembagian tajam: skill-A (keterampilan yang dikuasai pada domain yang dilihat selama pelatihan) versus skill-B (kemampuan menguasai keterampilan baru dengan efisien). Kecerdasan yang kita maksud dengan kata "general" adalah skill-B, bukan skill-A. Implikasinya brutal bagi benchmark klasik: skor tinggi pada tugas yang mirip data pelatihan hanya mengukur kompresi data, bukan kecerdasan. Definisi operasionalnya: kecerdasan adalah laju akuisisi keterampilan baru, memperhitungkan sebelumnya (prior knowledge), pengalaman, dan kesulitan generalisasi — pengukuran di atas rentang tugas yang tidak pernah dilihat.'
                },
                {
                    type: 'paragraph',
                    text: 'Dari definisi ini lahir Abstraction and Reasoning Corpus (ARC): tugas-tugas visual sederhana bagi manusia (poligon, pewarnaan, simetri) tetapi membutuhkan induksi core-knowledge seperti objekness, kesinambungan, dan hubungan sebab-akibat — bukan pengetahuan ensiklopedis. ARC sengaja dirancang agar murah bagi manusia (rata-rata manusia yang teliti bisa 75-85%) namun menyulitkan penghafal: setiap tugas adalah puzzle novel. Sejarahnya memberi dua pelajaran besar bagi tim kita. Pertama, ARC-1 (2019) bertahan hampir tanpa terkalahkan selama lima tahun hingga o3 menembusnya pada akhir 2024 via penggunaan test-time compute yang masif — generalisasi "setengah jalan" bisa dibeli dengan compute, dan definisi benchmark harus terus bergerak (ARC-AGI-2, 2025, menjatuhkan o3 ke sekitar 3%). Kedua, benchmark adalah bagian dari teori: mendesain ukuran adalah tindakan riset sama pentingnya dengan mendesain arsitektur.'
                },
                {
                    type: 'quote',
                    text: 'Intelligence is skill-acquisition efficiency: the efficiency with which an individual can turn their experiences into generalizable programs that address the range of tasks they might encounter.',
                    source: 'F. Chollet, On the Measure of Intelligence (2019)'
                },
                {
                    type: 'papers',
                    ids: [
                        'chollet2019',
                        'chollet-arcagi2-2025'
                    ]
                }
            ]
        },
        {
            id: 'def-levels',
            title: 'Levels of AGI: Standardisasi DeepMind',
            kicker: '2023-2024',
            blocks: [
                {
                    type: 'paragraph',
                    text: 'Kekacauan istilah (setiap lab punya definisi sendiri) dipangkas Google DeepMind melalui kerangka Levels of AGI (Morris dkk., 2023; versi position paper ICML 2024, 350+ sitasi). Kerangkanya memetakan sistem pada dua dimensi: depth performance (emerging → competent → expert → virtuoso → superhuman) dan breadth generality (narrow → general), lalu menumpangkan tangga otonomi L0-L5 (tool → oracle → consultant → agent → collaborator). Hasilnya lugas: sistem frontier hari ini duduk di Level 1 — "Emerging AGI" yang general namun berkemampuan emerging — dengan otonomi rendah (mungkin Level 0-1: alat dan oracle). Kelas "Competent AGI general" (Level 3, setara manusia kompeten di mayoritas tugas) belum ada.'
                },
                {
                    type: 'paragraph',
                    text: 'Bagi tim pengembang, kerangka ini punya tiga fungsi strategis. Pertama, ia adalah bahasa target yang dapat dikontrak: daripada "kapan AGI tercapai", kita bisa bertanya "komponen apa yang menahan kita di Level 1 — performance-nya atau generality-nya atau otonomi-nya". Kedua, ia memisahkan debat kapabilitas dari debat risiko: threshold yang relevan bagi risiko justru otonomi + generality, bukan angka benchmark; sistem Level-1-general dengan otonomi agen penuh sudah butuh tata kelola serius. Ketiga, ia mendefinisikan roadmap pengukuran kita: prototipe akan dievaluasi dengan matriks performa × generality × otonomi yang sama, sehingga kemajuan dapat dilaporkan tanpa retorika. Catatan kritis: kerangka ini dinilai sebagian pihak (termasuk komunitas ARC) masih terlalu murah hati pada Level 1 karena benchmark yang dipakai untuk menilai "emerging" sebagian besar adalah tugas yang mirip data pelatihan.'
                },
                {
                    type: 'papers',
                    ids: [
                        'morris2023',
                        'bubeck2023'
                    ]
                }
            ]
        },
        {
            id: 'def-sintesis',
            title: 'Sintesis Tim: Definisi Kerja AGI untuk Proyek Kita',
            kicker: 'KESIMPULAN MODUL',
            blocks: [
                {
                    type: 'paragraph',
                    text: 'Menyatukan lima generasi definisi, kita menetapkan definisi kerja untuk proyek ini: AGI adalah sistem yang mampu menguasai keterampilan baru pada domain novel dengan efisiensi yang sebanding dengan manusia yang kompeten, diterapkan pada rentang tugas yang mencakup mayoritas pekerjaan kognitif ekonomi, dengan siklus persepsi-tindakan yang menutup (dunia nyata atau simulasi), dan dengan perilaku yang tetap koheren di bawah distribusi yang belum pernah dilihat. Definisi ini sengaja mengambil struktur operasional Legg-Hutter (generalitas lintas lingkungan), inti skill-B Chollet (efisiensi akuisisi), pengukuran dua-arah Morris (performance × generality × otonomi), dan tuntutan siklus agen dari Turing.'
                },
                {
                    type: 'table',
                    headers: [
                        'Sumber definisi',
                        'Kata kunci',
                        'Yang diukur',
                        'Kontribusi ke definisi kerja kita'
                    ],
                    rows: [
                        [
                            'Turing (1950)',
                            'Imitation game',
                            'Perilaku tak terbedakan dari manusia',
                            'Prinsip pengukuran perilaku + siklus agen'
                        ],
                        [
                            'Legg & Hutter (2007)',
                            'Universal intelligence',
                            'Performa rata-rata lintas lingkungan berbobot sederhana',
                            'Generalitas eksplisit lintas domain'
                        ],
                        [
                            'Chollet (2019)',
                            'Skill-acquisition efficiency',
                            'Kecepatan menguasai tugas novel',
                            'Benchmark novel-task (ARC) sebagai ukuran utama'
                        ],
                        [
                            'Morris dkk. (2023)',
                            'Levels of AGI',
                            'Performance × generality × otonomi',
                            'Matriks pelaporan progres + threshold risiko'
                        ],
                        [
                            'Goertzel (2014)',
                            'Real-world orientation',
                            'Generalitas + praktikalitas ekonomi',
                            'Target level "kompeten" pada pekerjaan nyata'
                        ]
                    ]
                },
                {
                    type: 'callout',
                    tone: 'emerald',
                    title: 'Konsekuensi untuk blueprint',
                    text: 'Definisi kerja ini langsung menetapkan komponen minimum arsitektur: (1) world model agar generalisasi ke novel mungkin; (2) memori agar pengalaman dapat dikompres jadi skill; (3) loop agen yang menutup persepsi-tindakan; (4) lapisan evaluasi internal (self-critic) agar koherensi terjaga di luar distribusi. Modul Arsitektur membahas kandidat mekanismenya satu per satu.'
                }
            ]
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/mod-arsitektur.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "modArsitektur",
    ()=>modArsitektur
]);
const modArsitektur = {
    id: 'arsitektur',
    label: 'Arsitektur Kognitif',
    short: 'Bagaimana AGI dibangun: 5 keluarga arsitektur, mekanisme, bukti, dan kegagalannya',
    tagline: 'Lima keluarga desain yang berebut fondasi AGI — dibedah mekanisme internal, bukti empiris, dan titik patahnya',
    color: '#34d399',
    sections: [
        {
            id: 'arch-intro',
            title: 'Peta Lima Keluarga Arsitektur',
            kicker: 'PENDEKATAN',
            blocks: [
                {
                    type: 'paragraph',
                    text: 'Survei literatur mengidentifikasi lebih dari 56 arsitektur kognitif untuk AGI (Sukhobokov, 2024), namun semuanya dapat dipahami sebagai variasi atau kombinasi dari lima keluarga besar. Kelima keluarga ini tidak sekadar "pilihan teknologi" — masing-masing berakar pada teori tentang apa inti kecerdasan: manipulasi simbol (simbolik), kompresi statistik skala besar (koneksionis), prediksi dunia (world-model), integrasi neural + penalaran formal (neuro-symbolic), dan akuisisi pola bahasa yang diperkaya RL (LLM-as-core). Memahami mekanisme internal, bukti empiris, dan titik patah masing-masing adalah prasyarat sebelum menyusun blueprint komposit di Modul 7.'
                },
                {
                    type: 'table',
                    headers: [
                        'Keluarga',
                        'Inti teori kecerdasan',
                        'Perwakilan',
                        'Status bukti 2026'
                    ],
                    rows: [
                        [
                            '1. Simbolik klasik',
                            'Manipulasi simbol + pencarian',
                            'GPS, SOAR, ACT-R, LIDA',
                            'Kaya secara teori, lemah secara skalabilitas'
                        ],
                        [
                            '2. Koneksionis/scaling',
                            'Kompresi statistik + compute',
                            'GPT-3/4, GATO, scaling laws',
                            'Generalitas perilaku terbukti; penalaran novel terbatas'
                        ],
                        [
                            '3. World model (JEPA)',
                            'Prediksi representasi dunia',
                            'Ha & Schmidhuber, LeCun H-JEPA, V-JEPA 2',
                            'Bukti persepsi/planing awal; belum sistem penuh'
                        ],
                        [
                            '4. Neuro-symbolic',
                            'Neural + penalaran formal',
                            'AlphaGeometry, AlphaProof, OpenCog Hyperon',
                            'Bukti dominan di matematika; belum general'
                        ],
                        [
                            '5. LLM-as-core + RL',
                            'Akuisisi pola + RL reasoning',
                            'o-series, DeepSeek-R1, agen alat',
                            'Frontrunner praktis; gap di abstraksi novel'
                        ]
                    ]
                }
            ]
        },
        {
            id: 'arch-simbolik',
            title: 'Keluarga 1 — Simbolik Klasik: SOAR, ACT-R, LIDA',
            kicker: 'GEL. 1',
            blocks: [
                {
                    type: 'paragraph',
                    text: 'Akar teoretis keluarga ini adalah Physical Symbol System Hypothesis Newell & Simon (1976): sistem fisik yang memanipulasi simbol memiliki kapasitas yang diperlukan dan cukup untuk bertindak cerdas. SOAR (Laird, Newell, Rosenbloom, 1987) mewujudkannya sebagai mesin produksi dengan goal stack: setiap tujuan dipecah menjadi sub-tujuan, impasse memicu pembuatan subgoal, dan chunking mengkompres pengalaman menjadi aturan baru — mekanisme belajar yang secara struktural mirip apa yang kini kita sebut "belajar dari pengalaman". ACT-R (Anderson & Lebiere, 1998) lebih jauh meniru psikologi kognitif eksperimental: modul deklaratif (fakta dengan aktivasi berbasis frekuensi dan kebaruan), modul prosedural (aturan produksi), dan modul perceptual-motor, diikat dengan buffer bawaan yang meniru batas memori kerja manusia. Keduanya terus dikembangkan hingga kini dan telah mencapai ratusan model perilaku manusia yang cocok dengan data eksperimen.'
                },
                {
                    type: 'paragraph',
                    text: 'LIDA (Franklin dkk., 2006) membawa masuk Global Workspace Theory Baars (1988): kognisi berjalan dalam siklus ~100 ms di mana banyak proses spesialis bersaing masuk ke "panggung" workspace global, dan konten yang menang disiarkan ke seluruh sistem — cetak biru yang secara konseptual mendahului mekanisme attention pada Transformer. Kontribusi kekal keluarga simbolik bagi desain AGI adalah struktur: bagaimana memori deklaratif vs prosedural dipisahkan, bagaimana goal di-manage, bagaimana attention dialokasikan, dan bagaimana metakognisi (berpikir tentang tujuan sendiri) diimplementasikan. Anderson & Lebiere bahkan merumuskan "Newell Test" — daftar 12 kriteria yang harus dipenuhi teori pikiran lengkap, dari perilaku fleksibel hingga belajar arithmetika — yang hingga kini menjadi rubrik penilaian arsitektur AGI yang jujur.'
                },
                {
                    type: 'paragraph',
                    text: 'Titik patah keluarga ini bukan pada strukturnya melainkan pada sumber pengetahuannya: semua konsep harus di-knowledge-engineer secara manual, sehingga skalabilitas ke kekayaan dunia nyata gagal total. The Bitter Lesson Sutton (2019) merumuskan mengapa generasi pertama AI simbolik kalah: metode yang bersandar pada pengetahuan manusia yang dihand-craft terus-menerus dikalahkan oleh metode yang mengeksploitasi compute. Namun kekalahan itu mengalahkan sistemnya, bukan idenya — ketika LLM modern menghadapi masalah halusinasi dan koherensi, struktur yang dirancang keluarga simbolik (verifikasi, goal stack, memori modular) kembali diangkat sebagai komponen yang hilang. Bagi blueprint kita, keluarga ini menyumbang kerangka organisasi, bukan mesin pembelajar.'
                },
                {
                    type: 'papers',
                    ids: [
                        'laird1987',
                        'anderson1998',
                        'baars1988',
                        'franklin2006',
                        'sutton2019'
                    ]
                }
            ]
        },
        {
            id: 'arch-koneksionis',
            title: 'Keluarga 2 — Koneksionis & Scaling: Dari Backprop ke GATO',
            kicker: 'GEL. 2',
            blocks: [
                {
                    type: 'paragraph',
                    text: 'Keluarga ini berangkat dari premis berlawanan: kecerdasan muncul dari pembelajaran statistik atas data skala besar, tanpa pengetahuan yang dihand-craft. Mesin dasarnya adalah jaringan saraf yang dilatih backpropagation (Rumelhart, Hinton, Williams, 1986) — algoritma yang sederhana namun skala tanpa batas. Tiga lompatan menentukan jalannya: AlexNet (2012) membuktikan deep learning menang di persepsi; Transformer (Vaswani dkk., 2017) memberi substrat yang memanfaatkan attention secara paralel — secara ironi, realisasi komputasional dari ide global workspace; dan GPT-3 (Brown dkk., 2020) membuktikan bahwa penskalaan parameter hingga 175B menghadirkan in-context learning — model yang sama menyelesaikan terjemahan, tanya-jawab, dan aritmetika tanpa dilatih ulang. Scaling laws (Kaplan dkk., 2020; Chinchilla, Hoffmann dkk., 2022) mengubah intuisi itu menjadi hukum empiris yang dapat diproyeksikan: loss turun pangkat terhadap compute, data, dan parameter, dengan rasio optimal yang terukur.'
                },
                {
                    type: 'paragraph',
                    text: 'Bukti generalitas paling eksplisit dari keluarga ini adalah GATO (Reed dkk., 2022): satu transformer dengan bobot sama yang mengeksekusi 604 tugas — captioning, dialog, memainkan ATARI, mengendalikan lengan robot — dengan kualitas yang banyak di antaranya kompetitif terhadap spesialis. Klaim DeepMind pada saat itu berani namun akurat secara metodologis: "generalitas perilaku" sekarang hanyalah persoalan skala. AlphaZero (Silver dkk., 2018) menambahkan sisi lain bukti: pada domain dengan aturan jelas dan feedback yang dapat dihitung, self-play tabula-rasa mencapai superhuman tanpa satu baris pengetahuan manusia. Kombinasi keduanya menetapkan jangkauan maksimum keluarga koneksionis: luar biasa di domain tertutup yang kaya data atau kaya reward, rapuh di domain terbuka yang menuntut penalaran baru.'
                },
                {
                    type: 'paragraph',
                    text: 'Titik patahnya kini terdokumentasi baik. Pertama, kompresi ≠ penalaran: LLM menghadirkan pola penalaran dari data, tetapi Sparks of AGI (Bubeck dkk., 2023) menunjukkan kegagalan sistematis ketika koherensi internal lintas langkah dibutuhkan. Kedua, emergensi berlebihan dipertanyakan: Schaeffer dkk. (NeurIPS 2023 Best Paper) menunjukkan banyak "kemampuan emergen" adalah artefak metrik — lompatan lahir dari cara mengukur, bukan dari arsitektur. Ketiga, data hampir habis: hukum Chinchilla menuntut token lebih banyak daripada teks berkualitas yang tersisa di internet, memaksa transisi ke data sintetis dan RL. Kegagalan-kegagalan ini bukan penguburan keluarga — mereka menetapkan batas dan menjadi alasan munculnya keluarga 3, 4, dan 5.'
                },
                {
                    type: 'papers',
                    ids: [
                        'rumelhart1986',
                        'vaswani2017',
                        'brown2020',
                        'kaplan2020',
                        'hoffmann2022',
                        'reed2022',
                        'silver2018',
                        'bubeck2023',
                        'schaeffer2023'
                    ]
                }
            ]
        },
        {
            id: 'arch-jepa',
            title: 'Keluarga 3 — World Model & JEPA: Belajar Dunia lewat Prediksi',
            kicker: 'GEL. 3',
            blocks: [
                {
                    type: 'paragraph',
                    text: 'Keluarga world-model berakar pada argumen kognisi: kecerdasan adalah kemampuan memprediksi konsekuensi tindakan di dunia, dan prediksi harus terjadi di ruang representasi abstrak, bukan di piksel atau token mentah. Preseden klasiknya World Models (Ha & Schmidhuber, 2018): agen belajar VAE + model dunia rekuren, lalu dilatih sepenuhnya di dalam "mimpi" modelnya — dan strategi itu transfer ke dunia nyata. Versi yang paling terartikulasi adalah position paper LeCun (2022): A Path Towards Autonomous Machine Intelligence. LeCun menyusun konfigurasi H-JEPA lengkap — modul perceptron, world model prediktif berlapis (level abstraksi dan horizon waktu), cost module (intrinsik + kritik), short-term memory, actor, dan konfigurator — dengan mesin pembelajar Joint-Embedding Predictive Architecture (JEPA) dan energy-based models. Argumen sentralnya: model generatif autoregresif pada token membakar kapasitas untuk memprediksi detail yang tak dapat diprediksi, sedangkan JEPA memprediksi di ruang embedding dengan regularisasi varians — sistem belajar "apa yang penting diprediksi" alih-alih menghafal tekstur dunia.'
                },
                {
                    type: 'paragraph',
                    text: 'Rantai bukti empirisnya cepat: I-JEPA (Assran dkk., CVPR 2024) membuktikan prediksi representasi citra menghasilkan fitur semantik tanpa augmentasi; V-JEPA (Bardes dkk., 2024) memperluas ke video dan memahami dinamika fisik; V-JEPA 2 (2025, 1.2B parameter, dilatih di 1 juta jam video) plus varian action-conditioned V-JEPA 2-AC memungkinkan robot memplanning pengambilan objek zero-shot di laboratorium yang belum pernah dilihat. Pada Juni 2025 LeCun merancang roadmap AMI (Advanced Machine Intelligence) berbasis keluarga ini; dan pada November 2025 ia mengumumkan keluar dari Meta untuk mendirikan startup world-model dengan pendanaan yang dilaporkan di kisaran miliaran dolar — sinyal pasar bahwa jalur ini dianggap seri, bukan eksotis.'
                },
                {
                    type: 'paragraph',
                    text: 'Titik patah: JEPA menyelesaikan persepsi dan prediksi, tetapi belum membuktikan diri pada penalaran diskrit, bahasa, dan akuisisi keterampilan bertingkat — persis area tempat LLM dan RL unggul. Kritik menerima bahwa prediksi abstrak baik untuk intuisi fisika, namun menantang klaim bahwa penalaran akan "muncul" dari world model; belum ada bukti JEPA menyelesaikan tugas ala ARC di mana abstraksi kombinatorial dibutuhkan. Bagi blueprint kita, keluarga ini menjadi penyedia dua komponen esensial: encoder persepsi yang semantic dan world model untuk planning — sementara inti penalaran dan bahasa tetap dipinjam dari keluarga lain. Ini keputusan komposit, bukan keputusan loyalitas.'
                },
                {
                    type: 'papers',
                    ids: [
                        'ha2018',
                        'lecun2022',
                        'assran2024',
                        'bardes2024',
                        'v-jepa2-2025'
                    ]
                }
            ]
        },
        {
            id: 'arch-neurosymbolic',
            title: 'Keluarga 4 — Neuro-Symbolic: AlphaGeometry, AlphaProof, OpenCog',
            kicker: 'GEL. 4',
            blocks: [
                {
                    type: 'paragraph',
                    text: 'Keluarga ini mengambil jalan tengah yang secara desain paling sering memenangkan kompetisi: neural network sebagai mesin intuisi (menghasilkan kandidat dengan cepat), sistem simbolik sebagai mesin verifikasi (menjamin kebenaran). AlphaGeometry (Trinh dkk., Nature 2024) adalah demonstrasi terbaiknya: LLM neural menghasilkan konstruk geometri tambahan, mesin deduksi simbolik (DD+AR) memeriksa dan menyusun bukti formal; dilatih dengan 100 juta bukti sintetis tanpa demonstrasi manusia, sistem menyelesaikan 25/30 soal geometri olimpiade — melampaui metode terbaik sebelumnya (18/30) dan menyamai rata-rata medal emas. AlphaProof (DeepMind; paper Nature, November 2025) melangkah lebih jauh: agen bergaya AlphaZero yang belajar menemukan bukti di bahasa formal Lean lewat RL atas jutaan soal terautoformalisasi; bersama AlphaGeometry 2, ia mencapai standar medali perak IMO 2024 (34/42) — level yang dua tahun sebelumnya dianggap jauh.'
                },
                {
                    type: 'paragraph',
                    text: 'Di ujung ambisi penuh, OpenCog Hyperon (Goertzel dkk., 2023) adalah arsitektur hybrid yang menyatukan semuanya secara eksplisit: MeTTa sebagai bahasa metagraph yang memprogram dirinya sendiri, Distributed AtomSpace sebagai memori pengetahuan atomistik skala miliaran, PLN (Probabilistic Logic Networks) untuk penalaran berbasis ketidakpastian, ECAN untuk alokasi attention berbasis ekonomi, serta proses kognitif (pattern mining, program synthesis evolusioner, RL) yang berjalan paralel di atas substrate yang sama — dengan LLM diposisikan sebagai salah satu "otak" proses, bukan pusat satu-satunya. Roadmap Hyperon menyatakan: bila stack produksi tercapai akhir 2025, human-level AGI "dalam beberapa tahun" adalah target yang mereka pertaruhkan. Klaim ini belum teruji di benchmark besar, tetapi arsitekturnya adalah referensi paling lengkap tentang bagaimana komponen-komponen kognitif bisa diikat dalam satu lingkaran belajar.'
                },
                {
                    type: 'paragraph',
                    text: 'Titik patah neuro-symbolic ada di dua tempat: penerjemahan (grounding problem — memindahkan masalah dunia terbuka ke representasi formal yang rapi tetap pekerjaan yang belum terotomasi) dan rekayasa (AlphaGeometry/AlphaProof menang di domain yang bisa diformalkan; di luar matematika, verifier formal yang memadai langka). Marcus (2020) merangkum kasusnya: LLM murni robustness-nya terbatas, dan hybrid adalah syarat; tetapi yang belum ia selesaikan adalah bagaimana hybrid itu belajar end-to-end tanpa engineering berat per domain. Untuk blueprint kita, keluarga ini menyumbang komponen yang tidak bisa dinegosiasikan: verifier simbolik dan mekanisme memori pengetahuan terstruktur — diterapkan pada domain yang memungkinkan formalisasi, dengan jalur bertahap ke domain yang lebih terbuka.'
                },
                {
                    type: 'papers',
                    ids: [
                        'trinh2024',
                        'alphaproof2025',
                        'goertzel2023',
                        'marcus2020'
                    ]
                }
            ]
        },
        {
            id: 'arch-llm',
            title: 'Keluarga 5 — LLM-as-Core + RL Reasoning: o-series dan R1',
            kicker: 'GEL. 5',
            blocks: [
                {
                    type: 'paragraph',
                    text: 'Keluarga kelima adalah evolusi langsung keluarga koneksionis dengan dua tambahan strategis: reinforcement learning untuk penalaran dan tool-use untuk aksi. OpenAI o1 (September 2024) mendemonstrasikan hukum penskalaan kedua: test-time compute — membiarkan model "berpikir" lebih lama di waktu inferensi via chain-of-thought yang dilatih RL meningkatkan akurasi secara monoton pada soal penalaran, komplementer terhadap scaling parameter. DeepSeek-R1 (Januari 2025; dipublikasikan di Nature, September 2025) memperlihatkan mekanismenya lebih mentah: RL murni dengan GRPO tanpa supervised fine-tuning manusia menginduksi perilaku refleksi, verifikasi diri, dan "aha moment" — chain-of-thought panjang tumbuh sebagai solusi optimal masalah yang diberikan reward kebenaran. Artinya: proses penalaran dapat di-tumbuhkan dari reward yang benar, bukan hanya disalin dari data manusia — temuan yang mengubah peta jalur AGI secara permanen.'
                },
                {
                    type: 'paragraph',
                    text: 'Dalam arsitektur agennya, keluarga ini menyusun LLM sebagai inti keputusan dikelilingi memori eksternal (vektor database, file), alat (kode interpreter, pencarian, API), dan loop perencanaan-eksekusi-refleksi — praktis merupakan "cognitive architecture" versi engineering yang mengadopsi struktur SOAR/ACT-R secara ad-hoc. Hasil benchmark 2024-2026 menunjukkan jangkauannya: dokumen miliaran token, kode produksi, soal olimpiade dalam modul teks, hingga ~25% FrontierMath (o3) yang dua tahun sebelumnya 0%. Namun laporan ARC Prize (April 2025) mengingatkan batasnya: o3 dengan compute masif mencapai 87.5% di ARC-AGI-1 (low-efficiency mode, biaya ribuan dolar per tugas) tetapi hanya ~3% di ARC-AGI-2 — ketika puzzle menuntut abstraksi yang tidak bisa dibeli dengan pencarian brute-force, sistem gagal. Kegagalan persisten di benchmark novel-task inilah bukti terkuat bahwa LLM-as-core saja belum cukup.'
                },
                {
                    type: 'paragraph',
                    text: 'Titik patah kelima: (1) ground truth — RL butuh verifier yang benar, dan di domain terbuka verifier sulit; (2) world model implisit yang rapuh — model menalar dari pola bahasa, bukan model fisika/kausal yang stabil; (3) memori persisten yang belum menyelesaikan problem konsolidasi; (4) otonomi panjang masih rendah — degradasi koherensi pada tugas berminggu-minggu. Sebaliknya, keluarga ini memiliki keunggulan yang tidak dimiliki lainnya: infrastruktur terbaik, iterasi tercepat, dan jalur pengukuran paling transparan. Dari semua keluarga, inilah yang paling dekat dengan "able to be deployed today" — dan karena itu blueprint kita menjadikannya tulang punggung integrasi, bukan bukti bahwa ia jawaban final.'
                },
                {
                    type: 'papers',
                    ids: [
                        'openai-o1-2024',
                        'deepseek-r1-2025',
                        'chollet-arcagi2-2025',
                        'glazer2024',
                        'hle2025'
                    ]
                }
            ]
        },
        {
            id: 'arch-sintesis',
            title: 'Sintesis: Apa yang Setiap Keluarga Sum bangkan ke Blueprint',
            kicker: 'KESIMPULAN MODUL',
            blocks: [
                {
                    type: 'paragraph',
                    text: 'Lima keluarga bukan lima kandidat untuk dipilih satu — setelah melihat bukti, pola yang muncul adalah pembagian kerja fungsional. Keluarga simbolik menyumbang struktur organisasi (goal, memori modular, metakognisi, rubrik penilaian Newell). Keluarga koneksionis menyumbang substrat pembelajaran dan bahasa — satu-satunya teknologi yang pernah mencapai generalitas perilaku. Keluarga world-model menyumbang persepsi semantik dan mesin prediksi untuk planning. Keluarga neuro-symbolic menyumbang verifier dan memori pengetahuan formal. Keluarga LLM-as-core menyumbang loop integrasi, penalaran yang di-tumbuhkan RL, dan infrastruktur penerapan. Setiap komponen blueprint di Modul 7 akan dicantumkan asal keluarganya secara eksplisit — desain yang tidak dapat menyebut asal buktinya dianggap spekulasi dan ditolak.'
                },
                {
                    type: 'callout',
                    tone: 'teal',
                    title: 'Klaim konvergen lintas kubu',
                    text: 'Tiga properti yang semua keluarga akui dibutuhkan: (1) memori yang konsolidasi pengalaman menjadi keterampilan; (2) model dunia yang menopang generalisasi novel; (3) mekanisme verifikasi yang terpisah dari generator. Perbedaan kubu hanya pada urutan prioritas dan sarana implementasinya — inilah basis terkuat untuk desain komposit.'
                }
            ]
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/mod-kronologi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KRONOLOGI_EVENTS",
    ()=>KRONOLOGI_EVENTS,
    "modKronologi",
    ()=>modKronologi
]);
const KRONOLOGI_EVENTS = [
    {
        year: '1950',
        era: 'Fondasi',
        title: 'Turing Test',
        text: 'Turing mengganti pertanyaan metafisik "bisa berpikir?" dengan uji operasional perilaku — tradisi pengukuran yang dipakai semua benchmark hingga kini.',
        tag: 'fondasi',
        papers: [
            'turing1950'
        ]
    },
    {
        year: '1955-56',
        era: 'Fondasi',
        title: 'Dartmouth: AI diberi nama',
        text: 'McCarthy dkk. merumuskan hipotesis fondasi dan istilah artificial intelligence; ramalan 2 bulan kerja musim panas untuk "aspek signifikan" kecerdasan.',
        tag: 'fondasi',
        papers: [
            'mccarthy1955'
        ]
    },
    {
        year: '1957-58',
        era: 'Simbolik',
        title: 'GPS & Perceptron',
        text: 'General Problem Solver membuktikan penalaran umum di domain formal; Rosenblatt memperkenalkan Perceptron — dua akar gelombang yang akan bersaing 60 tahun.',
        tag: 'simbolik',
        papers: [
            'newell1957'
        ]
    },
    {
        year: '1969-80',
        era: 'Simbolik',
        title: 'Dominasi simbolik & musim dingin pertama',
        text: 'Minsky-Papert membuktikan batas perceptron satu lapis; pendanaan AI terkontraksi dua kali (1974-80, 1987-93) setelah janji melampaui bukti — pola yang wajib dihafal tim kita.',
        tag: 'simbolik'
    },
    {
        year: '1986-88',
        era: 'Koneksionis',
        title: 'Backprop & GWT',
        text: 'Rumelhart-Hinton-Williams membuka pelatihan jaringan dalam; Baars merumuskan Global Workspace Theory — dua langkah yang akhirnya bertemu di Transformer.',
        tag: 'koneksi',
        papers: [
            'rumelhart1986',
            'baars1988'
        ]
    },
    {
        year: '1987-2006',
        era: 'Simbolik',
        title: 'Era arsitektur kognitif',
        text: 'SOAR (1987), ACT (1990-an), dan LIDA (2006) menyusun "teori pikiran lengkap": memori deklaratif/prosedural, goal stack, chunking, siklus workspace. Struktur masih hidup; mesinnya kalah skala.',
        tag: 'simbolik',
        papers: [
            'laird1987',
            'anderson1998',
            'franklin2006'
        ]
    },
    {
        year: '1997',
        era: 'Simbolik',
        title: 'Deep Blue & istilah AGI',
        text: 'Kasparov dikalahkan (khusus, bukan general); Gubrud pertama kali memakai istilah artificial general intelligence dalam konteks kebijakan.',
        tag: 'fondasi',
        papers: [
            'gubrud1997'
        ]
    },
    {
        year: '2005-2009',
        era: 'Fondasi',
        title: 'Definisi formal AGI',
        text: 'Hutter terbitkan AIXI (2005); Legg & Hutter merumuskan universal intelligence (2007); konferensi tahunan AGI dimulai (2008) — lapangan "AGI" menjadi sub-disiplin.',
        tag: 'fondasi',
        papers: [
            'hutter2005',
            'legg2007'
        ]
    },
    {
        year: '2012-2016',
        era: 'Koneksionis',
        title: 'Deep learning menang',
        text: 'AlexNet (2012) memicu revolusi persepsi; AlphaGo (2016) mengalahkan Lee Sedol — pertama kalinya deep RL + search mengalahkan intuisi manusia top di domain sulit.',
        tag: 'koneksi',
        papers: [
            'silver2016'
        ]
    },
    {
        year: '2017-2018',
        era: 'Koneksionis',
        title: 'Transformer & World Models',
        text: 'Attention Is All You Need melahirkan substrat universal; Ha & Schmidhuber menunjukkan agen belajar di dunia mimpi — dua jalur yang kini bersaing sebagai fondasi AGI.',
        tag: 'koneksi',
        papers: [
            'vaswani2017',
            'ha2018'
        ]
    },
    {
        year: '2019',
        era: 'Fondasi',
        title: 'ARC: mengukur skill-B',
        text: 'Chollet menerbitkan On the Measure of Intelligence + ARC — benchmark novel-task yang akan menjadi ukuran paling jujur jarak menuju generalisasi.',
        tag: 'fondasi',
        papers: [
            'chollet2019'
        ]
    },
    {
        year: '2020-2022',
        era: 'Koneksionis',
        title: 'Scaling laws & GATO',
        text: 'GPT-3 (few-shot), Kaplan scaling laws, Chinchilla (rasio optimal); GATO menjalankan 604 tugas dengan satu bobot — generalitas perilaku resmi menjadi "persoalan skala".',
        tag: 'koneksi',
        papers: [
            'brown2020',
            'kaplan2020',
            'hoffmann2022',
            'reed2022'
        ]
    },
    {
        year: '2022',
        era: 'World model',
        title: 'LeCun: Path Towards AMI',
        text: 'Position paper LeCun merancang H-JEPA lengkap dan menyatakan LLM autoregresif bukan jalur AGI — deklarasi perang terbuka kubu world-model.',
        tag: 'hibrida',
        papers: [
            'lecun2022'
        ]
    },
    {
        year: '2023',
        era: 'Frontier',
        title: 'GPT-4, Sparks, Levels of AGI',
        text: 'GPT-4 memicu debat "sparks of AGI"; DeepMind menerbitkan kerangka Levels of AGI (LLM frontier = Level 1 Emerging, otonomi rendah); Butlin dkk. menerjemahkan teori kesadaran jadi indikator arsitektur.',
        tag: 'frontier',
        papers: [
            'bubeck2023',
            'morris2023',
            'butlin2023'
        ]
    },
    {
        year: '2024',
        era: 'Frontier',
        title: 'I-JEPA, AlphaGeometry, AlphaProof, o1',
        text: 'Tahun bukti lintas-kubu: JEPA terbukti di citra; AlphaGeometry (Nature) menang 25/30 geometri IMO; AlphaProof+AG2 meraih medali perak IMO; o1 memperkenalkan test-time compute scaling.',
        tag: 'hibrida',
        papers: [
            'assran2024',
            'trinh2024',
            'openai-o1-2024'
        ]
    },
    {
        year: '2025',
        era: 'Frontier',
        title: 'R1, ARC-AGI-2, V-JEPA 2, LeCun keluar Meta',
        text: 'DeepSeek-R1 (Nature) membuktikan reasoning tumbuh dari RL murni; ARC-AGI-2 menjatuhkan o3 ke ~3% (generalisasi novel belum terpecahkan); V-JEPA 2 memungkinkan planning robotik zero-shot; LeCun mengumumkan pendirian startup world-model (pendanaan dilaporkan ~USD 1 miliar).',
        tag: 'frontier',
        papers: [
            'deepseek-r1-2025',
            'chollet-arcagi2-2025',
            'v-jepa2-2025'
        ]
    },
    {
        year: '2026',
        era: 'Frontier',
        title: 'Konsolidasi & kontes benchmark baru',
        text: 'ARC Prize 2025 report (Jan 2026): open-source terbaik 24% di ARC-AGI-2; AlphaProof terbit di Nature (formal reasoning via RL); ARC-AGI-3 interaktif (agen eksplorasi game) mulai diujikan; FrontierMath & HLE menjadi ukuran standar keahlian pakar.',
        tag: 'frontier',
        papers: [
            'alphaproof2025',
            'glazer2024',
            'hle2025'
        ]
    }
];
const modKronologi = {
    id: 'kronologi',
    label: 'Kronologi',
    short: 'Dari mana ke mana: garis waktu 1950-2026 dan pola gelombangnya',
    tagline: 'Tujuh dekade dalam satu garis: pola gelombang, kejayaan, musim dingin, dan titik belok menuju AGI',
    color: '#a78bfa',
    sections: [
        {
            id: 'kron-intro',
            title: 'Membaca Sejarah sebagai Data Desain',
            kicker: 'PENDAHULUAN',
            blocks: [
                {
                    type: 'paragraph',
                    text: 'Sejarah AI bukan sekadar kronologi — ia adalah dataset tentang pola kegagalan dan keberhasilan estimasi. Tiga pola besar yang terlihat dari garis waktu di bawah: (1) gelombang bergantian simbolik-koneksionis dengan musim dingin di antaranya; gelombang selalu runtuh ketika janji memimpin bukti, bukan ketika idenya habis; (2) lompatan besar selalu datang dari kombinasi, bukan keluarga tunggal — AlphaGo adalah deep learning + tree search; AlphaProof adalah neural + formal verifier + RL; (3) benchmark mendahului kemampuan: ARC (2019) lahir lima tahun sebelum sistem yang bisa menantangnya. Bagi tim pengembang, ketiganya adalah heuristik manajemen risiko: jangan berjanji melebihi bukti, rancang komposit, dan investasi pada pengukuran adalah investasi riset sesungguhnya.'
                },
                {
                    type: 'paragraph',
                    text: 'Garis waktu di bawah disusun dengan tanda warna per keluarga: fondasi (definisi/pengukuran), simbolik, koneksionis, world-model/hibrida, dan frontier. Klik chip paper untuk membuka detail sumbernya di panel referensi.'
                }
            ]
        },
        {
            id: 'kron-timeline',
            title: 'Garis Waktu Interaktif 1950-2026',
            kicker: 'TIMELINE',
            blocks: [
                {
                    type: 'paragraph',
                    text: 'TIMELINE_COMPONENT'
                }
            ]
        },
        {
            id: 'kron-pola',
            title: 'Empat Pelajaran Pola dari 76 Tahun',
            kicker: 'SINTESIS MODUL',
            blocks: [
                {
                    type: 'list',
                    ordered: true,
                    items: [
                        'Musim dingin datang dari kesenjangan janji-bukti, bukan dari habisnya ide. GPS (1957) dan Expert Systems (1980-an) runtuh karena ekspektasi melebihi generalitas nyata. Implikasi: definisi kerja dan benchmark kita (Modul 2) harus lebih ketat daripada marketing pasaran.',
                        'Generalitas "perilaku" selalu mendahului generalitas "penalaran". GATO 2022 sudah general secara perilaku; ARC-AGI-2 2025 membuktikan penalaran novel belum. Jangan menilai sistem dari demo lintas-domain; nilai dari transfer ke tugas yang benar-benar baru.',
                        'Kombinasi mengalahkan kemurnian. Setiap tonggak superhuman (AlphaGo, AlphaProof) adalah komposit. Implikasi desain: blueprint komposit bukan kompromi — ia pola empiris yang menang.',
                        'Era sekarang adalah pertama kali tiga hal bertemu: generalitas perilaku (LLM), mesin verifikasi (formal methods), dan hukum pembelajaran dari reward (RL reasoning). Tidak ada jaminan AGI dekat — tetapi bila ia datang, komposisi ketiganya adalah jalur yang paling didukung bukti.'
                    ]
                }
            ]
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/mod-aktor.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ORGS",
    ()=>ORGS,
    "PEOPLE",
    ()=>PEOPLE,
    "modAktor",
    ()=>modAktor
]);
const ORGS = [
    {
        name: 'Google DeepMind',
        hq: 'London, Inggris (+ Mountain View)',
        people: 'Demis Hassabis (CEO), Shane Legg (co-founder, chief AGI scientist), David Silver, Francois Chollet (sampai 2024, lanjut ARC Prize)',
        focus: 'Levels of AGI (framework resmi), AlphaProof/AlphaGeometry (neuro-symbolic), Gemini (LLM frontier), world models, tim AGI Safety & Alignment khusus',
        stance: 'Definisi operasional + jalur komposit; paling produktif mempublikasi kerangka pengukuran',
        scale: 'Risert AI terbesar dunia; integrasi penuh ke Google Compute infra',
        color: '#34d399'
    },
    {
        name: 'OpenAI',
        hq: 'San Francisco, AS',
        people: 'Sam Altman (CEO), Jakub Pachocki (chief scientist), Noam Brown (reasoning), Mark Chen; misi tertulis: AGI yang bermanfaat bagi seluruh umat manusia',
        focus: 'Jalur LLM-as-core: GPT-4/5.x, o-series (test-time compute RL), agen alat; framework preparedness untuk risiko kapabilitas',
        stance: 'Scaling + RL reasoning adalah jalur AGI; benchmark internal bertingkat menuju "AGI yang aman"',
        scale: 'Komputasi pelatihan terbesar di industri (Stargate & mitra Azure)',
        color: '#f59e0b'
    },
    {
        name: 'Anthropic',
        hq: 'San Francisco, AS',
        people: 'Dario Amodei (CEO, mantan VP Research OpenAI), Jared Kaplan (scaling laws), Paul Christiano (alumni alignment; era terdahulu), tim Alignment Science',
        focus: 'Claude (LLM frontier), Constitutional AI & interpretability, riset alignment teknis terstruktur (jaringan riset, RSP)',
        stance: 'AGI mungkin 2026-2030; risiko katasrofik serius; alignment harus mendahului kapabilitas',
        scale: 'Frontier lab dengan komitmen keselamatan paling terdokumentasi',
        color: '#f4a261'
    },
    {
        name: 'Meta AI (FAIR) → komunitas JEPA',
        hq: 'New York/Menlo Park, AS',
        people: 'Yann LeCun (keluar akhir 2025 untuk startup world-model), tim V-JEPA/FAIR, Joelle Pineau (mantan VP research)',
        focus: 'V-JEPA 1/2, world model video, Llama (open weights), energy-based models; roadmap Advanced Machine Intelligence',
        stance: 'LLM autoregresif bukan jalur AGI; world model prediktif non-generatif adalah jalurnya',
        scale: 'Risert terbuka terbesar (open weights); LeCun membawa jalur JEPA ke perusahaan baru bermodal besar',
        color: '#60a5fa'
    },
    {
        name: 'OpenCog / SingularityNET (TrueAGI)',
        hq: 'Amsterdam + komunitas global',
        people: 'Ben Goertzel (CEO), David Hanson, tim Hyperon MeTTa/AtomSpace',
        focus: 'OpenCog Hyperon: MeTTa, Distributed AtomSpace, PLN, ECAN — arsitektur hybrid penuh untuk AGI; jaringan AI terdesentralisasi',
        stance: 'Jalur hybrid eksplisit; roadmap human-level AGI bila stack produksi tercapai — paling transparan soal arsitektur, paling agresif soal timeline',
        scale: 'Komunitas riset open-source terlama di AGI (sejak 2008)',
        color: '#a78bfa'
    },
    {
        name: 'DeepSeek (High-Flyer)',
        hq: 'Hangzhou, Tiongkok',
        people: 'Liang Wenfeng (pendiri), tim riset R1',
        focus: 'DeepSeek-R1 (RL murni → reasoning), V3 (MoE efisien); publikasi terbuka model + metode',
        stance: 'Bukti bahwa reasoning bisa diinduksi RL tanpa distilasi manusia — menyebarluaskan jalur o-series',
        scale: 'Frontier lab yang mengguncang asumsi biaya (efficiency frontier)',
        color: '#38bdf8'
    },
    {
        name: 'ARC Prize Foundation',
        hq: 'New York + komunitas global',
        people: 'Francois Chollet (pembuat ARC), Mike Knoop',
        focus: 'ARC-AGI-1/2/3, kompetisi tahunan open-source, laporan teknis tahunan tentang efisiensi penalaran novel',
        stance: 'Pengukuran jujur: fluid intelligence pada tugas novel adalah ukuran AGI yang tidak bisa di-recall',
        scale: 'Benchmark standar de facto untuk generalisasi novel',
        color: '#fb7185'
    },
    {
        name: 'Epoch AI & CAIS/Scale',
        hq: 'AS/Eropa',
        people: 'Tim Epoch (analisis tren compute), Dan Hendrycks (HLE, CAIS)',
        focus: 'FrontierMath (Epoch), Humanity\'s Last Exam (HLE), pelacakan tren compute & timeline',
        stance: 'Pengukuran independen lintas lab; menyediakan sinyal kemajuan yang tidak dikendalikan vendor',
        scale: 'Rujukan kebijakan dan jurnalisme teknologi',
        color: '#fbbf24'
    }
];
const PEOPLE = [
    {
        name: 'Yann LeCun',
        role: 'Turing Award 2018; arsitek jalur world-model',
        org: 'eks-Meta; kini startup world-model (2025/2026)',
        thesis: 'LLM autoregresif adalah jalan buntu menuju AGI; kecerdasan butuh world model prediktif di ruang abstrak (JEPA) + siklus agen penuh.',
        notable: 'H-JEPA blueprint (2022); V-JEPA 2 (2025); keluar dari Meta dengan pendanaan startup yang dilaporkan ~USD 1 miliar'
    },
    {
        name: 'Francois Chollet',
        role: 'Pencipta Keras & ARC; teoretikus pengukuran',
        org: 'ARC Prize Foundation (meninggalkan Google 2024)',
        thesis: 'Kecerdasan = efisiensi akuisisi skill (skill-B); benchmark harus memaksa generalisasi novel, bukan recall.',
        notable: 'ARC (2019) → ARC-AGI-2 (2025); kerangka yang menahan klaim AGI vendor tetap jujur'
    },
    {
        name: 'Shane Legg',
        role: 'Co-founder DeepMind; penulis definisi universal intelligence',
        org: 'Google DeepMind',
        thesis: 'Kecerdasan didefinisikan formal: performa rata-rata lintas lingkungan; AGI = mencapai level manusia di mayoritas lingkungan.',
        notable: 'Legg & Hutter (2007); konsisten memprediksi 50% human-level AI sekitar 2028'
    },
    {
        name: 'Marcus Hutter',
        role: 'Peneliti AIXI; teori universal AI',
        org: 'ANU / DeepMind alumni',
        thesis: 'AIXI: agen optimal teoretis dari induksi Solomonoff + keputusan sekuensial; batas atas matematika untuk AGI.',
        notable: 'Universal Artificial Intelligence (2005); kompetisi Hutter Prize untuk kompresi = kecerdasan'
    },
    {
        name: 'Ben Goertzel',
        role: 'Arsitek OpenCog Hyperon; veteran AGI',
        org: 'SingularityNET / TrueAGI / OpenCog',
        thesis: 'AGI butuh hybrid penuh: neural + symbolic + evolutionary dalam satu metagraph yang memprogram ulang dirinya.',
        notable: 'OpenCog (2008-), Hyperon (2023-); mendefinisikan lapangan AGI via jurnal & konferensi AGI'
    },
    {
        name: 'Demis Hassabis',
        role: 'CEO DeepMind; Nobel Kimia 2024',
        org: 'Google DeepMind',
        thesis: 'AGI via jalur games → generality: sistem yang belajar plannning dari pengalaman (AlphaGo lineage) + LLM (Gemini).',
        notable: 'AlphaGo/AlphaZero/AlphaFold; ko-penulis Levels of AGI; penyebutan timeline AGI "5-10 tahun" (2024-2026)'
    },
    {
        name: 'Dario Amodei',
        role: 'CEO Anthropic; teoretis scaling',
        org: 'Anthropic',
        thesis: 'Scaling laws menentukan dekade ini; AGI ("powerful AI") bisa 2026-2030; keselamatan harus terstruktur (RSP, interpretability).',
        notable: 'Machines of Loving Grace (2024); Constitutional AI; kerangka kebijakan responsible scaling'
    },
    {
        name: 'Gary Marcus',
        role: 'Kritikus utama jalur LLM-murni',
        org: 'NYU (emeritus); penulis independen',
        thesis: 'LLM robustness-nya terbatas; tanpa symbolic reasoning hybrid, AGI tidak akan tercapai via scaling saja.',
        notable: 'The Next Decade in AI (2020); Rebooting AI; komentar kontra-Sparks of AGI'
    },
    {
        name: 'Rich Sutton',
        role: 'Bapak RL; penulis The Bitter Lesson',
        org: 'University of Alberta / Amii',
        thesis: 'Compute + metode umum belajar mengalahkan pengetahuan hand-crafted dalam jangka panjang.',
        notable: 'The Bitter Lesson (2019); Sutton & Barto (RL textbook, Turing Award 2024)'
    },
    {
        name: 'Noam Brown',
        role: 'Ilmuwan reasoning; test-time compute',
        org: 'OpenAI (eks-DeepMind/Meta)',
        thesis: 'Penskalaan di waktu inferensi (search + deliberasi) adalah dimensi kemajuan independen dari parameter.',
        notable: 'Libratus/Pluribus (poker); o-series reasoning; klaim "bulan tambahan berpikir" memberi lompatan berikutnya'
    }
];
const modAktor = {
    id: 'aktor',
    label: 'Aktor Global',
    short: 'Siapa & di mana: lembaga, tokoh, klaim, dan sumber daya yang menggerakkan lapangan',
    tagline: 'Peta aktor global — siapa berjuang di jalur mana, dengan sumber daya apa, dan klaim yang bisa ditagih',
    color: '#38bdf8',
    sections: [
        {
            id: 'aktor-lembaga',
            title: 'Lembaga: Siapa Membangun, Di Mana, dengan Jalur Apa',
            kicker: 'ORGANISASI',
            blocks: [
                {
                    type: 'paragraph',
                    text: 'AKTOR_ORGS_COMPONENT'
                },
                {
                    type: 'paragraph',
                    text: 'Membaca peta lembaga ini dengan kacamata tim kita: setiap lembaga memiliki kombinasi jalur-arsitektur dan sumber daya yang berbeda, dan tidak ada satu pun yang memegang seluruh fragmen solusi. DeepMind paling kuat di bukti hibrida (AlphaProof lineage) dan kerangka pengukuran; OpenAI paling kuat di infrastruktur RL reasoning dan penerapan; Anthropic di alignment terstruktur; komunitas JEPA (kini dengan startup LeCun) di world model; OpenCog di arsitektur hybrid terbuka; DeepSeek di efisiensi; ARC Foundation dan Epoch/CAIS di pengukuran independen. Strategi monitoring tim: pantai-paper dari tujuh aktor ini tiap kuartal, karena setiap aktor menguasai satu komponen blueprint kita.'
                }
            ]
        },
        {
            id: 'aktor-tokoh',
            title: 'Tokoh Kunci: Tesis yang Bisa Ditagih',
            kicker: 'INDIVIDU',
            blocks: [
                {
                    type: 'paragraph',
                    text: 'AKTOR_PEOPLE_COMPONENT'
                },
                {
                    type: 'paragraph',
                    text: 'Perhatikan struktur perdebatan antar tokoh, karena ia memetakan ruang keputusan desain kita. LeCun vs kubu scaling adalah perdebatan sarana prediksi (representasi abstrak vs token autoregresif); Chollet vs frontier labs adalah perdebatan pengukuran (skill-B vs benchmark recall); Marcus vs Sutton adalah perdebatan pengetahuan (struktur hand-crafted vs compute murni); Goertzel berdiri sendiri pada klaim integrasi penuh. Tesis masing-masing dapat ditagih melalui benchmark spesifik — dan itulah cara tim kita menyikapinya: bukan dengan memilih seseorang, melainkan dengan menguji klaimnya pada prototipe.'
                }
            ]
        },
        {
            id: 'aktor-timeline-prediksi',
            title: 'Prediksi Timeline: Kompilasi Sinyal',
            kicker: 'KAPAN?',
            blocks: [
                {
                    type: 'table',
                    headers: [
                        'Sumber prediksi',
                        'Estimasi',
                        'Basis argumen',
                        'Penyangkal utama'
                    ],
                    rows: [
                        [
                            'Shane Legg (DeepMind)',
                            '50% human-level AI ~2028',
                            'Konsistensi prediksi pribadi sejak 2009 + tren kemajuan',
                            'Generalitas penalaran novel belum terpecahkan'
                        ],
                        [
                            'L. Aschenbrenner (2024)',
                            'AGI ~2027',
                            'Ekstrapolasi OOM compute + RL reasoning',
                            'Hukum data, biaya energi, verifikasi domain terbuka'
                        ],
                        [
                            'Dario Amodei (Anthropic)',
                            '"Powerful AI" 2026-2030',
                            'Scaling + RL; RSP sebagai penyangga risiko',
                            'Interpretability tertinggal; evaluasi dunia nyata'
                        ],
                        [
                            'Demis Hassabis (DeepMind)',
                            'AGI 5-10 tahun dari 2024',
                            'Komposit Gemini + Alpha lineage',
                            'Bukti transfer lintas domain masih parsial'
                        ],
                        [
                            'Yann LeCun',
                            'Setelah world model matang',
                            'Argumen arsitektural; menolak timeline LLM',
                            'JEPA belum terbukti di penalaran diskrit'
                        ],
                        [
                            'Komunitas ARC/Chollet',
                            'Belum ada sinyal AGI',
                            'ARC-AGI-2 & 3 sebagai saringan novel-task',
                            '— (benchmark mereka sendiri yang menjadi arloji)'
                        ]
                    ]
                },
                {
                    type: 'callout',
                    tone: 'violet',
                    title: 'Sikap tim terhadap prediksi',
                    text: 'Prediksi timeline bukan data desain — ia data risiko. Rencana kerja kita tidak bergantung pada AGI datang 2027 atau 2037: komponen blueprint (world model, memori, verifier, RL reasoning) adalah pekerjaan riset yang bernilai pada setiap skenario. Yang kami pantau dari tabel ini adalah sinyal geser (benchmark baru yang jebol, verifier domain baru, bukti konsolidasi memori) — bukan angkanya.'
                }
            ]
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/mod-bukti.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "modBukti",
    ()=>modBukti
]);
const modBukti = {
    id: 'bukti',
    label: 'Bukti & Koherensi',
    short: 'Mengapa: matriks bukti lintas jalur, klaim konvergen, konflik, dan gap riset',
    tagline: 'Uji koherensi: apa yang benar-benar dibuktikan, apa yang hanya narasi, dan di mana lubang riset kita',
    color: '#fb7185',
    sections: [
        {
            id: 'bukti-matriks',
            title: 'Matriks Bukti Empiris per Keluarga',
            kicker: 'LEVEL BUKTI',
            blocks: [
                {
                    type: 'paragraph',
                    text: 'Modul ini adalah pemeriksaan koherensi — bagian dari metodologi tim yang membedakan pekerjaan riset dari pengumpulan kutipan. Untuk setiap keluarga arsitektur, kami membedah tiga level bukti: bukti mekanisme (apakah komponen intinya bekerja seperti yang diklaim, pada eksperimen terkontrol), bukti kapabilitas (apakah sistem utuh mencapai hal yang sebelumnya tak tercapai pada benchmark yang tidak bisa dicurigai), dan bukti transfer (apakah keunggulannya menyebar ke domain lain tanpa rekayasa ulang). Tabel berikut merangkum hasilnya; satu-satunya keluarga yang kuat di ketiga level untuk kapabilitasnya sendiri namun lemah untuk transfer adalah koneksionis-LLM — dan itu persis alasan kenapa jalurnya belum selesai.'
                },
                {
                    type: 'table',
                    headers: [
                        'Keluarga',
                        'Bukti mekanisme',
                        'Bukti kapabilitas',
                        'Bukti transfer',
                        'Penilaian koherensi'
                    ],
                    rows: [
                        [
                            'Simbolik klasik',
                            'Kuat & tua (ratusan model perilaku manusia; Newell Test)',
                            'Rendah (domain formal sempit)',
                            'Rendah (kebutuhan engineering per domain)',
                            'Struktur valid, mesin usang — diadopsi sebagai organisasi, bukan pembelajar'
                        ],
                        [
                            'Koneksionis/scaling',
                            'Sangat kuat (scaling laws terukur ulang lintas lab)',
                            'Sangat kuat (GATO, GPT-4, o-series; rekam jejak benchmark)',
                            'Sedang (transfer perilaku ya; transfer penalaran novel gagal di ARC-AGI-2)',
                            'Klaim "skala menyelesaikan" belum koheren dengan bukti novel-task'
                        ],
                        [
                            'World model/JEPA',
                            'Kuat & baru (I-JEPA, V-JEPA: fitur semantik tanpa label; planning zero-shot)',
                            'Sedang (persepsi + kontrol robotik; belum penalaran/bahasa penuh)',
                            'Belum teruji (belum ada sistem utuh lintas modal tugas)',
                            'Mekanisme koheren dengan teori; kapabilitas sistem utuh belum ada'
                        ],
                        [
                            'Neuro-symbolic',
                            'Kuat (formal verifier tak terbantahkan; RL di Lean)',
                            'Kuat di domain formal (medali perak IMO; 25/30 geometri)',
                            'Rendah-ke-sedang (autoformalisasi matematika ya; domain terbuka belum)',
                            'Koheren di domain formal; generalisasi bergantung autoformalisasi yang belum tuntas'
                        ],
                        [
                            'LLM-as-core + RL',
                            'Kuat (R1: reasoning dari RL murni, direplikasi; o-series)',
                            'Kuat (FrontierMath ~25%, HLE puluhan %, agen alat produksi)',
                            'Sedang (agentic tasks baik; degradasi pada tugas panjang/novel)',
                            'Klaim terkuat hari ini; tetap dijebol ARC-AGI-2 — bukan jawaban penuh'
                        ]
                    ]
                },
                {
                    type: 'callout',
                    tone: 'rose',
                    title: 'Waspadai tiga pola bukti palsu',
                    text: '(1) Benchmark leak — skor tinggi yang menghilang saat soal novel (lihat sejarah ARC). (2) Emergensi metrik — lompatan skor artefak pengukuran, bukan kemampuan (Schaeffer 2023). (3) Demo selektif — kemampuan yang ditunjukkan pada contoh terpilih tapi tidak stabil di uji acak. Setiap klaim yang kita adopsi ke blueprint harus lolos ketiga saringan ini.'
                }
            ]
        },
        {
            id: 'bukti-konvergen',
            title: 'Klaim Konvergen: Di Mana Semua Jalur Sepakat',
            kicker: 'KONVERGENSI',
            blocks: [
                {
                    type: 'paragraph',
                    text: 'Analisis lintas-paper menemukan lima klaim yang didukung secara independen oleh jalur-jalur yang berbeda — konvergensi semacam ini adalah bukti koherensi terkuat yang dimiliki lapangan, lebih kuat daripada keberhasilan satu keluarga. Pertama, memori harus dapat konsolidasi: ACT-R (aktivasi), SOAR (chunking), agen LLM (memori episodal + distilasi), dan Hyperon (AtomSpace) semuanya menuntutnya. Kedua, generalisasi novel butuh model dunia: LeCun menyatakannya eksplisit, Chollet mengukurnya (core-knowledge priors), DeepMind membangunnya (Genie/simulasi), dan bahkan kubu LLM mengakui world model implisit yang rapuh sebagai kelemahan. Ketiga, verifikasi terpisah dari generator: AlphaProof (Lean), self-verification R1, kritik Constitutional AI — pola yang sama di tiga jalur.'
                },
                {
                    type: 'paragraph',
                    text: 'Keempat, pembelajaran dari reward mengalahkan imitasi pada penalaran: AlphaZero tabula-rasa, o-series, R1 — ketiganya menunjukkan pola yang sama bahwa RL pada reward kebenaran membuka level yang tidak dicapai meniru data manusia. Kelima, otonomi dan safety adalah dimensi terpisah dari kapabilitas: Levels of AGI memisahkannya secara eksplisit, kerangka preparedness OpenAI dan RSP Anthropic mengoperasionalkannya, dan OpenCog menempatkan "beneficial" langsung di judul roadmap-nya. Bagi blueprint kita, lima klaim konvergen ini berfungsi sebagai syarat minimum yang tidak bisa dinegosiasikan — setiap komponen di Modul 7 dipetakan ke salah satunya.'
                },
                {
                    type: 'papers',
                    ids: [
                        'morris2023',
                        'deepseek-r1-2025',
                        'alphaproof2025',
                        'bai2022',
                        'goertzel2023'
                    ]
                }
            ]
        },
        {
            id: 'bukti-konflik',
            title: 'Konflik Terbuka: Perdebatan yang Belum Selesai',
            kicker: 'KONFLIK',
            blocks: [
                {
                    type: 'paragraph',
                    text: 'Koherensi yang jujur juga berarti mencatat konflik yang belum terselesaikan. Konflik pertama — prediksi di ruang mana: token autoregresif (kubu LLM) vs representasi abstrak (JEPA)? Bukti saat ini menunjukkan LLM menang di bahasa/penalaran simbolik tipis, JEPA menang di dinamika visual/fisik; belum ada eksperimen head-to-head yang menentukan pada tugas kognitif penuh. Konflik kedua — pengetahuan vs compute: Sutton mengklaim compute menang selamanya; Marcus mengklaim struktur simbolik dibutuhkan; AlphaProof memberi bukti bagi keduanya sekaligus (RL murni di atas substrate formal yang di-engineer). Konflik ketiga — benchmark: apakah ARC-AGI merepresentasikan kecerdasan praktis atau sekadar kelas puzzle tertentu? FrontierMath/HLE mengukur keahlian pakar yang berbeda bentuk dari fluid intelligence; tim menanggapi dengan mengukur keduanya, bukan memilih salah satu.'
                },
                {
                    type: 'paragraph',
                    text: 'Konflik keempat — timeline & risiko: kalangan scaling (Aschenbrenner, Amodei) menempatkan AGI dalam beberapa tahun, kalangan arsitektur (LeCun) menyebut itu mustahil tanpa world model, dan kalangan akademik skeptis menuntut definisi lebih ketat dulu. Konflik kelima — kesadaran & status moral: Butlin dkk. menyediakan indikator arsitektural, tetapi klaim "sistemnya sadar" tetap tidak teruji; untuk keperluan engineering kita, indikator GWT menjadi checklist properti (integrasi informasi, siaran workspace), bukan dogma metafisik. Sikap kerja tim: konflik tidak diselesaikan dengan vota, melainkan dengan eksperimen yang bisa membedakan — dan setiap konflik di atas punya eksperimen pembedah yang tercantum di kolom gap di bawah.'
                },
                {
                    type: 'table',
                    headers: [
                        'Konflik',
                        'Posisi A',
                        'Posisi B',
                        'Eksperimen pembedah yang bisa kita jalankan'
                    ],
                    rows: [
                        [
                            'Ruang prediksi',
                            'Token autoregresif cukup',
                            'Abstraksi JEPA diperlukan',
                            'Bandingkan planner world-model vs reasoning LLM pada tugas fisika-dinamika yang sama (set ala V-JEPA-AC vs o-series)'
                        ],
                        [
                            'Pengetahuan vs compute',
                            'Scaling + RL menang',
                            'Struktur simbolik wajib',
                            'Ukur degradasi prototipe hybrid saat verifier simbolik dimatikan'
                        ],
                        [
                            'Validitas ARC',
                            'Fluid intelligence nyata',
                            'Kelas puzzle sempit',
                            'Uji korelasi skor ARC-AGI-2 prototipe dengan kinerja tugas riset nyata'
                        ],
                        [
                            'Timeline',
                            'AGI 2027-2030',
                            'Dekade lebih',
                            'Lacak sinyal geser benchmark + verifier-domain baru tiap kuartal'
                        ],
                        [
                            'Kesadaran sistem',
                            'Indikator GWT cukup',
                            'Bukan pertanyaan engineering',
                            'Audit blueprint terhadap 14 indikator Butlin dkk. — transparan, tanpa klaim metafisik'
                        ]
                    ]
                }
            ]
        },
        {
            id: 'bukti-gap',
            title: 'Gap Riset Eksplisit: Pekerjaan Rumah Tim Kita',
            kicker: 'GAP',
            blocks: [
                {
                    type: 'paragraph',
                    text: 'Setelah bukti dikonversi menjadi klaim, inilah lubang yang tersisa — daftar gap riset yang eksplisit, yang kami anggap agenda kerja tim, bukan keluhan lapangan. Gap 1: memori persisten yang konsolidasi — belum ada implementasi yang menyelesaikan siklus penuh pengalaman → memori episodal → generalisasi prosedural → distilasi kembali ke bobot tanpa degradasi. Gap 2: autoformalisasi domain terbuka — AlphaProof bekerja karena matematika bisa diformalkan; agen yang bisa membuat verifier untuk domain non-formal (kebijakan, desain, sains eksperimental) belum ada. Gap 3: world model berlapis dengan horizon panjang — V-JEPA 2 menangani detik-menit; penalaran rencana berminggu-minggu butuh hierarki abstraksi yang belum terbukti.'
                },
                {
                    type: 'paragraph',
                    text: 'Gap 4: koherensi otonomi panjang — semua keluarga mengalami degradasi pada tugas multi-hari; penyebabnya (konteks, drift tujuan, akumulasi kesalahan) belum diisolasi. Gap 5: alokasi komputasi adaptif — test-time compute bekerja, tetapi sistem belum punya metakognisi untuk memutuskan "kapan berhenti berpikir"; ini jembatan langsung ke tesis Chollet (efisiensi, bukan kekuatan mentah). Gap 6: pengukuran otonomi — kerangka L0-L5 ada secara konseptual, belum ada rubrik operasional yang dipakai lintas lab. Setiap gap ini akan muncul lagi di Modul 7 sebagai baris "risiko/gap" pada komponen blueprint terkait — agar desain dan agenda riset kita satu dokumen yang sama.'
                },
                {
                    type: 'callout',
                    tone: 'emerald',
                    title: 'Aturan pembaruan basis pengetahuan',
                    text: 'Basis ini hidup: setiap kuartal, klaim di modul Bukti diperiksa ulang terhadap paper & benchmark baru (daftar pantauan ada di Modul Aktor). Klaim yang gugur dicoret dengan catatan tanggal; klaim baru masuk hanya bila punya level bukti yang setara dengan tetangganya.'
                }
            ]
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/mod-blueprint.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BLUEPRINT_NODES",
    ()=>BLUEPRINT_NODES,
    "modBlueprint",
    ()=>modBlueprint
]);
const BLUEPRINT_NODES = [
    {
        id: 'persepsi',
        label: 'Persepsi & Encoder',
        layer: 1,
        desc: 'Encoder multimodal JEPA-style yang mengubah input mentah (teks, citra, video, sensor) menjadi representasi abstrak semantik.',
        fungsi: 'Kompresi persepsi ke ruang embedding yang menangkap objek, relasi, dan dinamika — prasyarat generalisasi novel.',
        bukti: 'I-JEPA (CVPR 2024): fitur semantik tanpa label; V-JEPA 2 (2025): pemahaman fisik video 1 juta jam; keluarga CLIP/ViT untuk multimodal praktis.',
        teknologi: 'I-JEPA/V-JEPA open weights; ViT-L; modul audio (Whisper-style); tokenizer teks modern.',
        gap: 'Persatuan modal (video+teks+siprus tindakan) di satu ruang abstrak belum stabil; grounding sensorik robotik terbatas.',
        papers: [
            'assran2024',
            'bardes2024',
            'v-jepa2-2025'
        ]
    },
    {
        id: 'worldmodel',
        label: 'World Model',
        layer: 2,
        desc: 'Model prediktif berlapis yang memprediksi representasi masa depan (bukan piksel/token) dan menopang simulasi "mimpi" untuk planning.',
        fungsi: 'Menjawab "apa yang terjadi jika saya lakukan X" tanpa biaya dunia nyata; sumber generalisasi ke situasi novel.',
        bukti: 'LeCun 2022 (H-JEPA); Ha & Schmidhuber 2018 (belajar di dunia mimpi); V-JEPA 2-AC: planning robot zero-shot (2025).',
        teknologi: 'JEPA prediktif berlapis; varian action-conditioned; Dreamer-lineage (RNN world models) untuk RL internal.',
        gap: 'Horizon panjang (minggu) & hierarki abstraksi belum terbukti; verifikasi kesetiaan simulasi (fidelity) ke dunia nyata terbuka.',
        papers: [
            'lecun2022',
            'ha2018',
            'v-jepa2-2025'
        ]
    },
    {
        id: 'memori',
        label: 'Sistem Memori',
        layer: 2,
        desc: 'Tiga lapis sesuai tradisi kognitif: episodal (pengalaman), semantik (pengetahuan terstruktur AtomSpace/vektor), prosedural (skill yang dikompres).',
        fungsi: 'Konsolidasi pengalaman menjadi keterampilan & pengetahuan — syarat klaim konvergen #1 dan fondasi transfer.',
        bukti: 'ACT-R (aktivasi & decay); SOAR (chunking); OpenCog Distributed AtomSpace (miliaran atom); praktik agen modern (RAG + episodic store).',
        teknologi: 'Vektor DB + graf pengetahuan; retrieve-then-reason; mekanisme replays/distilasi offline ala Dreamer.',
        gap: 'Siklus penuh pengalaman→generalisasi→distilasi ke bobot tanpa degradasi belum ada (Gap #1 di Modul Bukti).',
        papers: [
            'anderson1998',
            'laird1987',
            'goertzel2023'
        ]
    },
    {
        id: 'reasoning',
        label: 'Reasoning Core (LLM + Verifier)',
        layer: 3,
        desc: 'Inti penalaran: LLM reasoning yang di-tumbuhkan RL, dipasangkan verifier simbolik terpisah untuk kebenaran yang tidak bisa di-selipkan.',
        fungsi: 'Menghasilkan hipotesis/langkah (generator neural) dan menjamin validitas (verifier simbolik) — pola yang menang di matematika.',
        bukti: 'DeepSeek-R1 (Nature 2025): reasoning dari RL murni; o1/o3 (test-time compute); AlphaProof: RL di Lean → medali perak IMO.',
        teknologi: 'Model reasoning open/frontier; RL dengan verifiable reward; Lean/DSL verifier; self-consistency + debate.',
        gap: 'Verifier untuk domain terbuka (kebijakan, sains eksperimental) belum ada → perlu autoformalisasi (Gap #2).',
        papers: [
            'deepseek-r1-2025',
            'openai-o1-2024',
            'alphaproof2025',
            'trinh2024'
        ]
    },
    {
        id: 'planning',
        label: 'Planning & Actor',
        layer: 4,
        desc: 'Perencana hierarkis yang menguraikan tujuan → sub-tujuan, memilih alat, mengeksekusi di dunia nyata atau di dalam world model.',
        fungsi: 'Menutup siklus persepsi-tindakan (Turing/Legg-Hutter); menjalankan rencana dengan tool-use dan koreksi jalur.',
        bukti: 'Struktur goal-stack SOAR; GATO & agen modern untuk eksekusi; V-JEPA 2-AC untuk planning berbasis prediksi.',
        teknologi: 'Planner hierarkis + tool API; MCP-style tool layer; replanning saat prediksi world model meleset.',
        gap: 'Koherensi tugas panjang (multi-hari) turun drastis di semua sistem eksisting (Gap #4).',
        papers: [
            'laird1987',
            'reed2022',
            'v-jepa2-2025'
        ]
    },
    {
        id: 'metakognisi',
        label: 'Metakognisi & Self-Eval',
        layer: 5,
        desc: 'Pengawas internal: mengukur ketidakpastian, memutuskan kapan compute test-time dibelanjakan, mengarahkan kurikulum belajar diri.',
        fungsi: 'Efisiensi akuisisi skill (tesis Chollet) — sistem yang tahu apa yang tidak ia tahu dan berlatih di sana.',
        bukti: 'ECAN OpenCog (ekonomi attention); self-reflection R1; UNCERTAINTY calibration pada model reasoning; Newell Test ACT-R.',
        teknologi: 'Estimasi ketidakpastian (ensemble/logprob); kritik-RL; kurikulum otomatis dari kesalahan log memori.',
        gap: 'Metakognisi yang jujur (knowing-when-to-stop) belum stabil; kalibrasi bisa di-exploit oleh reward hacking.',
        papers: [
            'goertzel2023',
            'deepseek-r1-2025',
            'chollet2019',
            'anderson1998'
        ]
    },
    {
        id: 'safety',
        label: 'Safety & Alignment Layer',
        layer: 6,
        desc: 'Lapisan lintas-komponen: konstitusi perilaku, batas tindakan, audit jejak keputusan, dan evaluasi berbahaya sebelum deploy.',
        fungsi: 'Menjamin komposit tetap aligned saat kapabilitas naik — klaim konvergen #5; syarat, bukan aksesori.',
        bukti: 'Constitutional AI (Anthropic 2022); kerangka RSP Anthropic & Preparedness OpenAI; Levels of AGI memisahkan otonomi vs kapabilitas.',
        teknologi: 'Constitution + critic model; sandbox tindakan; interpretability probes; eval suite berbahaya (bioweapon/cyber/autonomy).',
        gap: 'Interpretability belum menjangkau model terbesar; alignment scalable untuk sistem self-improving masih riset terbuka.',
        papers: [
            'bai2022',
            'morris2023'
        ]
    }
];
const modBlueprint = {
    id: 'blueprint',
    label: 'Blueprint AGI-G1',
    short: 'Sintesis: arsitektur komposit yang bisa diprototipe — komponen, bukti, dan tahapan build',
    tagline: 'Muara semua modul: AGI-G1, arsitektur komposit generasi-1 yang setiap komponennya disandarkan pada bukti',
    color: '#f59e0b',
    sections: [
        {
            id: 'blueprint-prinsip',
            title: 'Prinsip Desain & Nama Kode',
            kicker: 'PRINSIP',
            blocks: [
                {
                    type: 'paragraph',
                    text: 'AGI-G1 (AGI Generasi-1) adalah sintesis desain tim: arsitektur komposit yang mengambil setiap komponen dari keluarga yang paling kuat buktinya untuk fungsi itu — bukan dari keluarga yang paling menarik narasinya. Empat prinsip mengikat desain. Prinsip 1 — Bukti-dulu: setiap komponen wajib menyebut paper pendukungnya; komponen tanpa bukti masuk daftar riset, bukan diagram. Prinsip 2 — Verifikasi terpisah: tidak ada jalur dari generator ke tindakan yang tidak melewati pemeriksa (verifier, kritik, atau policy). Prinsip 3 — Memori adalah warga utama: pengalaman harus dapat dikonsolidasi; sistem tanpa memori persisten dinilai demo, bukan agen. Prinsip 4 — Safety lintas-lapis: lapisan alignment menyilang semua komponen, bukan tinggal di akhir pipeline.'
                },
                {
                    type: 'paragraph',
                    text: 'Diagram interaktif di bawah menampilkan tujuh komponen AGI-G1 dalam enam lapisan. Klik setiap node untuk membuka panel detail: fungsi, bukti literatur, teknologi yang tersedia hari ini untuk prototipe, dan gap risetnya. Perhatikan dua alur utama: alur persepsi (Persepsi → World Model → Planning → Actor) yang menurunkan tradisi LeCun, dan alur kognisi (Memori → Reasoning → Metakognisi) yang menurunkan tradisi SOAR/ACT-R + LLM-RL — keduanya dipersatukan verifier dan lapisan safety. Inilah jawaban konkret atas pertanyaan "dari mana ke mana": dari tujuh dekade bukti, ke tujuh komponen yang dapat dibangun.'
                },
                {
                    type: 'paragraph',
                    text: 'BLUEPRINT_DIAGRAM_COMPONENT'
                }
            ]
        },
        {
            id: 'blueprint-alur',
            title: 'Siklus Kognitif AGI-G1 End-to-End',
            kicker: 'ALUR',
            blocks: [
                {
                    type: 'list',
                    ordered: true,
                    items: [
                        'Input mentah masuk Persepsi & Encoder → representasi abstrak (JEPA-style).',
                        'World Model memprediksi konsekuensi kandidat tindakan di ruang abstrak; konflik prediksi menandai situasi novel.',
                        'Memori menyediakan konteks: pengalaman serupa (episodal), fakta & relasi (semantik), skill (prosedural).',
                        'Reasoning Core menghasilkan rencana/hipotesis; Verifier simbolik memeriksa yang bisa diformalkan; LLM-kritik memeriksa sisanya.',
                        'Metakognisi menilai ketidakpastian: bila rendah → lanjut eksekusi; bila tinggi → belanjakan test-time compute, atau minta klarifikasi (kebijakan "jangan pura-pura tahu").',
                        'Planning & Actor mengeksekusi rencana via alat/aktuator; hasil tindakan (feedback dunia) dicatat ke memori episodal.',
                        'Siklus konsolidasi (offline): pengalaman sukses→skill prosedural; kegagalan→kasus pengajaran untuk kurikulum metakognisi; semuanya lewat Safety Layer yang menandai perilaku menyimpang sebelum diserap.'
                    ]
                },
                {
                    type: 'callout',
                    tone: 'amber',
                    title: 'Kenapa komposit, bukan satu model raksasa',
                    text: 'Bukti 2024-2026 konsisten: kemampuan terbaik datang dari pasangan generator-verifier (AlphaProof), dari model-plus-tools (o-series + agen), dan dari prediksi-abstrak-plus-kontrol (V-JEPA 2-AC). Komponen terpisah juga memberi sesuatu yang tidak dimiliki monolit: auditability — setiap keputusan dapat diperiksa di seam antar komponen. Monolit lebih sederhana di marketing; komposit lebih kuat di engineering.'
                }
            ]
        },
        {
            id: 'blueprint-tahapan',
            title: 'Tahapan Prototipe (Build Plan)',
            kicker: 'ROADMAP KERJA',
            blocks: [
                {
                    type: 'table',
                    headers: [
                        'Fase',
                        'Target',
                        'Komponen AGI-G1',
                        'Benchmark penerimaan'
                    ],
                    rows: [
                        [
                            'P0 — Fondasi (0-3 bulan)',
                            'Agen LLM + memori + alat yang stabil',
                            'Reasoning Core + Memori (episodal/vektor) + Planning dasar',
                            'Tugas riset multi-langkah; retensi memori 30 hari'
                        ],
                        [
                            'P1 — Verifikasi (3-6 bulan)',
                            'Generator-verifier di domain formal',
                            'Reasoning Core + verifier (kode/Lean/logika)',
                            'Penyelesaian set soal formal; penurunan halusinasi terukur'
                        ],
                        [
                            'P2 — World model (6-12 bulan)',
                            'Prediksi & planning di lingkungan simulasi',
                            'Encoder JEPA + World Model + Planning',
                            'Transfer zero-shot ala V-JEPA-AC; skor ARC-AGI-2 > baseline LLM'
                        ],
                        [
                            'P3 — Metakognisi (12-18 bulan)',
                            'Alokasi compute adaptif + kurikulum belajar',
                            'Metakognisi + konsolidasi memori → skill',
                            'Efisiensi akuisisi skill (kurva belajar) naik antar-domain'
                        ],
                        [
                            'P4 — Otonomi aman (18-24 bulan)',
                            'Agen tugas panjang dengan supervisi berlapis',
                            'Semua komponen + Safety Layer penuh',
                            'Tugas multi-minggu; eval keselamatan lulus tanpa degradasi kapabilitas'
                        ]
                    ]
                },
                {
                    type: 'paragraph',
                    text: 'Tahapan ini sengaja disusun agar setiap fase menghasilkan artefak yang berguna sendirinya (agen riset berguna di P0, sistem matematika di P1) — pendanaan dan motivasi tim tidak bergantung pada menunggu AGI. Pengukuran penerimaan mengambil benchmark terjujur yang tersedia hari ini dan menambahkan ukuran internal (kurva akuisisi skill ala Chollet, retensi memori, koherensi panjang) karena benchmark publik belum mencakup properti yang kita anggap esensial. Fase P2 adalah yang paling berisiko secara ilmiah — di sanalah klaim jalur JEPA benar-benar diuji pada penalaran, dan hasilnya (baik sukses maupun gagal) akan diperbarui langsung ke Modul Bukti.'
                }
            ]
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/mod-referensi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "modReferensi",
    ()=>modReferensi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$papers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/papers.ts [app-client] (ecmascript)");
;
const modReferensi = {
    id: 'referensi',
    label: 'Referensi',
    short: `Database ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$papers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAPERS"].length} paper inti dua lapis (klasik + frontier) dengan pencarian & filter`,
    tagline: 'Fondasi bukti seluruh basis pengetahuan — 40 paper inti, dapat dicari dan difilter per kategori',
    color: '#e879f9',
    sections: [
        {
            id: 'ref-db',
            title: 'Database Paper: 1950-2026',
            kicker: 'DATABASE',
            blocks: [
                {
                    type: 'paragraph',
                    text: 'Seluruh tautan silang dari modul lain bermuara di sini. Setiap entri memuat judul, penulis, tahun, tempat terbit, klaim kuncinya dalam satu-dua kalimat, dan tautan sumber bila tersedia. Filter kategori membagi database sesuai peran paper dalam argumen tim: definisi (apa yang kita kejar), arsitektur (bagaimana membangun), bukti (apa yang terbukti), benchmark (bagaimana mengukur), dan safety (bagaimana menjaga). Gunakan pencarian untuk menemukan paper berdasarkan penulis, tahun, atau kata kunci — misalnya ketik "JEPA", "2019", atau "Hutter".'
                },
                {
                    type: 'paragraph',
                    text: 'REFERENSI_DB_COMPONENT'
                }
            ]
        },
        {
            id: 'ref-pantauan',
            title: 'Daftar Pantauan Kuartalan',
            kicker: 'MAINTENANCE',
            blocks: [
                {
                    type: 'paragraph',
                    text: 'Basis pengetahuan yang hidup butuh jadwal. Setiap kuartal tim memeriksa sumber-sumber berikut dan memperbarui klaim di seluruh modul: (1) ARC Prize Foundation — laporan teknis tahunan dan skor leaderboard ARC-AGI-2/3; (2) Nature & arXiv untuk lanjutan AlphaProof-lineage dan world model; (3) rilis model frontier OpenAI/Anthropic/Google DeepMind beserta system card-nya; (4) benchmark Epoch AI (FrontierMath) dan CAIS (HLE) untuk pergeseran ambang keahlian; (5) roadmap OpenCog Hyperon untuk kemajuan arsitektur hybrid; (6) publikasi startup world-model LeCun sebagai pengujian jalur JEPA di luar akademia. Kriteria adopsi klaim baru: level bukti setara tetangganya, tersedia replikasi atau benchmark publik, dan tidak bertumpu pada demo selektif.'
                }
            ]
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MODULES",
    ()=>MODULES,
    "moduleById",
    ()=>moduleById
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mod$2d$beranda$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mod-beranda.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mod$2d$definisi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mod-definisi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mod$2d$arsitektur$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mod-arsitektur.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mod$2d$kronologi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mod-kronologi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mod$2d$aktor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mod-aktor.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mod$2d$bukti$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mod-bukti.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mod$2d$blueprint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mod-blueprint.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mod$2d$referensi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mod-referensi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$papers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/papers.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
const MODULES = [
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mod$2d$beranda$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["modBeranda"],
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mod$2d$definisi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["modDefinisi"],
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mod$2d$arsitektur$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["modArsitektur"],
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mod$2d$kronologi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["modKronologi"],
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mod$2d$aktor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["modAktor"],
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mod$2d$bukti$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["modBukti"],
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mod$2d$blueprint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["modBlueprint"],
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mod$2d$referensi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["modReferensi"]
];
const moduleById = (id)=>MODULES.find((m)=>m.id === id);
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_data_4611600a._.js.map