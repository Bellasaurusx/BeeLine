# 🐝 BeeLine
BeeLine is a mobile-first app that helps users identify plants, map pollinator habitats, and learn sustainability practices that support local ecosystems. Built with React Native, Node/Express, PostgreSQL (Render), Leaflet, and the iNaturalist API.

## Introduction
BeeLine encourges ecological awareness through plant identification and pollinator habitat tracking. Users can take photos of plants, learn about their role in local ecosystems, and map what they discover in their area.

## Alpha Features (Current Development Goals)
- Save plant identification results to a personal collection
- View saved plants pinned on a map (Leaflet + OpenStreetMap)
- Filter plants by region, category, or date
- Edit or delete saved entries
- Sustainability/ecological tips displayed alongside plant info
- Light/Dark mode theme

### MVP (PLanned First Milestone)
- Capture or upload a plant image
- Identify plant using the iNaturlist API
- Display species details
- User account creation and login/logout
- Map view with user location
- Basic saved collection display

## Beta (Planned Next)
- Share collections publicly
- Community map overlays
- Notifications about local events
- Onboarding walkthrough
- Local plant activity/stats dahsboard 

## Technologies
| Layer | Technology |
|------|------------|
| Mobile App | React Native (Expo) |
| Backend API | Node.js + Express |
| Database | PostgreSQL (hosted on Render) |
| Plant Identification | iNaturalist API |
| Maps | Leaflet.js + OpenStreetMap |
| UI/Design Tools | Figma, Illustrator, Canva |

## Installation
Requires the Expo Go app.

1. Install Expo Go on your iOS or Android device.
2. Clone the repository:
    git clone https://github.com/Bellasaurusx/BeeLine.git
3. Navigate to the mobile app and start it:
    cd BeeLine/mobile
    npm install
    npx expo start
4. Scan the QR code with the Expo Go to launch the app on your device.

## Development Setup

## Requirements
- Node.js (LTS recommended)
- Git
- PostgreSQL database hosted on Render
- Expo CLI installed globally:
    npm install -g expo-cli

### Backend Setup (API)
1. Navigate to the backend folder:
    cd BeeLine/api
2. Install dependencies:
    npm install
3. Start the backend server:
    npm run dev
4. The API will run at http://localhost:3000

### Mobile Environment Setup
1. Create a .env file in BeeLine/mobile:
    API_URL=http://<your-computer-LAN-IP>:3000
    Example:
    API_URL=http://192.168.1.45:3000
    (Use your machine's LAN IP, not localhost, so Expo Go can reach the backend.)
2. Restart the Expo server if needed.

## Contributors
- Marcos Luna
- Isabella Valentino

## License
MIT License

## Project Status
Stage: Early Alpha, MVP development is just beginning. 

## Roadmap
| Phase | Focus |
|------|-------|
| MVP | Identification, saving to collection, basic map |
| Alpha | Collection filters, sustainability tips, map polish |
| Beta | Sharing, community overlays, notifications |
| v2.0 | Achievements. device sync, educational content |