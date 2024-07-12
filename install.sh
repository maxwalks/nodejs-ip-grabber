#!/bin/bash

if [ ! -f .env ]; then
    echo "Error: .env file not found."
    exit 1
fi

trim() {
    local var="$1"
    var="${var#"${var%%[![:space:]]*}"}"
    var="${var%"${var##*[![:space:]]}"}"
    echo -n "$var"
}

while IFS='=' read -r key value; do
    if [[ -n "$key" && "$key" != \#* ]]; then
        key=$(trim "$key")
        value=$(trim "$value")
        export "$key"="$value"
    fi
done < .env

REQUIRED_VARS=("NGROK_TOKEN" "WEBHOOK_URI")
for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        echo "Error: $var is not set in the .env file."
        exit 1
    fi
done

echo Installing packages...
sleep 1
sudo npm install
echo Installing ngrok...
sleep 1
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list && sudo apt update && sudo apt install ngrok
echo Configuring ngrok...
sleep 1
sudo ngrok config add-authtoken $NGROK_TOKEN