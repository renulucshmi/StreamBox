# StreamBox 🎬

A modern movie streaming app built with **React Native (Expo)** and **TypeScript**.

## ✨ Features

- 🎥 **Browse Movies** - Explore curated collections (Popular, Trending, Top Rated)
- 🔍 **Advanced Search** - Real-time search with debounced input
- 🌍 **Multi-Filter System** - Filter by language and genre simultaneously
- ❤️ **Favourites Management** - Add/remove movies with persistent storage
- 🔐 **User Authentication** - Registration and login with validation
- 🌓 **Dark/Light Mode** - Theme switching with persistence
- 💾 **Data Persistence** - Redux Persist + AsyncStorage
- 📱 **Responsive Design** - Optimized for all screen sizes

## 🏗️ Architecture

```
src/
├── components/     # Reusable UI components
├── screens/        # Screen components
├── services/       # API calls & services
├── store/          # Redux state management
├── utils/          # Helper functions
├── theme/          # Design system
├── context/        # React Context providers
├── navigation/     # Navigation configuration
└── types/          # TypeScript definitions
```

## 🛠️ Tech Stack

- **React Native 0.81.5** + **Expo SDK 54**
- **TypeScript 5.9**
- **Redux Toolkit 2.10** + **Redux Persist 6.0**
- **React Navigation 7**
- **AsyncStorage 2.2**
- **Expo Vector Icons** (Feather, FontAwesome)

## 🚀 Get Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- Expo Go app (iOS/Android)

### Installation

```bash
git clone https://github.com/renulucshmi/StreamBox.git
cd StreamBox
npm install
npm start
```

### Run on Device

- Scan QR code with Expo Go (Android) or Camera (iOS)
- Press `a` for Android emulator
- Press `i` for iOS simulator

### Test Credentials

- **Email:** `renulucshmi@gmail.com` | **Password:** `Asdw1234`
- **Username:** `emilys` | **Password:** `emilyspass`
- **Username:** `michaelw` | **Password:** `michaelwpass`

## 📱 Key Features

### Authentication

- Registration with email/password validation
- Login with persistent session
- Form validation with error handling

### Movie Browsing

- Search movies in real-time
- Filter by language and genre
- View movie details (poster, rating, genres)
- Add to favourites

### User Preferences

- Save favourite movies
- Dark/Light theme toggle
- Persistent user settings

## 🔧 Available Scripts

```bash
npm start              # Start dev server
npm start -- --clear   # Clear cache
npm run android        # Run on Android
npm run ios            # Run on iOS
npm run web            # Run in browser
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file.

## 👨‍💻 Author

**Renul Lucshmi**  
📧 [GitHub](https://github.com/renulucshmi)

---

_Version: 1.0.0_
