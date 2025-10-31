---
title: Run phpMyAdmin using Docker with Existing Database
slug: run-phpmyadmin-docker-existing-database
description: Quick guide to run phpMyAdmin in Docker and connect to your existing MySQL database on macOS
category: "Docker"
---

Connect phpMyAdmin running in Docker to your existing MySQL server on macOS.

## 1. Ensure MySQL Runs on Mac

```bash
mysql --version
# Make sure your MySQL server is running and listens on 3306
```

## 2. Run phpMyAdmin Container

```bash
docker run -d --name phpmyadmin \
  -e PMA_HOST=host.docker.internal \
  -e PMA_PORT=3306 \
  -e PMA_ARBITRARY=1 \
  -e UPLOAD_LIMIT=256M \
  -p 8080:80 \
  --restart unless-stopped \
  phpmyadmin:latest
```

## 3. Open It

- **Browser:** http://localhost:8080
- **Server:** `host.docker.internal`
- **User/Pass:** Your Mac's MySQL credentials (e.g., `root`)

## 4. After Reboot

```bash
docker start phpmyadmin
# (restart policy is already set; it will auto-start when Docker Desktop starts)
```

## 5. Common Operations

```bash
# View logs
docker logs -f phpmyadmin

# Stop
docker stop phpmyadmin

# Remove (then re-run step 2 to recreate)
docker rm -f phpmyadmin
```

## 6. Quick Tips

- **Port clash?** Change `-p 8080:80` → `-p 9090:80`
- **Large imports?** Raise `UPLOAD_LIMIT` (e.g., `512M`)
- **Can't connect?** Confirm MySQL is running on macOS and reachable on port 3306
