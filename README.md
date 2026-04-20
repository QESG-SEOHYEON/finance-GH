# GH 재무 캘린더

> GitHub Pages로 배포되는 개인 자산관리 PWA.
> 친구가 한 번 설치하면 이후 `git push` 한 번으로 자동 업데이트됩니다.

## 최초 배포 세팅 (네가 한 번만)

### 1. GitHub repo 생성
- GitHub.com → New repository
- 이름: 예) `finance-GH`
- Public (GitHub Pages 무료 조건) 또는 Private + Pro 이상 계정
- "Add README" 체크 해제 (이미 있음)

### 2. 로컬 폴더를 repo에 연결
```bash
cd /Users/diding/Desktop/friends-finance/GH
git init
git add .
git commit -m "initial: friend1 finance calendar"
git branch -M main
git remote add origin https://github.com/<YOUR_ID>/<REPO_NAME>.git
git push -u origin main
```

### 3. GitHub Pages 활성화
1. Repo → Settings → Pages
2. Source: **GitHub Actions** 선택
3. 첫 푸시 시 `.github/workflows/deploy.yml` 자동 실행
4. Actions 탭에서 빌드 완료 확인 (보통 1~2분)
5. 배포 URL: `https://<YOUR_ID>.github.io/<REPO_NAME>/`

### 4. 친구에게 전달
친구는 그 URL을 **Chrome**으로 접속 → 주소창 우측 "앱 설치" 클릭 → 끝.
- 아이폰/안드로이드도 공유→"홈 화면에 추가"로 가능
- 설치 후엔 서비스워커가 오프라인 동작 + 자동 업데이트 담당

## 업데이트 (패치)

코드 수정 → commit → push → **끝**.
```bash
git add -A && git commit -m "update: ..." && git push
```
- GitHub Actions가 자동 빌드·배포
- 친구가 앱을 다시 열면 서비스워커가 새 버전 감지 → 다음 방문 시 자동 반영

## 로컬 개발

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 배포본 빌드 테스트
npm run preview  # 빌드 결과 미리보기
```

## 친구별 커스터마이징 포인트

첫 배포 전 `src/db.js`의 `PROFILE` 상수, `src/schedule.js`, `src/lib/phase.js` 등을
친구 상황에 맞게 수정 후 push.
상세: 루트의 `TEMPLATE_SPEC.md` 참고.

## 데이터 저장

- 친구 브라우저의 IndexedDB (로컬 전용, 서버 전송 안 함)
- 브라우저 캐시 삭제 시 데이터 날아감 → 주의 안내 필요
- 기기 변경 시: CSV 내보내기/가져오기 기능 구현 권장 (TEMPLATE_SPEC §9)

## 자주 있는 이슈

**Q. 배포 URL 열었는데 404 나옴**
→ Repo 이름과 `vite.config.js`의 `base`가 다를 수 있음. 기본값은 환경변수 `GITHUB_REPOSITORY`에서 자동 추출되므로 GitHub Actions 빌드 시엔 문제없음. 로컬에서 테스트 중이라면 `BASE_PATH` 지정.

**Q. 친구가 설치 후에도 업데이트 안 됨**
→ Chrome에서 앱 우클릭 → "페이지 새로고침" 또는 ⌘R. 서비스워커가 한 템포 늦게 적용됨.

**Q. Private repo로 할 수 있나?**
→ GitHub Pro 이상 플랜 필요. 또는 Public repo + URL 비공개 유지(누가 알면 볼 수는 있음) 선택.
