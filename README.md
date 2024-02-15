# ThemeForge

키워드-디자인 테마 생성기

- 목표
  - 키워드에서 테마 데이터를 추출하고 적용해볼 수 있는 페이지 제공 프로젝트

- 사용방법
  1. 키워드를 입력해 주세요.
  2. 생성할 테마 개수를 입력해 주세요.
  3. 모든 옵션을 정상적으로 설정하였다면, 생성 버튼을 누르거나 엔터 키를 입력하세요.

- 서비스 URL
  - 실행 url : [https://Zeyakim.github.io/themeforge](https://Zeyakim.github.io/themeforge)
  - github url : [https://github.com/ZeyaKim/themeforge](https://github.com/ZeyaKim/themeforge)

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

- figma로 초기 화면 구성을 디자인하였음. 와이어프레임을 하려다가 더 나가서 와이어프레임 대신 화면 디자인을 첨부하였음.
![와이어프레임](https://github.com/ZeyaKim/themeforge/assets/118428615/28ca2f48-57b8-4083-a246-6b35660764b4)

### 폴더 구조

```plaintext
📦themeforge
 ┣ 📂assets
 ┃ ┣ 📜banner.jpg
 ┃ ┗ 📜logo.jpg
 ┣ 📂docs
 ┃ ┣ 📜class diagram.md
 ┃ ┣ 📜sequence diagram.md
 ┃ ┗ 📜wbs.md
 ┣ 📂src
 ┃ ┣ 📜chatgpt_client.js
 ┃ ┣ 📜example_theme.js
 ┃ ┣ 📜saved_theme.js
 ┃ ┣ 📜theme.js
 ┃ ┗ 📜theme_manager.js
 ┣ 📜index.html
 ┣ 📜index.js
 ┣ 📜README.md
 ┗ 📜style.css
```

### 모듈 구조

```mermaid
---
title: ThemeForge Module Structure
---

classDiagram
    class Index {

    }

    class ChatGptClient {
        +GPT_API_URL: string
        +gpt_role: string
        +apiPost(string, string): Promise<string>
        +createRequest(string, number): Object
        +createRequestBody(string, number): string
        +createUserMessage(string, number): string
    }

    class ThemeManager {
        +exampleThemes: ExampleTheme[]
        +savedThemes: SavedTheme[]
        +defaultTheme: Theme
        +loadSavedThemes(): undefined
        +createExampleThemes(string): Object[]
        +isAlreadySaved(string): boolean
        +clearExampleThemesList(): undefined
        +insertThemesInList(Theme[], HTMLElement): undefined
        +setEventListenersForExampleThemes(Theme[]): undefined
        +setStyleForExampleThemes(Theme[]): undefined
        +saveExampleTheme(string): undefined
        +setEventListenersForSavedThemes(SavedTheme[]): undefined
        +applyTheme(Theme): undefined
        +deleteSavedTheme(Theme): undefined
        +resetTheme(): undefined
    }

    class Theme {
        +themeId: string
        +keyword: string
        +primaryColor: string
        +actionColor: string
        +backgroundColor: string
        +fontColor: string
        +toJson(): Object
    }

    class ExampleTheme {
        +themeId: string
        +keyword: string
        +primaryColor: string
        +actionColor: string
        +backgroundColor: string
        +fontColor: string
        +html: string
        +toJson()
    }

    class SavedTheme {
        +themeId: string
        +keyword: string
        +primaryColor: string
        +actionColor: string
        +backgroundColor: string
        +fontColor: string
        +html: string
        +toJson()
    }

    Index ..> ChatGptClient
    Index ..> ThemeManager
    ThemeManager ..> Theme
    ThemeManager --> ExampleTheme
    ThemeManager --> SavedTheme
    SavedTheme --|> Theme
    ExampleTheme --|> Theme
```

### Sequence Diagram

#### 키워드 제출
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

#### 테마 저장

```mermaid
---
title: save Example Theme
---
sequenceDiagram
    actor User
    participant Browser
    participant Index
    participant ThemeManager
    participant ExampleTheme

    User->>Browser: 테마 저장 버튼 클릭
    Browser-)ThemeManager: 클릭된 테마의 themeId id 전달
    ThemeManager->>ThemeManager: 클릭된 테마를 리스트에서 검색
    ThemeManager->>ExampleTheme: 클릭된 테마의 정보를 json화
    ExampleTheme-->>ThemeManager: json화된 정보 전달
    create participant SavedTheme
    ThemeManager->>SavedTheme: 정보를 바탕으로 SavedTheme 객체 생성 후 리스트 삽입
    ThemeManager-)Browser: json화된 정보를 세션 스토리지에 저장
    destroy ExampleTheme
    ThemeManager-xExampleTheme: 예제 테마 리스트 초기화
    ThemeManager-)Browser: 저장된 테마 리스트 요청
    Browser--)ThemeManager: 저장된 테마 리스트 전달
    ThemeManager-)Browser: 저장된 테마 리스트 요소 요청
    Browser--)ThemeManager: 저장된 테마 리스트 요소 전달
    ThemeManager-)Browser: 저장된 테마 리스트 요소에 이벤트 리스너 추가
    ThemeManager-)Browser: 테마 객체를 UI에 표시 
```

## 개발 히스토리

### 개발 동기

- 프로젝트 주제보다 디자인을 먼저 생각하고 있었는데, 어떤 컬러로 테마를 구성할까 고민하면서 ChatGPT에게 물어보았다. 그러다 키워드에서 컬러 테마를 추출하는 서비스를 만들어 보면 어떨까 생각하게 되었다.

### 트러블슈팅

- ChatGPT에게 Json Format Array로 데이터를 받아오기로 했는데, 가끔 답변이 json 형식이 아닌 경우가 있었다. 그래서 Shot 기법을 사용하여, 정상적인 답변의 예시를 첨부하니 해결되었다.

- css 변수, js 내 html/css, html id를 오가다 보니 네이밍 케이스를 제대로 식별하지 못하는 경우가 있었다. 그래서 네이밍 케이스를 통일하고, 변수명을 명확하게 지정하여 개발하였다.

## 참고

- [https://brunch.co.kr/@chulhochoiucj0/17](https://brunch.co.kr/@chulhochoiucj0/17)
  - 색상 설정에 대한 이론적인 지식을 많이 참고해서 프롬프트에 적용하였다.
