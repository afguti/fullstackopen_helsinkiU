# 0.6 New note in Single page app diagram

```mermaid
sequenceDiagram
    participant Browser
    participant Server

    Browser->>Browser: Render form elements
    Browser->>Server: GET /exampleapp/data.json
    Server-->>Browser: JSON data
    Browser-->>Browser: Update 'notes' array
    Browser-->>Browser: Redraw notes UI

    alt Form submission
        Browser->>Browser: Capture form data
        Browser->>Browser: Create 'note' object
        Browser->>Browser: Add 'note' to 'notes' array
        Browser->>Browser: Clear form input
        Browser->>Browser: Redraw notes UI
        Browser->>Server: POST /exampleapp/new_note_spa
        Server-->>Browser: 201 Created
    end
```

# Diagram that depicts the full scenario from the moment the browser sends the first request to the server until form is used in the browser side and data is send to the server.

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
    Browser->>Browser: Execute JavaScript

    alt AJAX request for data.json
        Browser->>Browser: Create XMLHttpRequest object
        Browser->>Server: GET /exampleapp/data.json
        Server-->>Browser: JSON data
        Browser-->>Browser: Update 'notes' array
        Browser-->>Browser: Redraw notes UI
    end

    alt Form submission
        Browser->>Browser: Capture form data
        Browser->>Browser: Create 'note' object
        Browser->>Browser: Add 'note' to 'notes' array
        Browser->>Browser: Clear form input
        Browser->>Browser: Redraw notes UI
        Browser->>Server: POST /exampleapp/new_note_spa
        Server-->>Browser: 201 Created
    end
```
