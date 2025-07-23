# Docker Instructions for Songs Microservice

## 🐳 Docker Setup

### Prerequisites

- Docker installed on your system
- Docker Compose (optional, but recommended)
- AWS credentials configured

### Building and Running with Docker

#### Option 1: Using Docker directly

1. **Build the Docker image:**

   ```bash
   npm run docker:build
   # or manually:
   docker build -t songs-microservice .
   ```

2. **Create environment file:**

   ```bash
   cp .env.example .env
   # Edit .env with your AWS credentials
   ```

3. **Run the container:**

   ```bash
   npm run docker:run
   # or manually:
   docker run -p 3000:3000 --env-file .env songs-microservice
   ```

#### Option 2: Using Docker Compose (Recommended)

1. **Create environment file:**

   ```bash
   cp .env.example .env
   # Edit .env with your AWS credentials
   ```

2. **Start the service:**

   ```bash
   npm run docker:compose:up
   # or manually:
   docker-compose up -d
   ```

3. **View logs:**

   ```bash
   npm run docker:compose:logs
   # or manually:
   docker-compose logs -f
   ```

4. **Stop the service:**

   ```bash
   npm run docker:compose:down
   # or manually:
   docker-compose down
   ```

### Environment Variables

Make sure to set these environment variables in your `.env` file:

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key_here
AWS_SECRET_ACCESS_KEY=your_aws_secret_key_here
NODE_ENV=production
PORT=3000
```

### Testing the API

Once the container is running, test the API:

```bash
# Health check
curl http://localhost:3000/health

# Get all songs
curl http://localhost:3000/songs

# Create a song
curl -X POST http://localhost:3000/songs \
  -H "Content-Type: application/json" \
  -d '{
    "id": "song1",
    "name": "Test Song",
    "path": "https://example.com/song1.mp3",
    "plays": 0
  }'
```

### Production Deployment

For production deployment:

1. Use proper AWS IAM roles instead of access keys
2. Set `NODE_ENV=production`
3. Configure proper logging and monitoring
4. Use a container orchestration platform (ECS, EKS, etc.)

### Troubleshooting

- **Container won't start**: Check the logs with `docker-compose logs`
- **AWS connection issues**: Verify your AWS credentials and region
- **Port conflicts**: Change the port mapping in `docker-compose.yml`
