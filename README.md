# TaskTracker

A full-stack task management app built with Next.js, Express, PostgreSQL, and Kafka, featuring real-time activity tracking via polling.

This project explores:

- Clean REST APIs

- Event-driven architecture with Kafka

- Modern Next.js App Router patterns

- Simple but polished UI design


## ✨ Features

✅ Create, update, delete tasks

📄 Task detail pages

📊 Activity feed powered by Kafka events

🔄 Near real-time updates via client-side polling

🎨 Clean, modern UI with custom icons and branding

🧩 Monorepo setup (frontend + backend)


## 🧠 Event Flow (Kafka)

- User creates / updates / deletes a task

- API emits a Kafka event (task.created, task.updated, task.deleted)

- Kafka consumer processes the event

- Activity is persisted to the database

- Frontend polls the activity endpoint and updates the UI

- This keeps the write path fast while decoupling side effects.


## 🚀 Tech Stack
### Frontend

- Next.js (App Router)

- React

- TypeScript

- CSS Modules

### Backend

- Node.js

- Express

- PostgreSQL

- Kafka (Confluent Cloud)

- KafkaJS
