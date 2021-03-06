# 운영체제
* 컴퓨터 하드웨어를 관리하는 프로그램.
* 컴퓨터 사용자와 컴퓨터 하드웨어 사이에서 중개하는 역할.
* 자원 할당자 (resource allocator) - 작업을 위해 특정 프로그램과 사용자에게 필요한 자원을 할당.
* CPU 시간, 메모리 공간, 파일 저장 공간, I/O 장치 등 여러가지 자원들(하드웨어/소프트웨어)을 관리하여 동작.
* 컴퓨터 시스템을 효율적이고 공정하게 운영 할 수 있도록 어느 요청에 자원을 할당할지를 결정해야된다. - 이는 동시에 접근하는 사용자들이 많은 경우 특히 중요.


## 컴퓨터 시스템의 구성
### 컴퓨터 시스템 연산
컴퓨터 시스템은 공유 메모리에 대한 접근을 제공하는 공통 버스에 의해 연결된 여러 개의 *장치 제어기*와 *하나 이상의 CPU*로 구성되어 있다.

이 때 장치 제어기와 CPUㄴ은 메모리 사이클을 얻기 위해 경쟁하면서 병행 수행될 수 있다.
공유 메모리에 대한 질서 있는 접근을 보장하기 위해 *메모리 제어기*가 있으며 이것은 메모리 접근을 동기화시키는 일을 한다.

컴퓨터를 구동하기 위해 초기 프로그램(bootstrap program)을 가져와 ROM에 저장하며 이는 CPU 레지스터로부터 장치 제어기, 메모리 내용 등을 포함한 시스템의 모든 면을 초기화한다.

부트스트랩은 OS를 적재 및 시작하는 방법을 알기 위해 OS의 커널을 찾아 메모리에 적재해야한다. 그 후 OS는 "init" 와 같은 프로세스를 실행하고 event가 발생하면 interrupt(인터럽트) 에 의해 신호가 보내어지는데 하드웨어는 시스템 버스를 통해 CPU에 신호를 보내 인터럽트를 발생하며 소프트웨어는 **System call(시스템 콜)** 을 실행하여 인터럽트를 발생시킨다.

CPU가 인터럽트되면 하던 일을 중단하고 인터럽트를 위한 서비스 루틴이 위치한 시작 주소로 실행을 옮긴다.