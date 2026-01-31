#!/bin/bash

# Base URL
URL="http://localhost:3000/api"

echo "1. Registering User..."
REGISTER_RESPONSE=$(curl -s -X POST $URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}')
echo $REGISTER_RESPONSE

# Extract Token (Simple grep/cut for simplicity, jq would be better but keeping it raw)
TOKEN=$(echo $REGISTER_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
    echo "Login/Register failed (User might already exist), trying login..."
    LOGIN_RESPONSE=$(curl -s -X POST $URL/auth/login \
      -H "Content-Type: application/json" \
      -d '{"email": "test@example.com", "password": "password123"}')
    TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
    echo "Logged in."
else
    echo "Registered and got token."
fi

echo "Token: $TOKEN"

echo "\n2. Creating Resume..."
curl -s -X POST $URL/resumes \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "My Best Resume", "data": {"name": "Test User", "skills": ["Node", "React"]}}'

echo "\n\n3. Getting Resumes..."
curl -s -X GET $URL/resumes \
  -H "Authorization: Bearer $TOKEN"
