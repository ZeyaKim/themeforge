# Sequence Diagram

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
