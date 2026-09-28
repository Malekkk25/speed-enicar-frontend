# SpeedENICar: Frontend

Angular web app for **SpeedENICar**, a student support platform for ENICarthage. It connects students, psychologists and the scolarity (academic affairs) office in one place: appointment booking, video consultations, mood and journal tracking, absences, documents and risk alerts.

> Backend repository: [speed-enicar-backend](https://github.com/Malekkk25/speed-enicar-backend) (Spring Boot REST API + WebSocket)

## Features

Access is role-based (`STUDENT`, `PSYCHOLOGIST`, `SCOLARITY`), enforced with route guards and a JWT interceptor.

### Student
- Dashboard, academic overview and absences
- Book and follow psychologist appointments
- Mood tracker and personal journal
- Report academic difficulties
- Upload and track documents

### Psychologist
- Dashboard with today's and pending appointments
- Appointment list and detail
- Student overview and history
- Confidential records (create, edit, view)
- Student alerts with detail view
- Schedule / availability management
- Documents

### Scolarity
- Student management
- Absence tracking (prolonged absences, justification)
- At-risk student analysis
- Document review

### Shared
- **Video consultations**: WebRTC calls between student and psychologist, with signaling over WebSocket (STOMP/SockJS)
- **Real-time notifications** with a notification bell
- JWT authentication with route guards by role

## Tech stack

- Angular 17 (standalone components, lazy-loaded feature routes)
- Angular Material and CDK
- RxJS
- STOMP (`@stomp/stompjs`) and SockJS for WebSocket messaging
- WebRTC for video calls

## Getting started

### Prerequisites

- Node.js 18+ and npm
- The [backend](https://github.com/Malekkk25/speed-enicar-backend) running (default `http://localhost:8088`)

### Install and run

```bash
git clone https://github.com/Malekkk25/speed-enicar-frontend.git
cd speed-enicar-frontend
npm install
npm start
```

Open <http://localhost:4200>.

### Configuration

API and WebSocket URLs are set in `src/enviroments/`:

```ts
// environment.ts (development)
apiUrl: 'http://localhost:8088/api',
wsUrl: 'http://localhost:8088/ws',
```

Update `environment.prod.ts` with your production URLs before building.

### Build

```bash
npm run build
```

## Project structure

```
src/app/
├── core/
│   ├── guards/          # authGuard, roleGuard
│   ├── interceptors/    # JWT interceptor
│   ├── models/          # shared TypeScript interfaces
│   └── services/        # auth, student, psychologist, consultation,
│                        # notification, documents, WebRTC signaling
└── features/
    ├── auth/            # login
    ├── student/         # student space
    ├── psychologist/    # psychologist space
    ├── scolarity/       # academic affairs space
    ├── Consultation/    # video call, notification bell
    └── dashboard/
```

## Author

**Malek** ([@Malekkk25](https://github.com/Malekkk25))
