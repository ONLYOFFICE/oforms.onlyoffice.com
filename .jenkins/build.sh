#!/bin/bash
source /etc/ci_env.sh

### Settings

# Timestamp
CURRENT_DATE=$(date "+%Y%m%d-%H%M%S")

# Define variables
DOCKER_CONTAINER_TAG="node:20.19.5-alpine"
EXPOSE_PORT="var_expose_port"
APP_NAME="var_app_name"
APP_DIR="/app/$APP_NAME"
BUILD_DIR="/app/${APP_NAME}_BUILD"
SOURCE_ARCHIVE_PATH="/home/ubuntu/deploy/.jenkins/$APP_NAME.tar.gz"
BACKUP_DIR="/app/backups"
BACKUP_NAME="$APP_NAME-$CURRENT_DATE.tar.gz"
BUILD_LOG="/home/ubuntu/deploy/var_app_name_deploy.log"
NOTIFICATION_APP_NAME="var_notification_app_name"
AWSLOGS_REGION="var_awslogs_region"
AWSLOGS_GROUP="var_awslogs_group"
AWSLOGS_STREAM="var_awslogs_stream"

### LOGGING FUNCTION

# Function to log messages with timestamp
log_step() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Clear previous log file
:> "$BUILD_LOG"

### TELEGRAM NOTIFICATION FUNCTION

# Function to send Telegram notification
send_telegram_notification() {
    local status="$1"
    
    # Check if Telegram environment variables are set
    if [[ -z "$TELEGRAM_BOT_TOKEN" || -z "$TELEGRAM_CHAT_ID" ]]; then
        echo "Telegram notification skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set"
        return 0
    fi
    
    # Prepare the message
    local full_message=""
    if [[ $status == "FAILED" ]]; then
        full_message="❌ $NOTIFICATION_APP_NAME build failed."
    fi
    if [[ $status == "SUCCESS" ]]; then
        full_message="✅ $NOTIFICATION_APP_NAME build and deploy completed successfully."
    fi

    # Send log file with message as caption if it exists, otherwise send text message
    if [[ -f "$BUILD_LOG" ]]; then
        curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendDocument" \
            -F "chat_id=$TELEGRAM_CHAT_ID" \
            -F "document=@$BUILD_LOG" \
            -F "caption=$full_message" \
            -F "parse_mode=HTML" > /dev/null
    else
        # Fallback to text message if no log file exists
        curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
            -d "chat_id=$TELEGRAM_CHAT_ID" \
            -d "text=$full_message" \
            -d "parse_mode=HTML" > /dev/null
    fi
    
    echo "Telegram notification sent: $status"
}

### BUILD STAGE

log_step "Extracting sources to $BUILD_DIR"

# Create folder with sources and extract sources to it
mkdir -p "$BUILD_DIR"
tar -xzf "$SOURCE_ARCHIVE_PATH" -C "$BUILD_DIR"
find "$BUILD_DIR" -type d -exec chmod 755 {} \;
find "$BUILD_DIR" -type f -exec chmod 644 {} \;
cd "$BUILD_DIR"

# Build application with error handling
log_step "Starting application build..."
docker run --rm -e NODE_OPTIONS="--max-old-space-size=4096" -v "$BUILD_DIR":"$APP_DIR" -w "$APP_DIR" "$DOCKER_CONTAINER_TAG" sh -c "npm ci && npm run build"
if [ $? -ne 0 ]; then
    log_step "ERROR: Application build failed. Cleaning up build directory and exiting."
    send_telegram_notification "FAILED"
    rm -rf "$BUILD_DIR"
    exit 1
fi
log_step "Application build completed successfully."

### DEPLOY STAGE

log_step "Creating backup: $BACKUP_NAME"

# Archive the folder with date-time stamp
echo -e "\e[33mArchiving old application folder\e[0m"
tar -czf "$BACKUP_DIR/$BACKUP_NAME" -C "$APP_DIR" .

# Cleanup other www-cms-marketplace backups to leave only 7 latest
echo -e "\e[33mCleaning up old backups\e[0m"
cd "$BACKUP_DIR"
shopt -s nullglob
ls -1t $APP_NAME-*.tar.gz | tail -n +8 | xargs -I {} rm -- {}

# Stop application container if it exists
echo -e "\e[33mStopping application container\e[0m"
if docker ps -a | grep -wq "$APP_NAME"; then
    log_step "Stopping existing container: $APP_NAME"
    docker stop "$APP_NAME"
fi

log_step "Removing old application directory: $APP_DIR"

# Remove the original /app/www-cms-marketplace folder
rm -rf "$APP_DIR"

log_step "Moving built application to $APP_DIR"

# Copy built app to app dir
mv $BUILD_DIR $APP_DIR

# Start container if it exists or build and start it
echo -e "\e[33mStarting the application\e[0m"
if docker ps -a | grep -wq "$APP_NAME"; then
    # Get the image tag of the existing container
    CONTAINER_IMAGE_TAG=$(docker inspect "$APP_NAME" -f '{{.Config.Image}}')
    
    # Check if the container image tag matches $DOCKER_CONTAINER_TAG
    if [ "$CONTAINER_IMAGE_TAG" == "$DOCKER_CONTAINER_TAG" ]; then
        log_step "Starting existing container: $APP_NAME (image: $CONTAINER_IMAGE_TAG)"
        docker start "$APP_NAME"
    else
        # Build and run a new container if the image tag does not match
        log_step "Image tag changed ($CONTAINER_IMAGE_TAG -> $DOCKER_CONTAINER_TAG), recreating container: $APP_NAME"
        docker rm "$APP_NAME"
        docker run -d --log-driver=awslogs --log-opt awslogs-region=$AWSLOGS_REGION --log-opt awslogs-group=$AWSLOGS_GROUP --log-opt awslogs-stream=$AWSLOGS_STREAM --name "$APP_NAME" --publish "0.0.0.0:$EXPOSE_PORT:30000" -v "$APP_DIR:$APP_DIR" -w "$APP_DIR" --restart always "$DOCKER_CONTAINER_TAG" npm run start
    fi
else
        # Build and run a new container if it doesn't exist
    log_step "Creating new container: $APP_NAME (image: $DOCKER_CONTAINER_TAG)"
    docker run -d --log-driver=awslogs --log-opt awslogs-region=$AWSLOGS_REGION --log-opt awslogs-group=$AWSLOGS_GROUP --log-opt awslogs-stream=$AWSLOGS_STREAM --name "$APP_NAME" --publish "0.0.0.0:$EXPOSE_PORT:30000" -v "$APP_DIR:$APP_DIR" -w "$APP_DIR" --restart always "$DOCKER_CONTAINER_TAG" npm run start
fi

# Send success notification
send_telegram_notification "SUCCESS"

log_step "Build and deployment process completed successfully."
