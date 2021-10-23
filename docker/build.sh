#!/bin/bash
# Should be executed from inside docker folder, not repo root!

echo -e "\n=== Pulling MinIO ===\n"
docker pull minio/minio:latest

echo -e "\n\n=== Building Notea image ===\n"
docker build ../ -t tuur29/notea-server:latest # stays local

echo -e "\n\n=== Building combined image ===\n"
docker build . -t tuur29/notea:latest

echo -e "\n\n=== Publishing image ===\n"
docker push tuur29/notea:latest
