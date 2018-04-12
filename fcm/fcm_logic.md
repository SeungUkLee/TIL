# FCM 
학교 선배들과 앱 애플리케이션 개발 프로젝트에 참여하고 있는데 이 프로젝트에 FCM을 사용할 것 같아 간단하게 작동원리를 정리해보았다.

우선 FCM(Firebase Cloud Message)이란, Android, iOS, Web 등의 클라이언트에 푸쉬 메시지를 보낼 수 있도록 하는 Google 서비스이다. 과거에 GCM(Google Cloud Message)에서 좀 더 진화한거라고 한다.

## FCM 작동원리
FCM 프로젝트 등록 및 단말기 등록 과정이다.

* Firebase 콘솔에서 프로젝트 등록. 이때 모바일 애플리케이션의 패키지 이름도 등록.
* [단말기] 앱을 처음 시작할 때 FCM SDK 가 FCM Server와 통신해서 해당 단말기를 식별할 수 있는 고유한 토큰(registration_id)를 얻을 수 있다.
* [단말기] 받은 토큰을 앱 서버에 제출.
* [서버] 토큰 저장을 요청한 단말기(사용자)를 식별하고 DB에 저장.

이제 FCM을 전송하는 과정을 살펴보자. 
* [서버] Push Message를 보낼 단말기의 토큰을 식별
* [서버] FCM Server에 토큰 목록과 단말에 보낼 메시지를 전달.
* [FCM Server] 요청 받은 메시지를 단말기에 전송.
* [서버] FCM Server에게 전송 요청하고 받은 응답에 따라 적절한 처리를 한다.(ex. registration_id 업데이트 등)

