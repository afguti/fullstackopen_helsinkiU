# 0.6 New note in Single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa.json
    activate server

    Note right of browser: The browser executes the spa.js to add my new note to the list
```
