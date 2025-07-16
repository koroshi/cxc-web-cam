# 使用官方 Node.js 基础镜像
FROM node:22-alpine as builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装生产依赖
RUN npm install --production

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 创建轻量级生产镜像
FROM node:22-alpine

# 设置工作目录
WORKDIR /app

# 从 builder 阶段复制构建产物和依赖
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/dist/ ./dist/
COPY --from=builder /app/uploads/ ./uploads/
COPY --from=builder /app/.env ./

# 暴露端口
EXPOSE 3001

# 启动应用
CMD ["node", "dist/main.js"]