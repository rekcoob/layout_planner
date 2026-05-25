## Docker dev enviroment, there is also build
# https://thedkpatel.medium.com/dockerizing-react-application-built-with-vite-a-simple-guide-4c41eb09defa

# Použijeme oficiálny Node.js image ako základ
FROM node:18-alpine

# Nastavíme pracovný adresár v kontajneri
WORKDIR /app

# Zkopírujeme všetky súbory projektu do kontajnera
COPY package*.json ./

# Inštalujeme závislosti
RUN npm install

# Zkopírujeme zvyšok projektu
COPY . .

# Exponujeme port, na ktorom bude aplikácia počúvať
EXPOSE 3000

# Spustíme aplikáciu
CMD [ "npm", "run", "dev" ]
