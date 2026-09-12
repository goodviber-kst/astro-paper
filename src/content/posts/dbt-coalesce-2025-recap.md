---
title: "dbt Coalesce 2025: Analytics Engineer가 가져갈 세 가지"
description: "Fusion, 상태 인지 오케스트레이션, MCP 발표을 데이터 팀의 실제 도입 판단으로 정리한 데모 노트."
pubDatetime: 2026-09-12T10:30:00+09:00
featured: true
tags:
  - dbt
  - conference
  - data-engineering
  - ai
---

> 이 글은 현장 후기가 아니라 dbt Labs의 Coalesce 2025 공식 발표와 온디맨드 세션을 바탕으로 작성한 데모 노트다.

Coalesce 2025의 메시지는 기능을 하나 더 추가했다기보다, **데이터 개발 경험·비용 관리·AI 거버넌스를 같은 컨텍스트 위에서 다루겠다**는 방향에 가까웠다. Analytics Engineer 입장에서 바로 살펴볼 만한 세 가지를 골랐다.

## 1. Fusion은 “더 빠른 실행”보다 개발 피드백 루프의 변화

dbt Labs는 Rust 기반 Fusion 엔진이 dbt Core보다 30배 빠르게 파싱하며, IntelliSense·정의 이동·리팩터링·CTE 미리보기와 `dbt compare` 같은 개발 경험을 제공한다고 발표했다. Core와의 호환성을 유지하되, Fusion은 당시 플랫폼과 로컬 개발 모두에서 Preview였다. [공식 Coalesce 발표](https://www.getdbt.com/blog/coalesce-2025-rewriting-the-future)

도입 판단에서 먼저 볼 것은 속도 벤치마크가 아니라 다음이다.

- 큰 프로젝트에서 컴파일·CI 대기 시간이 실제 병목인가?
- VS Code 기반의 리뷰와 디버깅 흐름을 팀 표준으로 만들 수 있는가?
- Preview 기능을 프로덕션 경로에 넣기 전, 별도 프로젝트에서 호환성을 검증했는가?

## 2. 상태 인지 오케스트레이션은 SLA를 코드로 옮기는 시도

Fusion 기반 프로젝트를 대상으로 한 Preview 기능인 state-aware orchestration은, 업스트림 데이터나 정의된 조건에 변화가 없으면 모델을 재사용하는 방식이다. dbt Labs는 베타 참여 팀에서 기본 사용만으로 평균 10%의 데이터 플랫폼 비용 절감, freshness 설정을 조정하면 추가 15% 이상 절감 가능성을 제시했다. 이 수치는 벤더의 베타 결과이므로 우리 환경의 절감 효과로 간주해서는 안 된다. [발표 상세](https://www.getdbt.com/blog/coalesce-2025-rewriting-the-future)

여기서의 실무 질문은 “모든 모델을 매번 실행할까?”가 아니다. 지표별 허용 지연 시간, 갱신 조건, 재사용해도 되는 모델을 명시할 수 있는가다. 비용 최적화는 결국 데이터 제품의 freshness 계약을 얼마나 명확히 정의했는지에 달려 있다.

## 3. AI에는 SQL 생성기보다 dbt 컨텍스트가 필요하다

Coalesce에서 dbt Labs는 remote MCP server의 GA와 dbt Agents 계획을 발표했다. 원격 MCP는 환경별 보안 엔드포인트로 dbt 프로젝트의 구조화된 컨텍스트에 AI 도구가 연결하도록 설계됐고, 에이전트는 모델 로직 설명·영향 분석·검증·변경 초안 같은 흐름을 목표로 했다. [공식 발표](https://www.getdbt.com/blog/coalesce-2025-rewriting-the-future)

AI를 붙이기 전에 더 먼저 정리할 것은 모델 설명, 테스트, ownership, lineage다. 이 메타데이터가 비어 있으면 에이전트는 빠르게 답할 수는 있어도 신뢰할 근거를 갖기 어렵다.

## 팀에 가져갈 체크리스트

- [ ] 현재 프로젝트의 컴파일·테스트 대기 시간을 측정한다.
- [ ] 핵심 marts에 freshness와 소유자 정보를 명시한다.
- [ ] MCP 또는 AI 도구는 읽기 전용 환경에서 lineage·문서 탐색부터 검증한다.
- [ ] Preview 기능은 별도 프로젝트에서 비용·호환성·운영 부담을 함께 평가한다.

Coalesce 2025의 전체 키노트와 세션 목록은 [Coalesce On-Demand](https://www.getdbt.com/resources/coalesce-on-demand)에서 확인할 수 있다.
