# Git Remote로 잘못 push된 디렉토리 삭제하기

`.gitignore` 을 설정하지 않고 github(git remote) 에 잘못 push 하였을 경우 삭제하는 방법이 있다.

예를 들어 Jetbrains IDE 를 사용하는경우 `.idea` 디렉토리가 생기는데 실수로 push 되었고 이를 삭제한다고 가정하자.

이는 다음과 같이 명령을 수행하면 해결할 수 있다.

~~~ bash
$ git rm -r --cached .idea
$ git commit -m "MESSAGE"
$ git push origin master
~~~

확인해보면 .idea 디렉토리가 삭제된 것을 확인할 수 있다.

`git rm` 명령어의 option 은 다음과 같다. 

~~~ bash
$ git rm -r --help
usage: git rm [<options>] [--] <file>...

    -n, --dry-run         dry runㅑ
    -q, --quiet           do not list removed files
    --cached              only remove from the index
    -f, --force           override the up-to-date check
    -r                    allow recursive removal
    --ignore-unmatch      exit with a zero status even if nothing matched
~~~


## Reference
[Remove directory from remote repository after adding them to .gitignore](https://stackoverflow.com/questions/7927230/remove-directory-from-remote-repository-after-adding-them-to-gitignore)

[Git Remote로 잘못 push 된 디렉토리 삭제하기](http://mobicon.tistory.com/266)
