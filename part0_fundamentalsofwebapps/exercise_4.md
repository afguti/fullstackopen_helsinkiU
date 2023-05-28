# 0.4: New note diagram

```mermaid
sequenceDiagram
    participant Browser
    participant Server



    Browser->>Server: POST /exampleapp/new_note
    Server->>Server: Handle POST request

    alt Handle POST request
        Server->>Server: Retrieve note from request body
        Server->>Server: Add note to 'notes' array
        Server->>Server: Create new Date object
        Server->>Server: Update note with current date
        Server->>Server: Redirect to /notes
    end

    Server-->>Browser: 302 Found
    Browser->>Server: GET /notes.html
    Server-->>Browser: notes.html
    Browser->>Server: GET /main.css
    Server-->>Browser: main.css
    Browser->>Server: GET /main.js
    Server-->>Browser: main.js
    Browser->>Server: GET /data.json
    Server-->>Browser: data.json
```
