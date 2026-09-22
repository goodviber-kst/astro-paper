# Personal resume & dbt notes

이 저장소는 [AstroPaper](https://github.com/satnaing/astro-paper)를 포크해 만든 개인 사이트입니다. Vercel과 연결되어 있으므로 `main` 브랜치에 푸시하면 Vercel이 자동으로 새 버전을 배포합니다.

## 처음 한 번만 설정하기

`astro-paper.config.ts`를 열어 아래 항목을 본인 정보로 바꿉니다.

| 항목                             | 설정할 내용                                          |
| -------------------------------- | ---------------------------------------------------- |
| `site.url`                       | 실제 Vercel 도메인. 예: `https://my-site.vercel.app` |
| `site.title`, `site.description` | 사이트 이름과 한 줄 소개                             |
| `site.author`, `site.profile`    | 이름과 대표 프로필 URL                               |
| `site.lang`, `site.timezone`     | 한국어 사이트라면 `ko`, `Asia/Seoul`                 |
| `socials`                        | 사용할 GitHub·LinkedIn·이메일만 남기고 URL 교체      |
| `features.editPost.url`          | 내 포크 저장소의 `.../edit/main/` 주소               |

설정 값에 남아 있는 AstroPaper 예시 URL·계정은 공개 전에 반드시 바꿉니다.

## 이력서 업데이트

이력서는 [`src/content/pages/about.md`](src/content/pages/about.md)에 있습니다. 대괄호(`[]`) 안의 안내 문구를 지우고 아래 정도만 작성하면 충분합니다.

- 한 줄 소개와 연락 방법
- 핵심 기술 또는 관심 분야
- 경력·프로젝트: 기간, 역할, 성과 또는 사용 기술
- 학력·자격·링크(선택)

이 파일을 저장하면 `/about` 페이지에 반영됩니다. 주민등록번호, 상세 주소, 개인 전화번호처럼 공개할 필요 없는 정보는 넣지 않습니다.

## dbt 컨퍼런스 후기 작성

후기는 `src/content/posts/` 아래에 Markdown 파일로 만듭니다. 예를 들어 `src/content/posts/dbt-conference-2026.md`를 만들고 아래 양식을 사용합니다.

```md
---
title: "dbt 컨퍼런스 2026 후기"
description: "컨퍼런스에서 얻은 핵심 인사이트와 적용 계획"
pubDatetime: 2026-09-12T09:00:00+09:00
tags:
  - dbt
  - conference
draft: true
---

## 한눈에 보기

- 행사: [행사명 / 장소 / 날짜]
- 가장 좋았던 세션: [세션명]

## 핵심 인사이트

### [세션 또는 주제]

무엇을 배웠는지, 왜 중요한지, 내 업무에 어떻게 적용할지를 적습니다.

## 다음 행동

- [ ] [실제로 해볼 일]
```

`title`, `description`, `pubDatetime`은 필수입니다. 초안은 `draft: true`로 두고, 공개할 때 `false`로 바꾸거나 해당 줄을 삭제합니다. 파일명과 하위 폴더 이름은 글 URL의 일부가 됩니다. 이미지가 필요하면 `src/assets/blog/<글-slug>/`에 넣고 본문에서 상대 경로로 참조합니다.

## 발행 전 확인과 배포

```bash
pnpm install       # 처음 한 번만
pnpm dev           # http://localhost:4321 에서 미리 보기
pnpm format:check  # 서식 확인
pnpm lint          # 코드 검사
pnpm build         # 타입 검사와 프로덕션 빌드
```

이력서나 글을 수정한 뒤에는 다음 순서로 진행합니다.

1. `pnpm dev`로 `/about`과 새 글 URL을 확인합니다.
2. `pnpm format:check && pnpm lint && pnpm build`를 통과시킵니다.
3. 변경사항을 커밋하고 `main`에 푸시합니다.
4. Vercel 배포가 완료된 뒤 실제 도메인에서 글·이미지·공유 미리보기를 확인합니다.

### 로컬 초안을 실제 배포로 올리기

로컬에서 글을 확인한 뒤 실제 사이트에 공개하려면 먼저 해당 글의 frontmatter를 바꿉니다.

```md
draft: false
```

그다음 필요한 파일만 골라 커밋하고 푸시합니다. 예를 들어 dbt Summit 2026 1일차 글은 다음 흐름을 사용합니다.

```bash
cd /Users/user/astro-paper

npx --yes pnpm@10.24.0 build

git status --short

git add src/content/posts/dbt-summit-2026-02-day-1.md \
  src/assets/blog/dbt-summit-2026-02-day-1 \
  src/pages/posts/[...slug]/index.astro \
  notes/dbt-summit-2026

git commit -m "Add dbt Summit 2026 day 1 post"

git push origin main
```

`main` 브랜치에 푸시하면 Vercel이 자동 배포를 시작합니다. `git add -A`는 사용하지 않는 편이 안전합니다. 로컬에는 임시 파일이나 메모 파일이 함께 있을 수 있으므로, 배포에 필요한 Markdown, 이미지, 라우트, 근거 노트만 직접 지정해서 추가합니다.

## 자주 수정하는 위치

| 목적                           | 파일                           |
| ------------------------------ | ------------------------------ |
| 사이트 이름, 도메인, 소셜 링크 | `astro-paper.config.ts`        |
| 이력서 / 소개                  | `src/content/pages/about.md`   |
| dbt 컨퍼런스 후기 등 블로그 글 | `src/content/posts/*.md`       |
| 공개 이미지                    | `public/` 또는 글 파일 옆 폴더 |

원본 테마의 라이선스와 상세 문서는 [upstream repository](https://github.com/satnaing/astro-paper)를 참고합니다.
