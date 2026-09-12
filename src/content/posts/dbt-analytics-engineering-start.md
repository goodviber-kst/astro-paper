---
title: "Analytics Engineer를 위한 dbt 시작점"
description: "dbt로 SQL 변환을 코드, 테스트, 문서화 가능한 데이터 제품으로 다루는 가장 작은 단위의 워크플로우."
pubDatetime: 2026-09-12T10:00:00+09:00
tags:
  - dbt
  - analytics
  - data-engineering
---

dbt는 SQL로 작성한 변환 로직을 버전 관리하고, 검증하고, 문서화하는 데 집중하게 해준다. Analytics Engineer에게 중요한 변화는 **쿼리를 한 번 실행하는 일**이 아니라 **다른 사람이 신뢰하고 재사용할 데이터 제품을 만드는 일**로 작업 단위를 바꾸는 데 있다.

## 가장 작은 프로젝트 구조

처음에는 복잡한 계층보다 세 가지 규칙이면 충분하다.

1. 원본 데이터와 가까운 모델에는 이름·타입·기본 품질 테스트를 둔다.
2. 비즈니스 로직은 모델 하나가 한 가지 질문에 답하도록 작게 나눈다.
3. 소비자가 보는 최종 모델에는 설명, 소유자, 지표의 정의를 함께 남긴다.

```sql
-- models/marts/fct_orders.sql
select
  order_id,
  customer_id,
  ordered_at,
  amount
from {{ ref('stg_orders') }}
where status = 'completed'
```

이 모델에 `unique`, `not_null` 같은 테스트와 설명을 추가하면, 변경 사항을 리뷰할 때 SQL 결과뿐 아니라 데이터 계약도 함께 검토할 수 있다.

## 다음 행동

새 dbt 프로젝트를 시작한다면 가장 많이 쓰이는 지표 하나를 골라 모델·테스트·문서 세 가지를 한 번에 작성해 보자. 이 작은 흐름이 쌓이면 lineage와 CI가 팀의 공통 언어가 된다.
