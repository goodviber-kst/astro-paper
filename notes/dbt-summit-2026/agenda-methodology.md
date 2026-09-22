# 공식 아젠다 주제 집계

원문: https://www.getdbt.com/dbt-summit/agenda

2026-09-21 KST 기준. 공식 페이지에서 Show all sessions를 펼친 링크 168개를 URL 기준 중복 제거하면 166개다. 페이지의 공개 sessions 데이터도 고유 ID 166개로 일치한다.

`agenda-2026-09-21.json`에는 원문 세션 ID·제목·시간·형식·공식 customFields를 보관했다. `summarize-agenda.mjs`로 재계산한다.

## 분모와 중복 처리

- 공식 Track이 있는 118개만 주제 비중의 분모로 사용한다. 모든 세션은 트랙을 하나씩 갖고 있어 중복 배정하지 않는다.
- 같은 링크가 키노트 소개와 전체 목록 양쪽에 나타나는 경우는 한 번만 센다.
- 같은 제목의 재편성·재방송도 별도 ID와 시간대를 가지면 별도 회차로 센다. 고유 주제 수 또는 발표 시간 비중이 아니다.
- `dbt Product`와 `dbt product`는 같은 트랙으로 정규화한다.
- Track이 없는 48개: 교육 9, 시험 6, 네트워킹 13, 식사 6, 키노트 2, 실습 7, 브레이크아웃 2, 라이트닝 토크 2, 해커톤 1. 기술적 내용이 없는 48개라는 뜻이 아니다.

## 공식 트랙 통합표

| 본문 주제 | 공식 트랙 | 건수 |
| --- | --- | ---: |
| AI·에이전트·AI용 데이터 | Powering AI-ready data (20), Building agentic data workflows (14), AI and agentic analytics (7) | 41 |
| dbt 제품·v2 | dbt Product/product (21), Winning with dbt v2 (6) | 27 |
| Analytics Engineering 실무 | Analytics engineering best practices | 15 |
| 비즈니스 성과 | Delivering business outcomes | 12 |
| 데이터 현대화·아키텍처 | Data modernization & emerging architectures | 10 |
| 대규모 dbt 운영 | dbt at scale | 9 |
| 커리어·리더십 및 기타 전문 주제 | Data careers and data leadership (2), Practitioners at the edge (2) | 4 |

공식 트랙은 세션의 모든 내용을 표현하지 않는다. 제품 트랙에도 AI가 등장하므로 34.7%를 행사 전체에서 AI를 다룬 세션의 비율로 해석해서는 안 된다. 본문 설명은 트랙에 속한 세션 제목들을 바탕으로 요약했다.
