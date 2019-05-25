# Git tag command

* 특정 커밋에 태그 추가

``` bash
$ git tag [tag_name] [commit_id]
```

* 추가한 태그를 remote master branch 에 적용

```bash
$ git push --tags origin master
```

* 로컬 태그 삭제

```bash
$ git tag -d [tag_name]
```

* remote master branch 에 푸시된 ㅋ태그 삭제

```bash
$ git push origin :[tag_name]
```

