# Git 기본 명령어 요약

## 툴 구성

모든 로컬 저장소 에 대한 사용자 정보 구성

```bash
$ git config --global user.name "[name]"

$ git config --global user.mail "[email address]"

$ git config --global color.ui auto
```

## 저장소 생성

```bash
$ git init [project-name]

$ git clone [url]
```

## 검토 및 커밋

```bash
$ git status

$ git diff


$ git add [file]

$ git diff --staged

$ git reset [file]

$ git commit -m "[descriptive message]"
```

## 커밋 그룹화

```bash
$ git branch

$ git branch [branch-name]

$ git merge [branch]

$ git branch -d [branch-name]
```

## 파일명 리펙토링

```bash
$ git rm [file]

$ git rm --cached [file]

$ git mv [file-original] [file-renamed]
```

## 히스토리 제거

```bash
*.log
build/
temp-*

$ git ls-files --other --ignored --exclude-standard
```

## 프래그먼트 저장

```bash
$ git stash

$ git stash pop

$ git stash list

$ git stash drop
```

## 히스로티 리뷰

```bash
$ git log

$ git log --follow [file]

$ git diff [first-branch]...[seceond-branch]
```

## COMMIT 다시하기

```bash
$ git reset [commit]

$ git reset --hard [commit]
```

## 변경 내역 동기화 하기

```bash
$ git fetch [bookmark]

$ git merge [bookmark]/[branch]

$ git push [alias] [branch]

$ git pull
```