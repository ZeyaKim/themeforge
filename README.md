# themeforge

키워드-디자인 테마 생성기

- 목표
  - 키워드에서 테마 데이터를 추출하고, 적용해 봄으로써 ui 디자인에 도움을 주는 서비스

- 사용방법
  - 생성할 테마 개수를 입력해 주세요.
  - 키워드를 입력해 주세요.
  - 모든 옵션을 정상적으로 설정하였다면, 생성 버튼을 누르거나 엔터 키를 입력하세요.

- 서비스 URL
  - 실행 url : [https://Zeyakim.github.io/themeforge]

## 설계

### 기술 스택

HTML, CSS, JavaScript

### 코딩 컨벤션

#### HTML

- tab size: 2
- tag: camelCase
- id: snake_case
- class: kebab-case

#### CSS

- tab size: 2
- property: kebab-case

#### JavaScript

- tab size: 2
- class: PascalCase
- variable: camelCase
- function: camelCase

### WBS

```mermaid
gantt
    title ThemeForge Project
    dateFormat  YYYY-MM-DD
    section 기획 
        기능 정의       : 2023-02-10, 2d
        기본 UI 구성 설계    : 2023-02-11, 2d

    section 디자인
        html/css 설계 : 2023-02-11, 2d
        figma 와이어프레임 작업 : 2023-02-12, 2d
    section 구현
        html/css 작업 : 2023-02-11, 3d
        ChatGptClient 구현 : 2023-02-12, 2d
        Theme 구현 : 2023-02-13, 2d
        ThemeManager 구현 : 2023-02-13, 2d
```

### 와이어프레임

- figma로 초기 화면 구성을 디자인하였음

![와이어프레임](https://github.com/ZeyaKim/themeforge/assets/118428615/b7dda4f2-5372-4fb1-ba62-9a9db3d6ce21)

### 폴더 구조

### 모듈 구조

### Sequence Diagram

```mermaid
---
title: Submit Theme Keyword
---
sequenceDiagram
    actor User
    participant Browser
    participant Index
    participant ChatGptClient
    participant ChatGptServer
    participant ThemeManager

    User->>Browser: 키워드, 테마 개수 입력
    Browser->>Index: 키워드, 테마 개수 제출
    Index-)Browser: 입력 필드 초기화
    Index->>ChatGptClient: 키워드, 테마 개수 전달
    activate ChatGptClient
    ChatGptClient-)ChatGptServer: 프롬프트 전달
    activate ChatGptServer
    ChatGptServer--)ChatGptClient: 테마 리스트를 Json Array로 전달
    deactivate ChatGptServer
    ChatGptClient-->>Index: Json 형식의 테마 리스트 전달
    deactivate ChatGptClient
    activate Index
    Index->>ThemeManager: Json 테마 리스트 파싱 후 전달
    deactivate Index
    activate ThemeManager
    loop
        ThemeManager->>Theme: 리스트에서 테마 객체 생성
    end
    loop 각 테마 객체에 대해
        ThemeManager-)Browser: 예제 테마 리스트 요청
        Browser--)ThemeManager: 예제 테마 리스트 전달
        ThemeManager->>Theme: 테마 객체에 이벤트 리스너 추가
    end
    loop 각 테마 객체에 대해
        ThemeManager-)Browser: 테마 객체를 UI에 표시
    end
    deactivate ThemeManager

```

## 개발 히스토리

### 개발 동기

- 프로젝트 주제보다 디자인을 먼저 생각하고 있었는데, 어떤 컬러로 테마를 구성할까 고민하면서 ChatGPT에게 물어보았다. 그러다 키워드에서 컬러 테마를 추출하는 서비스를 만들어 보면 어떨까 생각하게 되었다.
