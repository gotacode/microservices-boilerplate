#!/bin/bash
echo "Running tests and generating coverage..."
npm run test -- --coverage

echo "Running SonarQube Scanner..."
sonar-scanner \
  -Dsonar.projectKey=microservice-boilerplate \
  -Dsonar.sources=src \
  -Dsonar.tests=tests \
  -Dsonar.test.inclusions=**/*.test.js \
  -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=your_sonar_token
