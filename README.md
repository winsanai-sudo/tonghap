# RYU Project Hub

지금까지 만든 웹페이지를 하나의 랜딩 페이지에서 여는 정적 프로젝트 허브입니다.

## 수정 방법

프로젝트 추가, 이름 변경, 버튼 주소 변경은 `data/projects.js`만 수정하면 됩니다.

- `name`: 버튼과 카드에 보이는 이름
- `category`: 상단 필터 분류
- `description`: 짧은 설명
- `url`: 밖에서도 접속 가능한 공개 주소
- `localPath`: 내 컴퓨터에서 미리보기용으로 여는 파일 경로

밖에서도 누구나 접속하게 만들려면 각 프로젝트를 Netlify, Vercel, GitHub Pages 등에 올린 뒤 `url`에 공개 주소를 넣으면 됩니다. `url`이 비어 있으면 현재 컴퓨터의 `localPath`를 사용합니다.

## 배포

이 폴더 전체를 정적 사이트로 배포하면 됩니다. 빌드 명령은 필요 없습니다.

- Publish directory: `.`
- Build command: 비워두기

## Render로 공개하기

이 저장소에는 Render Blueprint 설정인 `render.yaml`이 포함되어 있습니다.

1. 이 폴더를 GitHub 저장소에 push합니다.
2. Render Dashboard에서 New > Blueprint를 선택합니다.
3. GitHub 저장소를 연결합니다.
4. Render가 `render.yaml`을 읽으면 `ryu-project-hub` 정적 사이트가 생성됩니다.
5. 배포가 끝나면 `https://...onrender.com` 공개 주소가 만들어집니다.

Render Dashboard에서 Static Site로 직접 만들 경우에는 아래 값만 넣으면 됩니다.

- Build Command: `echo "No build required"`
- Publish Directory: `.`
