import { readFileSync } from 'node:fs';

const { sessions } = JSON.parse(readFileSync(new URL('./agenda-2026-09-21.json', import.meta.url)));
const groups = {
  'powering ai-ready data': 'AI·에이전트·AI용 데이터',
  'building agentic data workflows': 'AI·에이전트·AI용 데이터',
  'ai and agentic analytics': 'AI·에이전트·AI용 데이터',
  'dbt product': 'dbt 제품·v2',
  'winning with dbt v2': 'dbt 제품·v2',
  'analytics engineering best practices': 'Analytics Engineering 실무',
  'delivering business outcomes': '비즈니스 성과',
  'data modernization & emerging architectures': '데이터 현대화·아키텍처',
  'dbt at scale': '대규모 dbt 운영',
  'data careers and data leadership': '커리어·리더십 및 기타 전문 주제',
  'practitioners at the edge': '커리어·리더십 및 기타 전문 주제',
};
const counts = {};
let untagged = 0;
if (new Set(sessions.map(s => s.id)).size !== sessions.length) throw new Error('Duplicate session ID');
for (const session of sessions) {
  const tracks = session.customFields.find(f => f.name === 'Track')?.values ?? [];
  if (tracks.length === 0) { untagged++; continue; }
  if (tracks.length !== 1) throw new Error('Unexpected overlapping tracks');
  const group = groups[tracks[0].toLowerCase()];
  if (!group) throw new Error(`Unknown track: ${tracks[0]}`);
  counts[group] = (counts[group] ?? 0) + 1;
}
const denominator = sessions.length - untagged;
console.log(JSON.stringify({ total: sessions.length, untagged, denominator,
  groups: Object.entries(counts).sort((a,b) => b[1]-a[1]).map(([topic,count]) => ({topic,count,percent: +(count/denominator*100).toFixed(1)})),
}, null, 2));
