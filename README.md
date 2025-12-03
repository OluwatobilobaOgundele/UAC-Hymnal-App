📖 UAC Hymnal App

A modern mobile hymnal application for the United Apostolic Church (UAC), built with React Native (Expo).
The app provides English and Yoruba hymns, clean navigation, offline usage, and a simple user experience for worship and devotion.

✨ Features

🎵 800+ UAC Hymns

🌍 Dual Language Support – English & Yoruba

📖 Offline Access – Hymns stored locally in JSON

🔎 Fast Hymn Search (Optional)

🎨 Modern UI – Clean, simple, and church-themed

🌑 Splash Screen & Onboarding

🔄 Language Selector page

📄 Detailed Hymn View with verses and passages

🚀 Built with Expo for cross-platform support

📂 Project Structure
UAC-Hymnal-App/
│
├── assets/
│   ├── hymns.json      # Combined English & Yoruba hymn dataset
│   ├── images/
│   │   └── icon1.jpg   # App logo
│   └── fonts/          # (optional)
│
├── components/
│   ├── HymnList.tsx
│   ├── HymnDetail.tsx
│   ├── LanguageSelector.tsx
│   ├── OnboardingScreen.tsx
│   └── SplashScreen.tsx
│
├── app/
│   ├── index.tsx
│   ├── _layout.tsx
│   └── (screens)...
│
├── package.json
└── README.md

📦 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/yourusername/UAC-Hymnal-App.git
cd UAC-Hymnal-App

2️⃣ Install dependencies
npm install

3️⃣ Start Expo development server
npx expo start


Scan the QR code using the Expo Go app on your mobile device.

📘 Hymn Data Structure

The app uses a local JSON file:

📄 assets/hymns.json

{
  "id": 1,
  "title_english": "God is love, His mercy abounds",
  "title_yoruba": "Ife l‘Olorun, aanu Re,",
  "passage_english": "1 JOHN 4:7",
  "passage_yoruba": "1 JOHANU 4:7",
  "verses_english": [
    "1. God is love, His mercy abounds...",
    "2. Death is virulently hostile...",
    "3. When the darkness overwhelmed us..."
  ],
  "verses_yoruba": [
    "1. Ife l’Olorun, aanu Re...",
    "2. Iku n doro pupopupo...",
    "3. Lakoko t’o dab’o sokun..."
  ]
}

📱 Screens Included
✔ Splash Screen

Displays logo and app branding.

✔ Onboarding Screens

Simple introduction, swipe/next.

✔ Language Selector

Choose English or Yoruba.

✔ Hymn List

Shows all hymns in number order.

✔ Hymn Details

Full hymn text with passages and verses.

🎨 Styling Guidelines

Primary Color: #8B0000 (Deep Red)

Secondary Color: #000080 (Navy Blue)

Background: #D3D3D3 (Light Gray)

Typography: Clean sans serif + Georgia italic (optional)

🚀 Build for Production
Android APK:
npx expo build:android

iOS Build (Mac required):
npx expo build:ios

Expo EAS:
eas build --platform android
eas build --platform ios

🤝 Contributions

Pull requests are welcome!
Feel free to submit improvements, new features, UI enhancements, or bug fixes.

📜 License

This project is made for the UAC Church Community.
All rights reserved unless otherwise stated.

🙏 Credits

Developed by  Oluwatobiloba Razaq Ogundele

Hymns Media collected from Ajilore Benjanmi

Hymnal data sourced from UAC Hymn Book and arranged by Ajilore Oluwakemi

App powered by React Native + Expo