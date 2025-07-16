## 前端 
1.功能拍照，并且支持上传到指定后端服务器，如果没有就上传不了前端功能还是可用
### 1.可以直接访问git在线页面
[静态页面地址](https://koroshi.github.io/cxc-web-cam)
### 2.或者启动目录下的docs
```bash
npm install -g serve
serve docs
```
### 3.进入frontend，根据里面[README.Md](frontend/README.md)

## 后端(包含postgresql 镜像如果不需要可以注释和修改配置)
### 1.以docker启动,配置在[docker-compose.yml](./docker-compose.yml)
```bash
docker-compose up
```
默认访问地址为 http://localhost:3001

### 2.进入backend，根据里面[README.Md](backend/README.md)



### backendApi
以下是补上传参信息后的 Markdown 表格：

| 接口 | 方法 | 描述 | 权限 | 传参信息 |
| --- | --- | --- | --- | --- |
| /auth/generate-token | POST | 生成测试令牌 | 无 | ```json{"userId": "test_user_123",  "role": "user"}``` |
| /images | POST | 上传图像 | JWT 认证 | key: `image`，类型: `file` |
| /images | GET | 获取当前用户所有图像 | JWT 认证 | 无 |
| /images/latest | GET | 获取当前用户最新图像 | JWT 认证 | 无 |
| /images/:id | DELETE | 删除指定图像 | JWT 认证 | 无 |

你可以直接复制上述表格内容到你的文档中。 
