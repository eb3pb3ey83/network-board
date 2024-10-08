FROM node:20.4
WORKDIR /usr/src/app

# 使用 npm 全局安裝 serve
RUN npm install -g serve

# 覆制 package.json 和 package-lock.json，如果存在的話
COPY package*.json ./

# 使用 npm 安裝依賴並清理緩存
RUN npm install && npm cache clean --force

# 覆制所有源代碼到工作目錄
COPY . .

# 運行構建命令
RUN npm run build

EXPOSE 3000

# 使用 npm 啟動應用
CMD [ "npm", "run", "start" ]