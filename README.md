# RadioSphere 🎙️

RadioSphere is a dynamic, real-time streaming platform that connects users with diverse radio stations around the world. Whether you're into music, news, talk shows, or podcasts, RadioSphere delivers a seamless listening experience via an intuitive web interface.

---

## 🚀 Features

- **Live Streaming**: Tune into live stations from across the globe.
- **Station Browser**: Discover curated radio stations by genre, country, or language.
- **Favorites & History**: Save your go-to stations and revisit recently played ones.
- **Responsive UI**: Optimized for both desktop and mobile browsers.
- **Search Functionality**: Quickly find stations using keywords.
- **Volume & Playback Control**: User-friendly playback features for fine-tuning your experience.
- **Lightweight & Accessible**: Fast load times and clean UI powered by modern web technologies.

---

## 🛠 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Audio Streaming**: HTML5 `<audio>` element
- **Data Source**: Public APIs or custom JSON feeds for station metadata
- *(Optional Integration ideas)*: React / Vue, Webpack, Electron for desktop apps

---

## 🧱 Getting Started

### Prerequisites

- Node.js ≥ 14.x
- npm or yarn

### Installation Steps

1. **Clone the repository**

    ```bash
    git clone https://github.com/professional-hehe/RadioSphere.git
    cd RadioSphere
    ```

2. **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Configure your station list**

    - Update `stations.json` with your radio stations:

      ```json
      [
        {
          "name": "Cool Jazz Radio",
          "streamUrl": "http://stream.cooljazz.fm:8000/",
          "genre": "Jazz",
          "country": "US",
          "logo": "https://example.com/logos/cooljazz.png"
        }
      ]
      ```

4. **Run the application**

    ```bash
    npm start
    # or
    yarn start
    ```

    Open your browser at: `http://localhost:3000`

---

## 📁 Project Structure

