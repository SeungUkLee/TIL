# Git 기본 명령어 요약

## 툴 구성

모든 로컬 저장소 에 대한 사용자 정보 구성

```bash
$ git config --global user.name "[name]"
# Coomit Transaction 에 원하는 이름을 붙이는 설정

$ git config --global user.mail "[email address]"
# Commit Transaction 에 원하는 이메일을 설정

$ git config --global color.ui auto
# 명령줄 출력시 가독성을 부여할 자동 색상 기능 활성화
```

## 저장소 생성

새 정장소를 시작하거나 기존 URL에서 가져오기

```bash
$ git init [project-name]
# 지정된 이름을 새로운 로컬 저장소 생성

$ git clone [url]
# 프로젝트 및  전체 버전 히스토리를 다운로드
```

## 검토 및 커밋

편집한 파일을 리뷰하고 Commit Transaction 만들기

```bash
$ git status
# 새로운 파일이나 Commit 되기 위한 수정된 파일 모두 나열

$ git diff
# 아직 올려 지기 전 파일의 차이점들 나열

$ git add [file]
# 버전 관리에 대비한 파일 스냅샷

$ git diff --staged
# 올려진 파일과 가장 마지막 버전의 파일의 차이점들 나열

$ git reset [file]
# 올리지는 않고 그 내용은 보존하기

$ git commit -m "[descriptive message]"
# 버전 히스토리 상에서 영구적으로 파일 스냅샷 기록
```

## 커밋 그룹화

일련의 Commit 들에 이름을 지정하고 완성된 노력물들을 결합

```bash
$ git branch
# 현 저장소에 있는 모든 로컬 브렌치 나열

$ git branch [branch-name]
# 새로운 브렌치 새성

$ git checkout [branch]
# 현재 작업중 브렌치에서 체크아웃하고 다른 브레친로 전환하기

$ git merge [branch]
# 지정된 브렌치의 기록을 현 브렌치에 결합

$ git branch -d [branch-name]
# 지정된 브렌치를 삭제
```

## 파일명 리펙토링

각 버전들의 파일들을 재배치 및 제거

```bash
$ git rm [file]
# 저장소를 제거하고 관련된 브렌치도 제거하기

$ git rm --cached [file]
# 버전 관리의 파일을 삭제 - 로컬에서는 파일 보존

$ git mv [file-original] [file-renamed]
# 파일이름을 변경하고 Commit 할 준비하기
```

## 히스토리 제거

임시 파일과 경로들을 제외하기

```bash
*.log
build/
temp-*
# .gitignore 라는 텍스트 파일은 지정된 패턴과 일치하는 파일 및 경로의 우별적인 버전을 표시하지 않음

$ git ls-files --other --ignored --exclude-standard
# 해당 프로젝트에서 무시됐던 파일들 모두 나열
```

## 프래그먼트 저장

미완성된 변경사항들을 복원하거나 저장하기

```bash
$ git stash
# 수정된 모든 추적파일을 임시로 저장

$ git stash pop
# 가장 최근에 숨겨진 파일을 복원

$ git stash list
# 숨겨진 모든 checkout 을 나열

$ git stash drop
# 가장 최근 숨겨진 changeset 을 버리기
```

## 히스로티 리뷰

```bash
$ git log
# 현 브렌치의 버전 기록을 나열

$ git log --follow [file]
# 이름 변경을 포함하여 파일의 버전기록 나열

$ git diff [first-branch]...[seceond-branch]
# 두 브렌치 사이에 내용의 차이점 표시
```

## COMMIT 다시하기

```bash
$ git reset [commit]
# [commit] 이후의 모든 commit 을 되돌리기 - 로컬상에서는 변경사항
$ git reset --hard [commit]
# 지정된 commit 까지의 모든 기록과 변경점들을 버리기
```

## 변경 내역 동기화 하기

```bash
$ git fetch [bookmark]
# 저장소 북마크에서 모든 기록 다운로드

$ git merge [bookmark]/[branch]
# 북마크의 브렌치를 현 로컬 브렌치에 결합

$ git push [alias] [branch]
# 모든 로컬 Commit 들을 Github 에 업로드

$ git pull
# 북마크 기록 다운로드 및 변경점들을 결합
```