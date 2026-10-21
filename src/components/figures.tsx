/**
 * Planches techniques en trait, utilisées tant qu'aucune photographie
 * authentique n'est disponible. Elles représentent des familles de
 * composants de manière schématique, sans prétendre montrer un article réel.
 */

export type FigureKey = "engine" | "pump" | "gearbox" | "reducer" | "injector" | "parts" | "excavator" | "bench";

type GearOpts = { cx: number; cy: number; r: number; teeth: number; depth?: number };

function gearPath({ cx, cy, r, teeth, depth = 7 }: GearOpts) {
  const pts: string[] = [];
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const angles = [a, a + step * 0.18, a + step * 0.5, a + step * 0.68];
    const radii = [r - depth, r, r, r - depth];
    angles.forEach((ang, k) => {
      pts.push(`${(cx + radii[k] * Math.cos(ang)).toFixed(1)},${(cy + radii[k] * Math.sin(ang)).toFixed(1)}`);
    });
  }
  return `M${pts.join("L")}Z`;
}

function Gear(props: GearOpts & { hub?: number; accent?: boolean }) {
  const { cx, cy, r, hub = r * 0.32, accent } = props;
  return (
    <g>
      <path d={gearPath(props)} className={accent ? "fill-signal/15 stroke-signal" : undefined} />
      <circle cx={cx} cy={cy} r={hub} />
      <circle cx={cx} cy={cy} r={hub * 0.45} />
    </g>
  );
}

function Dim({ x1, y1, x2, y2, label }: { x1: number; y1: number; x2: number; y2: number; label: string }) {
  const horizontal = y1 === y2;
  return (
    <g className="stroke-current opacity-60" strokeWidth={1}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      {horizontal ? (
        <path d={`M${x1} ${y1 - 6} V${y1 + 6} M${x2} ${y2 - 6} V${y2 + 6}`} />
      ) : (
        <path d={`M${x1 - 6} ${y1} H${x1 + 6} M${x2 - 6} ${y2} H${x2 + 6}`} />
      )}
      <text
        x={(x1 + x2) / 2 + (horizontal ? 0 : 8)}
        y={(y1 + y2) / 2 + (horizontal ? -6 : 4)}
        textAnchor={horizontal ? "middle" : "start"}
        className="fill-current stroke-none font-mono text-[9px] tracking-wider"
      >
        {label}
      </text>
    </g>
  );
}

function Callout({ x, y, tx, ty, label }: { x: number; y: number; tx: number; ty: number; label: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={3} className="fill-signal stroke-none" />
      <polyline points={`${x},${y} ${tx},${ty} ${tx + (tx > x ? 24 : -24)},${ty}`} className="stroke-signal" strokeWidth={1} />
      <text
        x={tx + (tx > x ? 28 : -28)}
        y={ty + 3}
        textAnchor={tx > x ? "start" : "end"}
        className="fill-current stroke-none font-mono text-[9px] uppercase tracking-wider"
      >
        {label}
      </text>
    </g>
  );
}

const drawings: Record<FigureKey, React.ReactNode> = {
  engine: (
    <>
      {/* culasse et cylindres */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={112 + i * 30} y={70} width={24} height={26} rx={2} />
      ))}
      <rect x={104} y={96} width={192} height={18} />
      {/* bloc */}
      <path d="M96 114 H304 V196 L286 214 H114 L96 196 Z" />
      <path d="M114 214 V236 H286 V214" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1={124 + i * 30} y1={130} x2={124 + i * 30} y2={190} className="opacity-50" />
      ))}
      {/* poulie et courroie */}
      <circle cx={74} cy={170} r={22} />
      <circle cx={74} cy={170} r={7} />
      <circle cx={78} cy={110} r={11} />
      <path d="M58 155 L69 102 M90 154 L88 104" className="opacity-60" />
      {/* turbo */}
      <circle cx={330} cy={118} r={20} className="fill-signal/15 stroke-signal" />
      <circle cx={330} cy={118} r={8} className="stroke-signal" />
      <path d="M304 118 H310 M330 98 V84 H296" />
      {/* collecteur */}
      <path d="M118 70 V58 H286 V70" className="opacity-60" />
      <Dim x1={96} y1={262} x2={304} y2={262} label="L" />
      <Callout x={330} y={118} tx={300} ty={40} label="Turbo" />
      <Callout x={196} y={83} tx={240} ty={36} label="Culasse" />
      <Callout x={200} y={160} tx={150} ty={286} label="Bloc moteur" />
    </>
  ),
  pump: (
    <>
      {/* bride */}
      <rect x={60} y={96} width={22} height={108} rx={3} />
      <circle cx={71} cy={110} r={4} />
      <circle cx={71} cy={190} r={4} />
      {/* arbre */}
      <rect x={30} y={142} width={30} height={16} />
      <line x1={36} y1={150} x2={54} y2={150} className="opacity-50" />
      {/* corps */}
      <path d="M82 108 H250 L268 126 V174 L250 192 H82 Z" />
      <path d="M268 132 H300 V168 H268" />
      {/* barillet en coupe */}
      <circle cx={170} cy={150} r={34} className="fill-signal/10 stroke-signal" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
        const a = (i / 9) * Math.PI * 2;
        return <circle key={i} cx={170 + 22 * Math.cos(a)} cy={150 + 22 * Math.sin(a)} r={6} />;
      })}
      <circle cx={170} cy={150} r={6} />
      {/* orifices */}
      <rect x={138} y={76} width={26} height={32} />
      <rect x={186} y={192} width={26} height={30} />
      <path d="M151 76 V60 M199 222 V238" className="opacity-60" />
      <Callout x={151} y={68} tx={110} ty={44} label="Aspiration" />
      <Callout x={199} y={232} tx={240} ty={262} label="Refoulement" />
      <Callout x={192} y={150} tx={300} ty={96} label="Barillet" />
      <Dim x1={30} y1={262} x2={300} y2={262} label="" />
    </>
  ),
  gearbox: (
    <>
      <path d="M48 70 H352 V240 H48 Z" className="opacity-70" />
      <path d="M48 92 H352" className="opacity-40" />
      <Gear cx={130} cy={160} r={58} teeth={18} />
      <Gear cx={232} cy={140} r={44} teeth={14} accent />
      <Gear cx={306} cy={194} r={28} teeth={10} />
      <line x1={20} y1={160} x2={72} y2={160} />
      <line x1={334} y1={194} x2={380} y2={194} />
      <Callout x={232} y={140} tx={270} ty={50} label="Pignon" />
      <Callout x={130} y={160} tx={170} ty={278} label="Arbre primaire" />
    </>
  ),
  reducer: (
    <>
      <circle cx={200} cy={150} r={108} />
      <circle cx={200} cy={150} r={96} className="opacity-50" />
      {/* couronne intérieure */}
      <circle cx={200} cy={150} r={86} strokeDasharray="4 4" />
      <Gear cx={200} cy={150} r={30} teeth={12} accent />
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2 - Math.PI / 2;
        return <Gear key={i} cx={200 + 56 * Math.cos(a)} cy={150 + 56 * Math.sin(a)} r={28} teeth={11} depth={6} />;
      })}
      <path d="M200 150 m-56 0 a56 56 0 1 0 112 0 a56 56 0 1 0 -112 0" className="opacity-40" strokeDasharray="2 6" />
      <Callout x={200} y={150} tx={300} ty={30} label="Planétaire" />
      <Callout x={200} y={94} tx={110} ty={30} label="Satellites" />
      <Callout x={290} y={190} tx={310} ty={280} label="Couronne" />
    </>
  ),
  injector: (
    <>
      {/* corps d'injecteur à l'horizontale */}
      <rect x={40} y={128} width={40} height={44} rx={4} />
      <path d="M80 136 H210 V164 H80" />
      <path d="M210 130 H250 V170 H210 Z" className="fill-signal/10 stroke-signal" />
      <path d="M250 140 H300 L318 146 V154 L300 160 H250" />
      <line x1={318} y1={150} x2={326} y2={150} />
      {/* pulvérisation */}
      {[-16, -8, 0, 8, 16].map((d) => (
        <line key={d} x1={328} y1={150} x2={372} y2={150 + d * 1.6} className="stroke-signal" strokeDasharray="3 4" />
      ))}
      {/* connecteur & retour */}
      <path d="M60 128 V100 H96 M60 100 V84" />
      <path d="M150 136 V110 H176" className="opacity-60" />
      <line x1={96} y1={150} x2={196} y2={150} className="opacity-40" strokeDasharray="6 4" />
      <Dim x1={40} y1={210} x2={326} y2={210} label="" />
      <Callout x={230} y={150} tx={260} ty={70} label="Électrovanne" />
      <Callout x={318} y={150} tx={300} ty={250} label="Buse" />
      <Callout x={60} y={92} tx={110} ty={50} label="Connecteur" />
    </>
  ),
  parts: (
    <>
      {/* roulement */}
      <circle cx={110} cy={120} r={56} />
      <circle cx={110} cy={120} r={24} />
      <circle cx={110} cy={120} r={44} className="opacity-50" />
      <circle cx={110} cy={120} r={34} className="opacity-50" />
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return <circle key={i} cx={110 + 39 * Math.cos(a)} cy={120 + 39 * Math.sin(a)} r={5} className="fill-signal/20 stroke-signal" />;
      })}
      {/* écrou hexagonal */}
      <polygon points="268,72 300,90 300,126 268,144 236,126 236,90" />
      <circle cx={268} cy={108} r={16} />
      {/* vis */}
      <polygon points="220,190 236,180 252,190 252,206 236,216 220,206" />
      <rect x={252} y={190} width={110} height={16} />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={262 + i * 8} y1={190} x2={258 + i * 8} y2={206} className="opacity-50" />
      ))}
      {/* joint torique */}
      <ellipse cx={110} cy={232} rx={50} ry={14} />
      <ellipse cx={110} cy={232} rx={40} ry={9} />
      <Callout x={110} y={81} tx={170} ty={36} label="Roulement" />
      <Callout x={300} y={198} tx={280} ty={256} label="Visserie" />
    </>
  ),
  excavator: (
    <>
      {/* chenille */}
      <rect x={52} y={214} width={196} height={40} rx={20} />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={74 + i * 38} cy={234} r={10} />
      ))}
      {/* tourelle et cabine */}
      <path d="M66 214 V176 H226 V214" />
      <path d="M150 176 V118 H200 L214 140 V176" className="fill-signal/10 stroke-signal" />
      <path d="M160 126 H196 L206 142 H160 Z" className="opacity-60" />
      <rect x={70} y={160} width={60} height={16} className="opacity-60" />
      {/* flèche */}
      <path d="M200 160 L262 72 L276 80 L222 170" />
      {/* balancier */}
      <path d="M262 72 L330 120 L322 132 L270 96" />
      {/* vérins */}
      <line x1={214} y1={170} x2={250} y2={104} strokeWidth={4} className="opacity-60" />
      <line x1={270} y1={66} x2={318} y2={100} strokeWidth={4} className="opacity-60" />
      {/* godet */}
      <path d="M330 120 L360 148 L350 180 L316 172 L322 132" />
      {[0, 1, 2].map((i) => (
        <line key={i} x1={320 + i * 10} y1={173 + i * 2} x2={316 + i * 10} y2={184 + i * 2} />
      ))}
      <line x1={20} y1={254} x2={380} y2={254} className="opacity-40" />
      <Dim x1={30} y1={118} x2={30} y2={254} label="" />
      <Callout x={186} y={150} tx={120} ty={60} label="Cabine" />
      <Callout x={340} y={160} tx={300} ty={280} label="Godet" />
    </>
  ),
  bench: (
    <>
      {/* banc d'essai : bâti, moteur sous test, frein */}
      <rect x={40} y={210} width={320} height={20} />
      <path d="M60 230 V258 M340 230 V258" />
      <rect x={70} y={120} width={130} height={90} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={82 + i * 30} y={100} width={22} height={20} rx={2} />
      ))}
      <line x1={200} y1={165} x2={250} y2={165} strokeWidth={3} />
      <circle cx={280} cy={165} r={34} className="fill-signal/10 stroke-signal" />
      <circle cx={280} cy={165} r={10} />
      {/* afficheur */}
      <rect x={250} y={50} width={100} height={56} />
      <path d="M262 92 L282 74 L298 84 L320 62 L338 70" className="stroke-signal" />
      <line x1={300} y1={106} x2={300} y2={131} strokeDasharray="3 3" />
      <Callout x={280} y={165} tx={330} ty={274} label="Frein" />
      <Callout x={130} y={160} tx={110} ty={60} label="Organe testé" />
    </>
  ),
};

export const figureLabels: Record<FigureKey, string> = {
  engine: "Moteur diesel industriel",
  pump: "Pompe hydraulique à pistons",
  gearbox: "Boîte de vitesses",
  reducer: "Réducteur planétaire",
  injector: "Injecteur diesel",
  parts: "Pièces de rechange",
  excavator: "Pelle hydraulique",
  bench: "Banc d’essai",
};

export function Figure({ name, className }: { name: FigureKey; className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      {drawings[name]}
    </svg>
  );
}
