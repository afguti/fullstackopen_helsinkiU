# 0.5: Single page app diagram

The diagram depicts only what takes place when the browser request the server to send spa.html and the other files to be displayed and executed in the brower. In the file exercise_6 you will find the diagram that depicts what happen when the form is created.

```mermaid
sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server: GET /exampleapp/spa.html
    Server-->>Browser: spa.html
    Browser->>Server: GET /exampleapp/main.css
    Server-->>Browser: main.css
    Browser->>Server: GET /exampleapp/spa.js
    Server-->>Browser: spa.js
    Browser->>Server: GET /exampleapp/data.json
    Server-->>Browser: data.json

    Browser->>Browser: Render HTML and CSS
```
