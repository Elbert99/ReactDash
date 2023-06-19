#!/bin/bash

# Ruta al directorio de tu proyecto de React
PROJECT_PATH="VLIR-Monitoring-IoTSystem/Web-App/Frontend/frontend_web/material-dashboard-react-main/"

# Cambiar al directorio del proyecto
cd "$PROJECT_PATH"

# Detener el servicio
npm stop

# Esperar 10 segundos
sleep 10

# Iniciar el servicio
npm start &



