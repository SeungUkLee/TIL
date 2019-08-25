# Warning: Your dependencies could not be resolved. You likely have a mismatch in your sub-dependencies.

python 에 `black` 을 `pipenv` 를 이용하여 install 하다가 `Warning: Your dependencies could not be resolved. You likely have a mismatch in your sub-dependencies.` 과 같은 Warning 이 뜨면서 `ERROR: ERROR: Could not find a version that matches black` 에러가 뜨면서 install 할 수가 없었다. 

구글링을 통해 쉽게 해결할 수 있었다. `$ pipenv lock --pre --clear` 명령어를 실행하고 install 할 수 있었다. 참고한 사이트에 댓글에서 다음과 같은 추천사항도 있었다. 

다른 의존성을 설치하거나 Pipfile 에서 lock 할 때 특정 버전을 제공하는 것이 좋다고 한다.

예를들어서 

~~~ bash
$ pipenv install black==18.9b0
Installing black==18.9b0…
Adding black to Pipfile's [packages]…
✔ Installation Succeeded
Pipfile.lock not found, creating…
Locking [dev-packages] dependencies…
Locking [packages] dependencies…
✔ Success!
Updated Pipfile.lock (ae2883)!
Installing dependencies from Pipfile.lock (ae2883)…
  🐍   ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 5/5 — 00:00:00
To activate this project's virtualenv, run pipenv shell.
Alternatively, run a command inside the virtualenv with pipenv run.

$ pipenv lock
Locking [dev-packages] dependencies…
Locking [packages] dependencies…
✔ Success!
Updated Pipfile.lock (ae2883)!
~~~

만약 `pipenv lock --pre` 를 실행한다면 다른 dependencies 이 시험판 버전(ex. aiohttp==4.0.0.a0)으로 업데이트될 수 있다고 한다.

## Reference

[Warning: Your dependencies could not be resolved. You likely have a mismatch in your sub-dependencies.](https://github.com/python/black/issues/209)


